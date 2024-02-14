const app = require('express')();
const dotenv = require('dotenv').config();
const cors = require('cors');
const sendAboveMail = require('./helper/Abovemail');
const axios = require('axios');


var date = new Date();
var hour = date.getHours();
var minute = date.getMinutes();
var second = date.getSeconds();
const callFunction = async () => {
    const arr = ["ADANIPOWERBEN", "APOLLOTYREEQN", "AWLEQN", "BHARTIARTLEQN", "LTEQN", "NCCEQN", "SBINEQN", "TATAPOWEREQN"]
    try {
        const datar = [];
        for (var i = 0; i < arr.length; i++) {
            const options = {
                method: 'GET',
                url: 'https://latest-stock-price.p.rapidapi.com/any',
                params: { Identifier: arr[i] },
                headers: {
                    'X-RapidAPI-Key': '6aaf657c3cmsh646be86afaa69e1p1cd2e1jsnd55aa8aaac44',
                    'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
                }
            };
            const response = await axios.request(options);
            datar.push(response.data);
        }
        return datar;
    } catch (error) {
        console.error(error);
    }
}
var flags = [0, 0, 0, 0, 0, 0, 0, 0];
if (hour == 10 && minute == 0 && second >= 0 && second <= 30) {
    flags = [0, 0, 0, 0, 0, 0, 0, 0];
}

if (hour <= 15 && minute <= 60 && hour >= 9 && minute >= 0) {
    try {
        setInterval(async () => {
            date = new Date();
            hour = date.getHours();
            minute = date.getMinutes();
            second = date.getSeconds();
            if (hour == 10 && minute == 0 && second >= 0 && second <= 30) {
                flags = [0, 0, 0, 0, 0, 0, 0, 0];
            }
            // console.log("i");
            var inv = [546.00, 461.20, 348.60, 994.65, 3419.90, 170.68, 562.20, 358.90]
            var arrll = [546.00 + 30.00, 557.90, 348.60 + 30.00, 1200.65, 3419.00 + 30, 225.50, 748.00, 407.00]
            // var arrll = [546.00, 461.20, 348.60, 994.65, 3419.90, 170.68, 562.20, 358.90]
            const datar = await callFunction();
            if(datar[0] && datar[0][0] && datar)
            for (var i = 0; i < Math.min(inv.length, datar.length); i++) {
                // console.log(datar[0].length);
                if (datar[i][0] && inv[i]>= arrll[i] && flags[i] == 0) {
                    // console.log("---");
                    await sendAboveMail(datar[i][0], arrll[i], inv[i]);
                    flags[i] = 1;
                }
                break;
            }
        }, 1000*120);
    } catch (error) {
        console.log(error);
    }
}
app.get('/', async (req, res) => {
    try {
        const datar = await callFunction();
        data = {
            "symbol": "INDUSINDBK",
            "identifier": "INDUSINDBKEQN",
            "open": 1450.05,
            "dayHigh": 1494.5,
            "dayLow": 1435.95,
            "lastPrice": 1484.5,
            "previousClose": 1463.9,
            "change": 20.6,
            "pChange": 1.41,
            "totalTradedVolume": 4208176,
            "totalTradedValue": 6172552556.8,
            "lastUpdateTime": "14-Feb-2024 15:59:04",
            "yearHigh": 1694.5,
            "yearLow": 990.2,
            "perChange365d": 26.49,
            "perChange30d": -12.55
        }
        sendAboveMail(data, "", "");
        res.status(200).json({ message: datar });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
})
app.use(cors());
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})