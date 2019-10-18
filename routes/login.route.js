let express = require('express');
let router = express.Router();
let login = require('../api/login.model');
let token = require('../token')

router.get("/auth", async (req, res, next) => {

    const user = req.query.login;
    const pass = req.query.pass;

    login.login(user, pass).then((results) => {
        res.statusCode = 200;
        res.send(results);
    }).catch((fail) => {
        console.log(fail);
        res.statusCode = 500;
        res.send(fail);
    })

})

router.get("/auth/protect", token.validate, async (req, res, next) => {

    res.statusCode = 200;
    res.send({ message: "Hi, Mr Morales." });

})

router.get("/auth/unsafe", async (req, res, next) => {
    res.statusCode = 200;
    res.send({ message: "Hi, Mr Morales." });
})


module.exports = router;

