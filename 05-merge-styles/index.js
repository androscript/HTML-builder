const fs = require('fs');
const path = require('path');


const stylesFolder = path.join(__dirname, 'styles');


fs.readdir(stylesFolder, {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  const stylesArr = [];
  for (let i = 0; i < files.length; i++) {
    if (files[i].isFile()) {
      let filePath = path.join(stylesFolder, files[i].name);
      fs.stat(filePath, (err) => {
        if (err) throw err;
        if ((path.parse(files[i].name)).ext == '.css') {
          stylesArr.push(files[i].name);
        }
      })
    }
  }

  fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
    if (err) throw err;

    for (let i = 0; i < stylesArr.length; i++) {

      fs.readFile(path.join(stylesFolder, stylesArr[i]), 'utf-8', (err, data) => {
        if (err) throw err;
        fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, (err) => {
          if (err) throw err;
        })
      });

    }

  });

})