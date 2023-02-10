const jwt = require('jsonwebtoken');

function verifyTokenCompany (req, res, next) {
    let token = req.headers.authorization;
    if(!token) {
        return res.status(403).send({
            auth: false,
            token: null,
            message: 'Missing return'
        })
    }
    jwt.verify(token, process.env.JWT_SECRET, function (err, jwtDecoded) {
        if(err) {
            return res.status(403).send({
                auth: false,
                token: null,
                message: 'None authorized'
            })
        }
        req.userToken = jwtDecoded;
        next();
    })
}

module.exports = verifyTokenCompany;