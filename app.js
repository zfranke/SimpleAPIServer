// Setup
const express = require('express');
const app = express();
const fs = require('fs');

//Logging Setup
const EventEmitter = require('events');
var myEmitter = new EventEmitter();

const multer = require('multer');
const PORT = 99;

app.use(express.json())

//Support Functions
function getTimeStamp() {
    var date = new Date();
    var timestamp = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return timestamp;
}

/**
 * Emitter Events
*/

//Emitter for when the program Starts, write the results with timestamp to the log file
myEmitter.on('start', function () {
    var timestamp = getTimeStamp();
    fs.appendFileSync('Logs/application.log', timestamp + ": Program Started\n");
});

//Emitter for when / is called, write the results with timestamp to the log file
myEmitter.on('home', function () {
    var timestamp = getTimeStamp();
    fs.appendFileSync('Logs/application.log', timestamp + ": Home Page Accessed\n");
});

//Emitter for when math is called, write the results with timestamp to the log file
myEmitter.on('math', function () {
    var timestamp = getTimeStamp();
    fs.appendFileSync('Logs/application.log', timestamp + ": Math Page Accessed\n");
});

//Emitter for when get /mathHandler is called, write the results with timestamp to the log file
myEmitter.on('mathHandle', function (num1, num2, result) {
    var timestamp = getTimeStamp();
    fs.appendFileSync('Logs/application.log', timestamp + ": Math Page Accessed, Num1: " + num1 + ", Num2: " + num2 + ", Result: " + result + "\n");
});

/**
 * @api Homepage
 * #Method: GET
 * #URL: http://localhost:PORT/
 * #Description: Shows all of the available api endpoints (as a link) as well as a description of what they do.
 * #List of Endpoints:
 * - /math
 * 
 */
app.get('/', (req, res, next) => {
    myEmitter.emit('home');
    res.send(` 
        <h1>Simple API Server</h1>
        <p>Written by Zach Franke</p>
        <br>
        <h2>Below is a list of api endpoints</h2>
        <ul>
            <li><a href="/math">/math</a></li>
        </ul>
        
    `);
});

/**
 * @api Basic Math
 * #Method: GET, POST
 * #URL: http://localhost:PORT/math
 * #Description: Performs basic math operations on two numbers.
 * 
 **/

app.get("/math", (req, res) => {
    myEmitter.emit('math');
    res.send(` 
    <h1>Basic Math API Online</h1>
    <p>Written by Zach Franke</p>
    <h2>Enter two numbers and the type of basic math you want to do</h2>
    <form method="POST" action="/mathHandler" enctype="multipart/form-data">
    <input type="text" name="num1" id="num1" placeholder="Number 1">
    <input type="text" name="num2" id="num2" placeholder="Number 2">
    <select name="problem" id="problem">
                <option value="add">Addition</option>
                <option value="subtract">Subtraction</option>
                <option value="multiply">Multiplication</option>
                <option value="divide">Division</option>
    <input type="submit">
</form>`);
});

app.post("/mathHandler", (req, res) => {
    const { num1, num2, operation } = req.body;
    let result = 0;
    switch (operation) {
        case "add":
            result = parseInt(num1) + parseInt(num2);
            break;
        case "subtract":
            result = parseInt(num1) - parseInt(num2);
            break;
        case "multiply":
            result = parseInt(num1) * parseInt(num2);
            break;
        case "divide":
            result = parseInt(num1) / parseInt(num2);
            break;
        default:
            res.status(400).json({ error: "Invalid operation" });
            return;
    }
    res.send(`
        <h1>Basic Math API Online</h1>
        <h3>Result</h3>
        <p>${result}</p>
        <input type="button" value="Back" onclick="history.back()">
        `);
    myEmitter.emit('mathHandle', num1, num2, result);
})



//App Listen
app.listen(PORT, () => {
    myEmitter.emit('start');
    var timestamp = getTimeStamp();
    console.log(timestamp + " Simple API Server: Starting");
    console.log(timestamp + ` Server listening on ${PORT}`);
    //Offer a link to connect to the server
    console.log(timestamp + ` To connect to the server, go to http://localhost:${PORT}`);
    console.log(timestamp + ` To terminate server, use Control+C`);
});