const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const route = require("./routes/route");
const chalk = require('chalk');
const ip = require('./ip')
const morgan = require('morgan')
const requestIp = require('request-ip');
const loginRouter = require('./routes/login.route');
require('dotenv').config()

const port = process.env.SERVER_PORT;

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.text({ type: 'text/html' }))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())
// parse application/json
app.use(bodyParser.json());
app.use(requestIp.mw());
app.use(morgan('dev'))
app.use("/morales", route);
app.use("/morales/login", loginRouter);

//ENDPOINTS CONFIG
let logger = (req, res, next) => {
    //TODO config authentication
    var ip = req.clientIp;
    req.logger = new Date().toISOString();
    console.log("[LOG] Requested at: " + req.logger + ", by " + ip);
    next();
};
app.use(logger);
// Tratamento de erro genérico
app.use(function (err, req, res, next) {
    res.locals.message = err.message
    console.log(err)

    if (err.errorView) {
        console.log('error');
    } else {
        res.status(err.status || 500).send({
            msg: "I'm dead",
            cause: err
        });
    }
});

http.listen(port, () =>
    console.log(chalk.blue(Date(Date.now())
        + ': Node server started on '
        + ip + ':' + port + ' ...'))
);

