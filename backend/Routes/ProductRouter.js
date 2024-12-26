const ensureAuthenticatied = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticatied, (req, res) => {
    console.log("===Loggedin User details------", req.user);
    res.status(200).json([
        {
            name: "mobile",
            price: 10000
        },
        {
            name: "tv",
            price: 20000
        }
    ])
})

module.exports = router;


