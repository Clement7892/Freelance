function verifyTokenIsAdmin (req, res, next) {
    console.log(req.userToken)
    if(req.userToken.isAdmin == false) {
        res.status(401).send({
            auth: false,
            message: 'You must be Admin'
        })
    }
    next();
}

module.exports = verifyTokenIsAdmin;