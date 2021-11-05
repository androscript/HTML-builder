const fs = require('fs');
const path = require('path');
const stdout = process.stdout;

const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
stream.on('data', data => stdout.write(data));