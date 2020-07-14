var express = require('express');
const request = require('request-promise');

//variable global que servira para mantener registro de los precios cada vez que se haga la busqueda
var rates = require('./exchangeRates.json');

var router = express.Router();

router.get('/', async (req, res) => {

})


module.exports = router;