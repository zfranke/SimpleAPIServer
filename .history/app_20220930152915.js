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
 */
app.get("/", (req, res) => {
    res.send("Hello World");
})
