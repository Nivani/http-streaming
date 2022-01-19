# HTTP streaming

This repository shows how an application can use HTTP streaming to start showing results while the rest is still loading.

## Get started

Step 1: Generate a large CSV file
1. `cd ./scripts`
3. Run `node generate-csv.js 10000 > big.csv` to create a CSV file with 10k records called `big.csv`
4. Run `mv big.csv ../api` to move the file to the api folder

Step 2: Run the API
1. `cd ./api`
2. `node api.js`

Step 3: Host the webapp
1. `cd ./webapp`
2. `http-server .`

Step 4: See HTTP streaming in action
1. Open [http://localhost:8080](http://localhost:8080) in your favorite web browser
2. Open devtools (F12)
3. Go to the network tab
4. Set network throttling to 3G
5. Have fun!
