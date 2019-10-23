const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || 'mydevkeysecret'
const model = require('./user.model');

module.exports = {

    login: (login, pass) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {

                const usuario = await model.findByLogin(login);
                bcrypt.compare(pass, usuario[0].dssenha).then((match) => {
                    console.log(match);
                    if (match) {
                        const token = jwt.sign({
                            user: login
                        }, SECRET, {
                            expiresIn: 3600 * 24 // 1 dia para expirar o token
                        });

                        return resolve({
                            token: token,
                            user: login
                        })
                    } else {
                        reject({ msg: 'Dados inválidos' });
                    }
                }).catch((err) => {
                    reject(err);
                });
            }, 2000)
        })
    }
}