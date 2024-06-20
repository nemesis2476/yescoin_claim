const express = require("express"); // Import the express library
const app = express(); // Launch the express app
const http = require("http"); // Import the http library
const server = http.createServer(app); // Create the server

/** Replying to request at '/' */
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

let collectedData = []; // Store collected data

// Endpoint to get collected data
app.get("/data", (req, res) => {
    res.json(collectedData);
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});

async function collectCoin() {
    const url = "https://api.yescoin.gold/game/collectCoin";
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en,en-US;q=0.9",
        Connection: "keep-alive",
        "Content-Type": "application/json",
        Host: "api.yescoin.gold",
        Origin: "https://www.yescoin.gold",
        Referer: "https://www.yescoin.gold/",
        "sec-ch-ua":
            '"Chromium";v="124", "Android WebView";v="124", "Not-A.Brand";v="99"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        token: "your-token-here",
        "User-Agent":
            "Mozilla/5.0 (Linux; Android 14; POCO M2 Pro Build/AP1A.240405.002.A1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/124.0.6367.179 Mobile Safari/537.36",
        "X-Requested-With": "org.telegram.messenger",
    };

    while (true) {
        // Wait for a random time between 8 and 10 seconds
        let delay = Math.random() * 5 + 7;
        let delayMilliseconds = delay * 1000;

        // Calculate the new score
        let new_score = Math.floor((13 * delay) / 2);

        // Convert the new score to a string to match the expected data format
        let data = String(new_score);

        // Send the POST request
        let response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: data,
        });

        // Print the response status and text
        console.log(`Response status: ${response.status}`);
        let responseText = await response.text();
        console.log(`Response text: ${responseText}`);

        // Print the score
        console.log(`Score: ${new_score}`);

        // Save the score to the collectedData array
        collectedData.push({
            score: new_score,
            responseStatus: response.status,
            responseText: responseText,
            timestamp: new Date(),
        });

        // Wait for the specified delay
        await new Promise((resolve) => setTimeout(resolve, delayMilliseconds));
    }
}

collectCoin();
