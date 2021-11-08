const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');



fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
});

fsPromises.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true });


/*-----------------------------INDEX-HTML-----------------------------------*/

fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '', (err) => {
  if (err) throw err;
});

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, html) => {
  if (err) throw err;
  fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), html, (err) => {
    if (err) throw err;
    fsPromises.readdir(path.join(__dirname, 'components'), {withFileTypes: true}).then((files) => {
      for (let file of files) {
        if (file.isFile()) {
          fsPromises.readFile(path.join(__dirname, 'components', file.name), 'utf-8').then((data) => {
            html = html.replace(`{{${path.parse(file.name).name}}}`, data);
            const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
            output.write(html);
          })
        }
      }
    })
  })
})



/*-----------------------------STYLES-------------------------------------*/

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

  fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
    if (err) throw err;
    for (let i = 0; i < stylesArr.length; i++) {
      fs.readFile(path.join(stylesFolder, stylesArr[i]), 'utf-8', (err, data) => {
        if (err) throw err;
        fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), `${data}\n\n`, (err) => {
          if (err) throw err;
        })
      });
    }
  });
})



/*----------------------------ASSETS----------------------------*/


const oldFolder = path.join(__dirname, 'assets');

const newFolder = path.join(__dirname, 'project-dist', 'assets');

function copyAllFiles(oldFolder, newFolder) {fsPromises.readdir(oldFolder, {withFileTypes: true}).then((files) => {
  for (let i = 0; i < files.length; i++) {
    if (files[i].isFile()) {
      fsPromises.copyFile(path.join(oldFolder, files[i].name), path.join(newFolder, files[i].name));
    } else {
      fsPromises.mkdir(path.join(newFolder, files[i].name), { recursive: true }).then(copyAllFiles(path.join(oldFolder, files[i].name), path.join(newFolder, files[i].name)));
    }
  }
})};
copyAllFiles(oldFolder, newFolder);


fsPromises.readdir(newFolder, {withFileTypes: true}).then((arr) => {
  const newFolderFiles = [];
  for (let item of arr) {
    if (item.isFile()) {
      newFolderFiles.push(item.name);
    }
  }

  fsPromises.readdir(oldFolder, {withFileTypes: true}).then((arr) => {
    const oldFolderFiles = [];
    for (let item of arr) {
      if (item.isFile()) {
        oldFolderFiles.push(item.name);
      }
    }

    for (let item of newFolderFiles) {
      if (!oldFolderFiles.includes(item)) {
        fsPromises.rm(path.join(newFolder, item));
      }
    }

  })

})
