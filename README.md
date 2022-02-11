# HTTP streaming

This repository shows how an application can use HTTP streaming to start showing results while the rest is still loading.

## Get started

Step 1: Generate a large JSON file
1. `cd ./scripts`
3. `node generate-json.js 10000 > measurements.json` to create a JSON file with 10k records called `measurements.json`
4. `mv measurements.json ../api` to move the file to the api folder

Step 2: Run the API
1. `cd ./api`
2. `npm install`
3. `node api.js`

Step 3: Host the webapp
1. `cd ./webapp`
2. `http-server .`

Step 4: See HTTP streaming in action
1. Open [http://localhost:8080](http://localhost:8080) in your favorite web browser
2. Open devtools (F12)
3. Go to the network tab
4. Set network throttling to 3G
5. Have fun!
