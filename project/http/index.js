const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const url = req.url;
    const fullPath = path.join(__dirname, url);
    if (fs.lstatSync(fullPath).isDirectory()){
        res.end(scanDir(fullPath, url));
    } else if(fs.lstatSync(fullPath).isFile()){
        res.end(readFile(fullPath));
    }
});

function scanDir(fullPath, url){
    const fileList = fs.readdirSync(fullPath);
    let html = '';
    fileList.forEach((file)=>{
        html += `<a href="${path.join(url, file)}">${file}</a><br>`
    });
    return html;
}

function readFile(path){
    return fs.readFileSync(path);
}

server.listen(80);