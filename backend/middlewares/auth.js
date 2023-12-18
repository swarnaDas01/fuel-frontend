const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');


// authorise user authentication.
exports.isAuthenticated = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Unauthorized! No token provided.' });
        }

        const token = authorizationHeader.split(' ')[1];
        // console.log('token From isAuthenticated: ', token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(401).json({ message: 'Unauthorized! Invalid token.' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message,
        });
    }
};


// authorize Multiple Role 
exports.authorizeRoles = (...roles) => {
    const rolesArray = [...roles];
    try {
        return (req, res, next) => {
            const userRole = req.user.role;
            const result = rolesArray.map(role => userRole.includes(role)).find(item => item === true);

            if (!result) return res.status(401).json({
                message: `${req.user.role} cann't authorized to access this route.`
            })
            next();
        }

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}
