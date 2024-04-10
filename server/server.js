const express = require('express')
const app = express()
const cors = require('cors');

const bodyParser = require("body-parser");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





app.listen(8000, () => {
    console.log("server is run")
})