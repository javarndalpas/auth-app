const { addProperty, getProperties } = require('../Controllers/PropertiesController');

const router = require('express').Router();

router.post('/' , addProperty)
router.get('/', getProperties);

module.exports = router;
