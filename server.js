/* server.js */
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = module.exports = express();

var html = fs.readFileSync(path.join(__dirname, 'src/pages/index.html'), 'utf-8');
var jpgFile = path.join(__dirname, 'src/images/che.jpg');
var jpgStat = fs.statSync(jpgFile);

app.use(express.static('src'));

app.get('/index', (req, res) => {
  //res.sendFile(path.join(__dirname, 'src/pages/index.html'));
  res.writeHead(200, {'Content-Type': 'text/html'});
  //res.end('pages/index.html');
  res.end(html);
});

/*app.get('/images/che.jpg', function(req, res) {
  res.writeHead(200, {
        'Content-Type': 'image/jpg',
        'Content-Length': jpgStat.size
    });
  var readStream = fs.createReadStream(jpgFile);
  readStream.pipe(res);
})*/