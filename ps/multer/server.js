var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;;
var bodyParser = require('body-parser');
var jsonparser = require('json-parser');
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://zenwaystest:pf1bc@ds056979.mlab.com:56979/zenwaystest');
//mongoose.connect('mongodb://localhost/multer');
var routes = require('./router/router');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api', routes)
// app.use(express.static(__dirname + '/public'));
// app.use(function (req, res) {
//     res.sendFile(__dirname + '/public/index.html');
// });
app.listen(PORT, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Server started at : ' + PORT);
    }
});