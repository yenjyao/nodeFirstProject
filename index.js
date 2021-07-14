var http = require('http');
var url = require('url')
var fs = require('fs')

const page404 = fs.readFileSync("404.html", "utf-8", (err, data) => {
    if (err) throw err;
    return data;
  });

function renderHTML(pathname, res) {
    fs.readFile(pathname, function(err, data) {
        if(err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write(page404);
            res.end();
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }
       
    })
}

http.createServer(function (req, res) {
    var pathname = req.url.substring(1)
    if(req.url.substring(req.url.length - 5) !='.html' || req.url.length === 0) {
        pathname = pathname + '.html'
    }
    if(pathname === '.html') pathname = 'index.html'
    if(pathname != "favicon.ico") {
        renderHTML(pathname, res)
    }
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');