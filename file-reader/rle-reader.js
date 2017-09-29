import fs from 'fs'
import path from 'path'

function extractData (text) {
  const info = {
    name: '',
    creator: '',
    comments: []
  }
  const rawData = text.split('\n').filter((line) => {
    if (line.charAt(0) === '#') {
      switch (line.charAt(1)) {
        case 'N':
          // 3 to remove space character -1 to remove /r character at the end of the line
          info.name = line.slice(3)
          break
        case 'O':
          info.creator = line.slice(3)
          break
        case 'C':
          info.comments.push(line.slice(3))
          break
      }
      return false
    }
    return true
  }).join('\n')
  const header = rawData.slice(0, rawData.indexOf('\n') - 1)
  const data = header.split(',')
    .map(val => val.split(' ')
    .filter(val => val !== '=' && val !== ''))
    .reduce((obj, val) => {
      return Object.assign(obj, { [val[0]]: isNaN(val[1]) ? val[1] : parseInt(val[1]) })
    }, {})
  const pattern = rawData.slice(rawData.indexOf('\n') + 1)
  return {
    info,
    data,
    pattern
  }
}

function readRLE (filename) {
  const textData = extractData(
    fs.readFileSync(path.resolve(__dirname, 'files', filename), 'utf-8')
  )
  const createSequence = (lenght, val) => Array.from(new Array(lenght), () => val)
  const isCharString = (char) => /^\d+$/.test(char)
  let row = 1
  const pattern = textData.pattern
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
        const length = parseInt(textData.data.x) * row - arr.length
        row += 1
        if (length > 0) {
          return arr.concat(createSequence(length, 'b'))
        } else {
          return arr
        }
      }
      if (!isCharString(data[i - 1]) && (char === 'o' || char === 'b')) {
        return arr.concat(char)
      }
      return arr
    }, [])
    .map(val => val === 'o')
  return Object.assign({}, textData, { pattern })
}

export default readRLE
