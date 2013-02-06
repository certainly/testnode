
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
    app.set('view options', { layout: true
    });
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/hello',routes.hello);
app.get('/users', user.list);

var users = {
    'cd': {
        name: 'Carbo',
        website: 'http://www.byvoid.com'
    }
};


//app.all('/user/:username', function(req, res, next) { console.log('all methods captured');
//    next();
//});
//app.get('/user/:username', function(req, res) {
//    res.send('user: ' + req.params.username);
//});

app.all('/user/:username', function(req, res, next) {
    if (users[req.params.username]) {
        next();
    } else {
        next(new Error(req.params.username + ' does not exist.'));
    }
});
app.get('/user/:username', function(req, res) {
    res.send('dfdfs:    '+JSON.stringify(users[req.params.username]));
});
app.put('/user/:username', function(req, res) {
    res.send('Done');
});

//app.get('/list', function(req, res) { res.render('list', {
//    title: 'List',
//    items: [1991, 'byvoid', 'express', 'Node.js'] });
//});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
