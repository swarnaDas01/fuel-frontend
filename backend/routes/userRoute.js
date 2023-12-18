const express = require("express");
const { registerUser, LoginUser, getUsers, logoutUser, Updatepassword, ForgotPassword, currentLoginUserProfile, getSingleUser } = require("../controllers/userController");
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();

router.get('/users', isAuthenticated, authorizeRoles('admin', 'manager'), getUsers);

router.post('/user/register', registerUser);

router.post('/user/login', LoginUser);

router.get('/user/logout', logoutUser);

router.post('/user/password/forgot', ForgotPassword);
router.put('/user/change-password', Updatepassword);
router.get('/user/single-user/:id', isAuthenticated, getSingleUser);

// current login user
router.get('/user/profile', isAuthenticated, currentLoginUserProfile);

module.exports = router;