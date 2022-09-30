// Setup
const express = require('express');
const app = express();

const multer = require('multer');
const PORT = 99;

app.use(express.json())

app.listen(
    PORT,
    () => console.log(`Simple API Online @: http://localhost:${PORT}`)
)

/**
 * @api Homepage
 * #Method: GET
 * #URL: http://localhost:PORT/
 * #Description: Shows all of the available api endpoints as well as a description of what they do.
 * #List of Endpoints:
 * - /math
 * 
 */
app.get('/', (req, res, next) => {
  res.send(` 
    <h1>Simple API Server</h1>
    <p>Written by Zach Franke</p>
    <br>
    <h2>Below is a list of api endpoints</h2>
    <ul>
      <li>/math</li>
    </ul>
      
    `);
});

/**
 * @api Basic Math
 * #Method: GET, POST
 * #URL: http://localhost:PORT/math
 * #Description: Performs basic math operations on two numbers.
 * #Body: { "num1": 1, "num2": 2, "operation": "add" }
 * #Params: num1, num2, operation
 * #Response: { "result": 3 }
 * #Operation: add, subtract, multiply, divide
 * 
 * #Example: http://localhost:PORT/math?num1=1&num2=2&operation=add
 * #Example: http://localhost:PORT/math?num1=1&num2=2&operation=subtract
 * #Example: http://localhost:PORT/math?num1=1&num2=2&operation=multiply
 * #Example: http://localhost:PORT/math?num1=1&num2=2&operation=divide
 * 
 * #Example: http://localhost:PORT/math
 * #Body: { "num1": 1, "num2": 2, "operation": "add" }
 * 
 * #Example: http://localhost:PORT/math
 * #Body: { "num1": 1, "num2": 2, "operation": "subtract" }
 * 
 * #Example: http://localhost:PORT/math
 * #Body: { "num1": 1, "num2": 2, "operation": "multiply" }
 * 
 * #Example: http://localhost:PORT/math
 * #Body: { "num1": 1, "num2": 2, "operation": "divide" }
 * 
 * #Example: http://localhost:PORT/math
 * #Body: { "num1": 1, "num2": 2, "operation": "invalid" }
 * #Response: { "error": "Invalid operation" }
 * 
 **/

app.get("/math", (req, res) => {
    const { num1, num2, operation } = req.query;
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
    res.json({ result });
})

app.post("/math", (req, res) => {
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
    res.json({ result });
})
