const fs = require('fs');
const path = require('path');
const stdout = process.stdout;

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

stdout.write('Введите текст:\n');
fs.writeFile(path.join(__dirname, 'text.txt'), '', (err) => {
  if (err) throw err;
});
rl.on('line', (data) => {
  if (data == 'exit') {
    stdout.write('До свидания');
    process.exit();
  } else {
    fs.appendFile(path.join(__dirname, 'text.txt'), `${data}\n`, (err) => {
      if (err) throw err;
    });
  }
})

rl.on('close', () => {
  stdout.write('До свидания');
  rl.close();
})
