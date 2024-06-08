const express = require('express');
const { registerController, loginController } = require('../controllers/authController');
const router = express.Router();



//register route

router.post('/register', registerController);


//login route
router.post('/login', loginController);
module.exports = router;