var express = require('express');
var app = express();

var market = require('./routes/market.js')
var exchange = require('./routes/exchange.js')

app.use('/market',market);
app.use('/exchange',exchange);

app.get('/', function (req, res) {

  res.send('Server Up!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});