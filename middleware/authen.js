const jwt = require('jsonwebtoken');

exports.auth = async ( req, res, next ) => {
    try {
        const token = req.headers.authorization.split('Bearer ')[1];
        console.log(token);
         if(!token)
            return res.status(401).send('No token');
        
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.send('Token invalid').status(500);
    }
};