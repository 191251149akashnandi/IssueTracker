const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homw_controller');

// routes for rendering home page
router.get('/', homeController.home);

//routes for accessing project file in which all neccessory routes defibed
router.use('/project', require('./prject'))

module.exports = router;
