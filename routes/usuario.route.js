let express = require('express');
let router = express.Router();
let login = require('../api/usuario/login.model');
let usuario = require('../api/usuario/user.model');
let token = require('../token')

router.post("/auth", async (req, res, next) => {

    const user = req.body.login;
    const pass = req.body.pass;

    login.login(user, pass).then((results) => {
        res.statusCode = 200;
        res.send(results);
    }).catch((fail) => {
        console.log(fail);
        res.statusCode = 500;
        res.send(fail);
    })

})

router.post('/auth/register', async (req, res, next) => {
    const user = req.body;

    usuario.register(user).then((results) => {
        res.statusCode = 200;
        res.send(results);
    }).catch((fail) => {
        console.log(fail);
        res.statusCode = 500;
        res.send(fail);
    })
});

router.get("/auth/protect", token.validate, async (req, res, next) => {

    res.statusCode = 200;
    res.send({ message: "Hi, Mr Morales." });

})

router.get("/auth/unsafe", async (req, res, next) => {
    res.statusCode = 200;
    res.send({ message: "Hi, Mr Morales." });
})


module.exports = router;

