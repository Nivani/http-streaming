# HTTP streaming

This repository shows how an application can use HTTP streaming to start showing results while the rest is still loading.

This codebase accompanies the article [Implement HTTP Streaming with Node.js and Fetch API](https://www.loginradius.com/blog/engineering/guest-post/http-streaming-with-nodejs-and-fetch-api/).

## Get started

Step 1: Run the API
1. `cd ./api`
2. `npm install`
3. `node ./api.js`

Step 2: Host the webapp
1. `cd ./webapp`
2. `npm install -g http-server`
3. `http-server .`

Step 3: See HTTP streaming in action
1. Open [http://localhost:8080](http://localhost:8080) in your favorite web browser
2. Open devtools (F12)
3. Go to the network tab
4. Set network throttling to 3G
5. Have fun!

## Using HTTP/2

Preperation: HTTP/2 requires HTTPS, so make sure you have a `cert` and `key` file available that you can use for local develoment. More information on how to set this up can be found here: https://web.dev/how-to-use-local-https/ 

Step 1: Update the paths in `api/api.js` so that they point to to your own `cert` and `key` files:
```Javascript
// update the paths, so that they point to your own cert and key files
http2.createSecureServer(
    {
        cert: fs.readFileSync(path.resolve('../../../.https/localhost.pem')),
        key: fs.readFileSync(path.resolve('../../../.https/localhost-key.pem')),
    },
    app.callback(),
).listen(http2Port);
```

Step 2: Run the API with HTTP/2 enabled:

`node ./api.js -http2`

Step 3: See it in action by clicking the button that says "Stream with HTTP/2!".
