const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || 'mydevkeysecret'
const model = require('./user.model');

module.exports = {

    login: (login, pass) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {

                const users = await model.findByLogin(login);
                if (users[0]) {
                    const agent = users[0];
                    bcrypt.compare(pass, agent.dssenha).then((match) => {
                        console.log(match);
                        if (match) {
                            const token = jwt.sign({
                                user: login
                            }, SECRET, {
                                expiresIn: 3600 * 24 // 1 dia para expirar o token
                            });

                            return resolve({
                                token: token,
                                dsuser: login,
                                nmusuario: agent.nmusuario,
                                dsemail: agent.dsemail,
                                acesso: new Date()
                            })
                        } else {
                            reject({ msg: 'Dados inválidos' });
                        }
                    }).catch((err) => {
                        reject(err);
                    });
                } else {
                    reject({ msg: 'Dados inválidos' });
                }
            }, 2000)
        })
    }
}