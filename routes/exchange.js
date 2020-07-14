var express = require('express');
const request = require('request-promise');

//variable global que servira para mantener registro de los precios cada vez que se haga la busqueda
var rates = require('./exchangeRates.json');

var router = express.Router();

function getRates(moneda, monto,res){
	url = "https://min-api.cryptocompare.com/data/price?fsym=" + moneda + "&tsyms=USD,VEF,EUR,DASH,BTC,ETH";
	try{
		if (moneda != "PTR"){
			request(url, function (error, response, body) {
				usd = "USD"
				body = JSON.parse(body);
				for (var key of Object.keys(body)) {
	    			body[key] =  body[key] * monto
				}
				res.status(200).json({
					"mensaje": "Convertidos " + monto + moneda,
					"data" : body
				})
				
			});
		}else{
			//dado que el petro no se encuentra en la api se saca la cuenta aparte
			url = "https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=USD,VEF,EUR,DASH,BTC,ETH";
			request(url, function (error, response, body) {
				body = JSON.parse(body);
				for (var key of Object.keys(body)) {
	    			body[key] =  body[key] * rates["PTR"] * monto
				}
				body["PTR"] = monto;
				res.status(200).json({
					"mensaje": "Convertidos " + monto + moneda,
					"data" : body
				})
				
			});
		}
	}catch(e){
		console.log('Look something happened ', e)
	}
}


router.post('/', async (req, res) => {

	let monto = req.query.monto;
	let moneda = req.query.moneda;
		moneda = moneda.toUpperCase()
	if (rates[moneda] != null){
		getRates(moneda,monto,res);
	}else{
		res.status(404).json({
			"mensaje": "No trabajamos con esa moneda"
		})
		res.end();
	}

})


module.exports = router;