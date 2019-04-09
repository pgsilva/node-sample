const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const route = require("./routes/route");
const chalk = require('chalk');
const ip = require('./ip')
const requestIp = require('request-ip');
require('dotenv').config()

const port = process.env.SERVER_PORT;

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

// parse application/json
app.use(bodyParser.json());
app.use(requestIp.mw());

//ENDPOINTS CONFIG
let logger = (req, res, next) => {
    //TODO config authentication
    var ip = req.clientIp;
    req.logger = new Date().toISOString();
    console.log("[LOG] Requested at: " + req.logger + ", by " + ip);
    next();
};
app.use(logger);
app.use("/morales/", route);

http.listen(port, () =>
    console.log(chalk.blue(Date(Date.now())
        + ': Node server started on '
        + ip + ':' + port + ' ...'))
);

