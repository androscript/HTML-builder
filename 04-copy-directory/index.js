
const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');


const oldFolder = path.join(__dirname, 'files');
/*
fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) throw err;
});
*/

fsPromises.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });

const newFolder = path.join(__dirname, 'files-copy');

/*fs.readdir(oldFolder, {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  for (let i = 0; i < files.length; i++) {
    if (files[i].isFile()) {
      fsPromises.copyFile(path.join(oldFolder, files[i].name), path.join(newFolder, files[i].name));
    }
  }
})*/

fsPromises.readdir(oldFolder, {withFileTypes: true}).then((files) => {
  for (let i = 0; i < files.length; i++) {
    if (files[i].isFile()) {
      fsPromises.copyFile(path.join(oldFolder, files[i].name), path.join(newFolder, files[i].name));
    }
  }
});

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

