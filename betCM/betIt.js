var express= require('express');
var app=express()
var mysql      = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var shasum = crypto.createHash('sha1');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : bd_user,
  password : bd_passwd,
  database : 'betCM'
});
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
passport.use(new LocalStrategy(
  function(username, password, done) {
    /*User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });*/
    connection.query('select * from users where users.nickname="'+username+'" limit 1', function(err, rows, fields) {
      if (err) { return done(err); }
//      res.send(rows);
      if(rows.length==0)
        return done(null, false, { message: 'Incorrect username.' });
      shasum.update(password);
//      console.log(shasum.digest('hex'));
     if(shasum.digest('hex')!=rows[0]["password"])
        return done(null, false, { message: 'Incorrect password.' });
     return done(null, rows[0]);
    });

  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
/*  User.findById(id, function(err, user) {
    done(err, user);
  });*/
    connection.query('select * from users where users.id="'+id+'" limit 1', function(err, rows, fields) {      done(err,rows[0])
    });

});

app.configure(function () {
    app.use(allowCrossDomain);
    app.use(express.static('public'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'keyboard platypus' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
});
app.set('view engine', 'jade');

var getPoules=function(res){
    connection.query('select * from cm_poules', function(err, rows, fields) {
      if (err) throw err;
      //console.log(rows);
      res.render('poules',{matches: rows, dataTest:"coucou"});
          //res.send(rows);
            
    });
}



app.get('/', function(req, res){
    res.send("Hello");
})

/*app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));
*/
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/poules');
    //res.send('hello '+req.user.nickname);
  });
app.get('/login', function(req, res){
    var d='<form action="/login" method="post">'+
          '    <div>'+
          '<label>Username:</label>'+
          '<input type="text" name="username"/>'+
          '</div>'+
          '<div>'+
          '<label>Password:</label>'+
          '<input type="password" name="password"/>'+
          '</div>'+
          '<div>'+
          '<input type="submit" value="Log In"/>'+
          '</div>'+
          '</form>'
    res.send(d);
});

app.get('/users',ensureAuthenticated,function(req, res){
  res.send('coucou '+req.user.nickname);
});
app.get('/poules',ensureAuthenticated,function(req, res){
//  res.header("Content-Type", "application/json; charset=utf-8");
//  res.send('poules '+req.user.nickname);
    getPoules(res);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}


app.listen(2014, function(){
        console.log('listening on port 2014')
})

