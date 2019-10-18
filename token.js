const SECRET = process.env.SECRET || 'mydevkeysecret'
const jwt = require('jsonwebtoken')


const validate = (req, res, next) => {

    let token = req.header('Authorization');
    if (!token) return res.status(401).send({ message: 'Não autorizado' });

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ msg: 'Falha ao autenticar token.' });

        //salva usuario no request para uso posterior
        req.user = decoded;
        next();
    });
}

module.exports = {

    validate: validate

}