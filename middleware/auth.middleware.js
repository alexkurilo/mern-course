const jwt = require('jsonwebtoken');
const config = require("config");

const JWT_SECRET = config.get('jwtSecret');

module.exports = (request, response, next) => {
    if (request.method === 'OPTIONS') {//проверяем доступрост сервера
        return next();
    }
    
    try {
        const token = request.headers.authorization.split(' ')[1]; //извлекаю token из "Bearer <TOKEN>"

        if (!token) {
            return response.status(401).json({ message: "Not authorisation."});
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        request.user = decoded;

        next();
    } catch (e) {
        return response.status(401).json({ message: "Not authorisation!"});
    }
};