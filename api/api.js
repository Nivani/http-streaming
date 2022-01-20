const fs = require('fs');
const path = require('path');
const http = require('http');
const http2 = require('http2');
const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();

app.use(cors());

app.use(async ctx => {
    switch (ctx.request.url) {
        case '/big.csv':
            streamBigCsv(ctx);
            break;
        default:
            console.warn(`Received request for unmapped URL '${ctx.request.url}'`);
    }
});


const http11Port = 3000;
const http2Port = 3443;

http.createServer(app.callback()).listen(http11Port);

http2.createSecureServer(
    {
        key: fs.readFileSync(path.resolve('../../../../local-https/localhost-mkcert-key.pem')),
        cert: fs.readFileSync(path.resolve('../../../../local-https/localhost-mkcert.pem')),
    },
    app.callback(),
).listen(http2Port);

console.log(`API is running, use http://localhost:${http11Port} for HTTP 1.1 and https://localhost:${http2Port} for HTTP 2`);

function streamBigCsv(ctx) {
    const src = fs.createReadStream('./big.csv');
    ctx.response.set("content-type", "text/csv");
    ctx.body = src;
}
