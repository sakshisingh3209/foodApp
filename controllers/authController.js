const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const registerController = async(req, res) => {
    try {
        const { userName, email, password, phone } = req.body;
        if (!userName || !email || !password || !phone) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields'
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'Email already registered. Please login here.'
            });
        }
        //hashing
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
            phone
        });
        return res.status(201).send({
            success: true,
            message: 'User successfully registered',
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error in register API',
            error: error.message
        });
    }
};

//login 
const loginController = async(req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Please provide email or password'
            })


        }
        //check user
        const user = await User.findOne({ email });
        if (!user) {

            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }

        //check user password or compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: 'Invalid Credentials'
            });
        }
        //TOKEN
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })
        res.status(200).send({
            success: true,
            message: 'Login successfully',
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login API',
            error
        })
    }
}

module.exports = { registerController, loginController };