import fs from 'fs'
import path from 'path'

function readRLE (filename) {
  const text = fs.readFileSync(path.resolve(__dirname, 'files', filename), 'utf-8')
  const dataStart = text.indexOf('\n') + 1
  const dataEnd = text.indexOf('!')
  const header = text.slice(0, dataStart)
  const headerData = header.split(',')
    .map(val => val.split(' ')
    .filter(val => val !== '=' && val !== ''))
    .reduce((obj, val) => {
      return Object.assign(obj, { [val[0]]: parseInt(val[1]) })
    }, {})
  const createSequence = (lenght, val) => Array.from(new Array(lenght), () => val)
  const isCharString = (char) => /^\d+$/.test(char)
  let row = 1
  const pattern = text
    .slice(dataStart, dataEnd) // get the relevant part
    .split('') // convert to array
    .reduce((arr, char, i, data) => {
      if (isCharString(char) && !isCharString(data[i - 1])) { // handle <count> tag
        let res = char
        let j = 1
        while (/^\d+$/.test(data[i + j])) {
          res = res.concat(data[i + j])
          j++
        }
        return arr.concat(createSequence(parseInt(res), data[i + j]))
      }
      if (char === '$' || char === '!') {
        const length = headerData.x * row - arr.length
        row += 1
        if (length > 0) {
          return arr.concat(createSequence(length, 'b'))
        } else {
          return arr
        }
      }
      if (!isCharString(data[i - 1])) {
        return arr.concat(char)
      }
      return arr
    }, [])
    .map(val => val === 'o')
  return {
    name: filename.slice(0, -4),
    headerData,
    pattern
  }
}

export default readRLE
