const { Signup } = require('../Controllers/AuthController');
const { signupValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login',(req,res)=>{
    res.send('login success')
})

router.post('/signup',(req,res)=>{
    res.send('Signup success')
})

router.post('/signup', signupValidation , Signup)


module.exports = router;