const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        if(!token) {
            return res.status(401).json({error: 'Auth error'})
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decodedToken
        console.log(decodedToken)
        next()
    } catch (e) {
        console.log(e)
        return res.status(401).json({error: 'Auth error(catch block)'})
    }
}