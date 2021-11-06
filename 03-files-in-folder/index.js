const fs = require('fs');
const path = require('path');
const readdir = require('fs/promises');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  for (let i = 0; i < files.length; i++) {
    if (files[i].isFile()) {
      let filePath = path.join(folderPath, files[i].name);
      fs.stat(filePath, (err, stats) => {
        if (err) throw err;
        console.log(`${(path.parse(files[i].name)).name} - ${(path.parse(files[i].name)).ext.slice(1)} - ${stats.size}b`)
      })
    }
  }
})