const UserModel = require("../Models/User");
const UserModel = require("../Models/User");

const Signup = async (req, res) => {
    try {
        const {name, email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({message: 'User is already exist, you can login',success:false})
        }
        const UserModel = new UserModel()
    } catch (err){

    }
}

module.exports = {
    Signup
}