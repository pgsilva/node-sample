let api = {};

api.checkServer = async (req, res, next) => {
    res.json({
        status: "I'm alive",
        msg: "With great power comes great responsibility",
        port: process.env.SERVER_PORT,
        you: req.clientIp
    });
    next();
};

module.exports = api;
