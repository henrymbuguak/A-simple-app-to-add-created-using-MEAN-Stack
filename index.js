var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var task = require('./routes/task');

var port = 3000;
//our main app
var app = express();

//our view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//setting static folder for anglar staff
app.use(express.static(path.join(__dirname, 'client')));

//using body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//our routes
app.use('/', index);
app.use('/api', task);

//setting listening port for our server
app.listen(port, function () {
  console.log('Server running at port '+port);
});
