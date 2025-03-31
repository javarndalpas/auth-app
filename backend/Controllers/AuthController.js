const bcrypt = require('bcrypt');
const UserModel = require('../Models/User');
const jwt = require('jsonwebtoken');

const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password);
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false })
        }
        const userModel = new UserModel({ name, email, password })
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        console.log("Error:", err)
        res.status(500)
            .json({
                message: "Internal Server Error",
                success: false
            })
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errmsg = "Login failed Email or Password is wrong";
        if (!user) {
            return res.status(403)
                .json({ message: errmsg, success: false })
        }
        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if (!isPasswordEqual) {
            return res.status(403)
                .json({ message: errmsg, success: false })
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login successfully",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        console.log("Error:", err)
        res.status(500)
            .json({
                message: "Internal Server Error",
                success: false
            })
    }
}

module.exports = {
    Signup,
    Login
}