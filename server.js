
const http = require('http');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const port = 3000;

const server = http.createServer((req, res) => {
    const filePath = path.join(publicDir, req.url);

    fs.access(filePath, (error) => {
        if (error) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('File not found');
        } else {
            fs.readFile(filePath, (error, data) => {
                if (error) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Error reading file');
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data);
                }
            });
        }
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ` + port);
});
