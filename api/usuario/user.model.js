const db = require('../../sql/sql')
const bcrypt = require("bcrypt");

findByLogin = (login) => {
    return new Promise((resolve, reject) => {
        const query = "select l.*, u.nmusuario from login l " + 
                        "left join usuario u  on u.idlogin = l.idlogin " + 
                        "where l.dsemail like concat('%', ? , '%') or l.dsuser like concat('%', ? , '%')";

        db.exec(query, [login, login]).then(results => {
            resolve(results);
        }).catch(err => {
            console.log(err);
            reject(err)
        });
    })
}

geraHesh = (pass, salt) => {
    return new Promise((res, rej) => {
        bcrypt.hash(pass, salt, (err, hash) => {
            // Store hash in your password DB.
            console.log('Hash password created');
            res(hash);
        });
    })
}

module.exports = {

    findByLogin: (login) => {
        return findByLogin(login);
    },

    register: (user) => {
        return new Promise(async (resolve, reject) => {
            const queryLogin = 'INSERT INTO login(dsuser,dssenha,dsemail,dtcriacao,nrperfil) values (?, ?, ?, ?, ? )';
            const queryUsuario = 'INSERT INTO usuario(nmusuario, dsemail, nmrua, nmcidade, nmestado, dscomplemento, dsnumeroend, nrcelular, nrcpf, idlogin) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

            const conn = await db.getConnection();
            //necessario uma transaction para o processo de cadastro de usuario
            // --> criptografar senha 
            const saltRounds = 10;
            let hashPass = await geraHesh(user.dssenha, saltRounds);

            const usuario = await findByLogin(user.dsuser);

            let isvalid = false;
            if (!usuario[0]) {
                isvalid = true;
            }

            if (isvalid) {
                conn.beginTransaction();

                const valuesLogin =
                    [user.dsuser, hashPass, user.dsemail, new Date(), user.nrperfil];

                db.exec(queryLogin, valuesLogin, conn).then(results => {
                    console.log("Login cadastrado id: " + results.insertId);

                    const valuesUsuario =
                        [user.nmusuario, user.dsemail, user.nmrua, user.nmcidade, user.nmestado, user.dscomplemento, user.dsnumeroend, user.nrcelular, user.nrcpf, results.insertId];

                    db.exec(queryUsuario, valuesUsuario, conn).then(results => {
                        console.log(results);
                        conn.commit();
                        resolve(results);
                    }).catch(err => {
                        console.log(err);
                        conn.rollback();
                        reject(err)
                    });
                }).catch(err => {
                    console.log(err);
                    conn.rollback();
                    reject(err);

                }).finally(() => {
                    conn.release();
                });
            } else {
                reject({ msg: 'E-mail já cadastrado na base de dados.' })
            }
        });
    },
};