Prueba Back para chinchinPagos Luis Liguori

Instrucciones de instalaciónÑ

		1. Descargar/clonar Repositorio
		2. npm install.
		3. npm start.

Servicios.

	get /market

		Servicio que retorna el equivalente de 1$ dolar en las siguientes monedas BTC,DASH,EUR,VEF,PTR,ETH.

		Ejemplo de Respusta

		{
		  "BTC": 9224.19,
		  "ETH": 239.22,
		  "DASH": 70.77,
		  "EUR": 1.133,
		  "VEF": 2e-7,
		  "PTR": 60
		}

		Cada vez que corre exitosamente este servicio se actualiza el archivo exchangeRates.json, en caso de que falle la conexión al api se utilizará el archivo para tomar el ultimo valor conseguido.

		Limitaciones:
			
			1. Debido a que no encontre un API para el Petro el valor siempre es el de por defecto 60.
			2. Se necesita al menos una llamada al servicio exitosa para cargar unos valores al archivo.


	POST /exchange

		Servicio que recibe los parametros query STRING monto y moneda y devuelve la conversión en todas las monedas disponibles.

		Ejemplo de Query:

		exchange?monto=100&moneda=PTR

		retorna la siguiente respuesta:

		{
		  "mensaje": "Convertidos 100PTR",
		  "data": {
		    "USD": 6000,
		    "VEF": 30518234280,
		    "EUR": 5300.4,
		    "DASH": 84.78,
		    "BTC": 0.6509999999999999,
		    "ETH": 25.092,
		    "PTR": "100"
		  }
		}

