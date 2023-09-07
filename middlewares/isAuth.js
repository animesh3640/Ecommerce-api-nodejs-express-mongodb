const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const isAuth = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers["authorization"];
        if (!token) {
            res.status(400).send({ status: 400, message: 'User Not Authenticated !' })
        }

        try {
            const decode = jwt.verify(token, SECRET_KEY);
            req.user = decode;
        } catch (err) {
            res.status(400).send({ message: 'Invalid Token', data: err })

        }
        return next();
    } catch (err) {
        res.status(500).send({ status:500, message: "internal server error" ,data:err})
    }
}

module.exports = isAuth;