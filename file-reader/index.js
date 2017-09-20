import fs from 'fs'

import readRLE from './rle-reader'

fs.readdirSync('./file-reader/files')
.map(name => readRLE(name))
.forEach(pattern => {
  fs.writeFile(`./public/patterns/${pattern.name}.json`, JSON.stringify(pattern), 'utf-8', (err) => {
    if (err) {
      return console.log(err)
    }
    console.log(`file ${pattern.name} converted`)
  })
})
