import fs from 'fs'

import readRLE from './rle-reader'

const files = fs.readdirSync('./file-reader/files')
const fileInf = []
files.map(name => readRLE(name))
.forEach((pattern, i) => {
  const filename = files[i].slice(0, -4)
  fs.writeFile(`./public/patterns/${filename}.json`, JSON.stringify(pattern), 'utf-8', (err) => {
    if (err) {
      return console.log(err)
    }
    console.log(`file ${filename} converted`)
  })
  fileInf.push({
    filename,
    name: pattern.info.name || filename
  })
})

fs.writeFile(`./public/patterns/index.json`, JSON.stringify(fileInf), 'utf-8', (err) => {
  if (err) {
    return console.log(err)
  }
  console.log(`file index.json`)
})
