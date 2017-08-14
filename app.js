var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('index', {title: 'たいとるですよ', message: 'Hello world!!!!'});
});

app.use(express.static('public'));

app.listen(3000, function() {
  console.log('Express app listening on port 3000!');
});
