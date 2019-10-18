const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = '123';
const SECRET = process.env.SECRET || 'mydevkeysecret'

geraHesh = (pass, salt) => {
    return new Promise((res, rej) => {
        bcrypt.hash(pass, salt, (err, hash) => {
            // Store hash in your password DB.
            console.log(hash);
            res(hash);
        });
    })
}
module.exports = {

    login: (login, pass) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                let fakeKey = crypto.createHash('md5').update(key).digest('hex');

                const saltRounds = 10;
                await geraHesh(pass, saltRounds).then((hash) => {
                    fakeKey = hash;
                });

                bcrypt.compare(pass, fakeKey).then((match) => {
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