const http = require('http');
const finalhandler = require('finalhandler');
const Router = require('router');
const fs = require('fs');
const port = 3000;

const router = Router();

router.get('/', (req, res) => {
    fs.readdir('./assets', (err, files) => {
        if (err) {
            res.statusCode = 500;
            res.end('error happened');
        } else {
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(files));
        }
    });
});

router.get('/:fileName', (req, res) => {
    fs.readFile(`./assets/${req.params.fileName}`, (err, fileBuffer) => {
        if (err) {
            res.statusCode = 404;
            res.end('Not found');
        } else {
            res.end(fileBuffer);
        }
    });
});

const server = http.createServer((req, res) => {
    router(req, res, finalhandler(req, res));
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

