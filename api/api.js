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
            handleStream(ctx);
            break;
        default:
            console.warn(`Received request for unmapped URL '${url}'`);
    }
});

http.createServer(app.callback()).listen(3000);

http2.createSecureServer(
    {
        key: fs.readFileSync(path.resolve('../../../../local-https/localhost-mkcert-key.pem')),
        cert: fs.readFileSync(path.resolve('../../../../local-https/localhost-mkcert.pem')),
    },
    app.callback(),
).listen(3443);

function handleStream(ctx) {
    const src = fs.createReadStream('./big.csv');
    ctx.response.set("content-type", "text/csv");
    ctx.body = src;
}
