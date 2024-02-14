const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const sendAboveMail = ( data,curr,inv) => {
    const flag = 0;
    console.log("here")
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });
    //     symbol:"HEROMOTOCO"
    // identifier:"HEROMOTOCOEQN"
    // open:4707
    // dayHigh:4825
    // dayLow:4661.1
    // lastPrice:4825
    // previousClose:4744.8
    // change:80.2
    // pChange:1.69
    // totalTradedVolume:735284
    // totalTradedValue:3498929795.24
    // lastUpdateTime:"14-Feb-2024 15:59:42"
    // yearHigh:4949.05
    // yearLow:2246
    // perChange365d:85.23
    // perChange30d:8.25
    const { symbol, identifier, open, dayHigh, dayLow, lastPrice, previousClose, change, pChange, totalTradedVolume, totalTradedValue, lastUpdateTime, yearHigh, yearLow, perChange365d, perChange30d } = data;
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    console.log(hour, minute, second, day, month, year);
    const Month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const cont=`
    <html lang="en">
    <head>
        <title>
            </title>
            </head>
            <body>
            <h1>
            ${identifier} Inv:${inv} Now:${curr} target
            </h1>
        <p>
            <div>${hour}:${minute}:${second} 
                ${day} ${Month[month]} ${year}    
            </div>
            <table style="border-style: solid; border-color: grey;">
                <tr style="border-style: solid; border-color:black;">
                    <td>Symbol</td>
                    <td>${symbol}</td>
                </tr>
                <tr style="border-style: solid; border-color:black;">
                    <td>Identifier</td>
                    <td>${identifier}</td>
                </tr>
                <tr style="border-style: solid; border-color:black;">
                    <td>Open</td>
                    <td>${open}</td>
                </tr>
                <tr style="border-style: solid; border-color:black;">
                    <td>Day High</td>
                    <td>${dayHigh}</td>
                </tr>
                <!-- add all of these -->
                <tr style="border-style: solid; border-color:black;">
                    <td>Day Low</td>
                    <td>${dayLow}</td>
                </tr>
                <tr style="border-style: solid; border-color:black;">
                    <td>Last Price</td>
                    <td>${lastPrice}</td>
                </tr>
                <tr style="border-style: solid; border-color:black;">
                    <td>Previous Close</td>
                    <td>${previousClose}</td>
                </tr>
                <tr style="border-style: solid; border-color:black;">
                    <td>Change</td>
                    <td>${change}</td>
                </tr>
                <tr style="border-style: solid; border-color:black;">
                    <td>% Change</td>
                    <td>${pChange}</td>
                </tr>
                <tr style="border-style: solid; border-color:black;">
                    <td>Total Traded Volume</td>
                    <td>${totalTradedVolume}</td>
                </tr>
                <tr style="border-style: solid; border-color:black;">
                    <td>Total Traded Value</td>
                    <td>${totalTradedValue}</td>
                </tr>
                <tr style="border-style: solid; border-color:black;">
                    <td>Last Update Time</td>
                    <td>${lastUpdateTime}</td>
                </tr>
                <tr style="border-style: solid; border-color:black;">
                    <td>Year High</td>
                    <td>${yearHigh}</td>
                </tr>
                <tr style="border-style: solid; border-color:black;">
                    <td>Year Low</td>
                    <td>${yearLow}</td>
                </tr>
                <tr style="border-style: solid; border-color:black;">
                    <td>% Change 365d</td>
                    <td>${perChange365d}</td>
                </tr>
                <tr style="border-style: solid; border-color:black;">
                    <td>% Change 30d</td>
                    <td>${perChange30d}</td>
                </tr>

            </table>
        </p>
    </body>
</html>
`
const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.TOEMAIL,
        subject: `${symbol} Crossed ${curr} target from ${inv}`,
        html: cont
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log('Email sent to',process.env.TOEMAIL);
            return true;
        }
    });
}
module.exports = sendAboveMail;