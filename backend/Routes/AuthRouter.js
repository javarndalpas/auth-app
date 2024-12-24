const { Signup, Login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, Login)

// router.post('/signup',(req,res)=>{
//     res.send('Signup success')
// })

router.post('/signup', signupValidation , Signup)

module.exports = router;
