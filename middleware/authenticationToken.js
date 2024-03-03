const jwt = require('jsonwebtoken');

function authenticationToken(req, res, next) {
 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).send('Pervin Denied');

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = user;
        next();
    })
}

module.exports = authenticationToken;