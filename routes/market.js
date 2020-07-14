var express = require('express');
const request = require('request-promise');

//variable global que servira para mantener registro de los precios cada vez que se haga la busqueda
var rates = require('./exchangeRates.json');

var router = express.Router();

// Funcion que trae el valor del Bitcoin a USD si es exitoso actualiza su valor en una archivo, 
//sino logra conectarse, trae el valor del archivo.

function TrimString(rate){
	rate = rate.substr(body.indexOf(":") +1 ,body.indexOf("}") -1)
}

async function getBTCPrice () {

	try{
		value = await request('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD', function (error, response, body) {
		  if (error){
		  	//en caso de error reviso el archivo de los registros
		  	console.log('Error ', error)
			return rates["BTC"]
		  }else{
		  	//el api devuelve un string que tengo que cortar
		  	rate = body.substr(body.indexOf(":") +1 ,body.indexOf("}")  - 1);
		  	rates["BTC"] = parseFloat(rate);
		  	return  parseFloat(rate);	
		  }
		});
		value = value.substr(value.indexOf(":") +1 ,value.indexOf("}")  - 1 );
		return parseFloat(value);

	}catch(e){
		console.log('Look something happened ', e)
		return rates["BTC"]

	}
		
}

// Funcion que trae el valor del Ethereum a USD si es exitoso actualiza su valor en una archivo, 
//sino logra conectarse, trae el valor del archivo.


async function getETHPrice () {

	try{
		value = await request('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD', function (error, response, body) {
		  if (error){
		  	console.log('Error ', error)
			return rates["ETH"]
		  }else{
		  	rate = body.substr(body.indexOf(":") +1 ,body.indexOf("}")  - 1);
		  	rates["ETH"] = parseFloat(rate);
		  	return parseFloat(rate);	
		  }
		});
		value = value.substr(value.indexOf(":") +1 ,value.indexOf("}")  - 1 );
		return parseFloat(value);

	}catch(e){
		console.log('Look something happened ', e)
		return rates["ETH"]
	}
	
}

// Funcion que trae el valor del DASH a USD si es exitoso actualiza su valor en una archivo, 
//sino logra conectarse, trae el valor del archivo.


async function getDASHPrice () {

	try{
		value = await request('https://min-api.cryptocompare.com/data/price?fsym=DASH&tsyms=USD', function (error, response, body) {
		  if (error){
		  	console.log('Error ', error)
			return rates["DASH"]
		  }else{
		  	rate = body.substr(body.indexOf(":") +1 ,body.indexOf("}")  - 1);
		  	rates["DASH"] = parseFloat(rate);
		  	return parseFloat(rate);	
		  }
		});
		value = value.substr(value.indexOf(":") +1 ,value.indexOf("}")  - 1 );
		return parseFloat(value);
	}catch(e){
		console.log('Look something happened ', e)
		return rates["DASH"]
	}	
}

// Funcion que trae el valor del Euro a USD si es exitoso actualiza su valor en una archivo, 
//sino logra conectarse, trae el valor del archivo.


async function getEURPrice () {

	try{
		value = await request('https://min-api.cryptocompare.com/data/price?fsym=EUR&tsyms=USD', function (error, response, body) {
		  if (error){
		  	console.log('Error ', error)
			return rates["EUR"]
		  }else{
		  	rate = body.substr(body.indexOf(":") +1 ,body.indexOf("}")  - 1);
		  	rates["EUR"] = parseFloat(rate);
		  	return parseFloat(rate);
		  }
		  
		});
		value = value.substr(value.indexOf(":") +1 ,value.indexOf("}")  - 1 );
		return parseFloat(value);
	}catch(e){
		console.log('Look something happened ', e)
		return rates["EUR"]
	}
		
}

// Funcion que trae el valor del Bolivar a USD si es exitoso actualiza su valor en una archivo, 
//sino logra conectarse, trae el valor del archivo.


async function getBSPrice () {

	try{
		value = await request('https://min-api.cryptocompare.com/data/price?fsym=VEF&tsyms=USD', function (error, response, body) {
			if (error){
				console.log('Error ', error)
				return rates["VEF"]
			}else{
				rate = body.substr(body.indexOf(":") +1 ,body.indexOf("}")  - 1);
			  	rates["VEF"] = parseFloat(rate);
			  	return parseFloat(rate);
			}
		});
		value = value.substr(value.indexOf(":") +1 ,value.indexOf("}")  - 1 );
		return parseFloat(value);
	}catch(e){
		console.log('Look something happened ', e)
		return rates["VEF"]
	}

}

async function getPTRPrice (){

	return rates["PTR"]
}


// Home page route.
router.get('/', async (req, res) => {
	prices = {}

	prices['BTC'] = await getBTCPrice();
	prices['ETH'] = await getETHPrice();
	prices['DASH'] = await getDASHPrice();
	prices['EUR'] = await getEURPrice();
	prices['VEF'] = await getBSPrice();
	prices['PTR'] = await getPTRPrice();
	console.log(rates)
	res.send(prices);
	

})


module.exports = router;