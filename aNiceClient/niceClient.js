var express = require('express')
var app=express()
var events=require('events')
var eventEmitter = new events.EventEmitter();
var fs = require('fs');
var querystring = require('querystring');
var http = require('http');
var request = require('request');
//var mysql      = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var shasum = crypto.createHash('sha1');

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
var USERNAME='';
VAR PASSWORD='';
var URL_PREFIX='http://api.t411.me';

/*token functions*/
var getToken=function(){
 var params = {
        url: URL_PREFIX+'/auth',
        method : "POST",
        headers: {
            'User-Agent' : "Mozilla/5.0 (Windows NT 5.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36"
        },
        form: { username: USERNAME, password : PASSWORD }
    };

request(
    params,
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
            theToken=JSON.parse(body)
            return body;
  //          res.send(body);
            console.log(theToken)
        }
        else
            throw(error);
    }
);
}
var theToken=getToken();
//console.log(theToken);
/*end token*/
/*initialization*/
var getCategories=function(res){
    var params = {
        url: URL_PREFIX+'/categories/tree',
        headers: {
            'Authorization' : theToken.token,
            'User-Agent' : "Mozilla/5.0 (Windows NT 5.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36"
        }
    };
    request.get(params,function(error,response, body){
       if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body));
        } 
    })

};
/**/
var searchFor=function(data,res){
    var params = {
        url: URL_PREFIX+'/torrents/search/'+data,
        headers: {
            'Authorization' : theToken.token,
            'User-Agent' : "Mozilla/5.0 (Windows NT 5.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36"
        }
    };
    request.get(params,function(error,response, body){
       if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body));
        }
    })
};
var getTerms=function(res){
    var params = {
        url: URL_PREFIX+'/terms/tree',
        headers: {
            'Authorization' : theToken.token,
            'User-Agent' : "Mozilla/5.0 (Windows NT 5.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36"
        }
    };
    request.get(params,function(error,response, body){
       if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body));
        }
    })
};

var getDetails=function(tid,res){
    var params = {
        url: URL_PREFIX+'/torrents/details/'+tid,
        headers: {
            'Authorization' : theToken.token,
            'User-Agent' : "Mozilla/5.0 (Windows NT 5.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36"
        }
    };
    request.get(params,function(error,response, body){
       if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body));
        }
    })
};
var downloadTorrent=function(tid,res){
    var params = {
        url: URL_PREFIX+'/torrents/download/'+tid,
        headers: {
            'Authorization' : theToken.token,
            'User-Agent' : "Mozilla/5.0 (Windows NT 5.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36"
        }
    };
	var file = fs.createWriteStream("/home/torrents/"+tid+".torrent");
    request.get(params).pipe(file);
	file.on('finish', function() {
				file.close(function(){
					res.send('added');
				});  // close() is async, call this after close completes.
			});
};
var getTop=function(qualif,res){
    var params = {
        url: URL_PREFIX+'/torrents/top/'+qualif,
        headers: {
            'Authorization' : theToken.token,
            'User-Agent' : "Mozilla/5.0 (Windows NT 5.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36"
        }
    };
    request.get(params,function(error,response, body){
       if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body));
        }
    })
};
app.get('/', function(req, res){
    res.header("Content-Type", "text/html; charset=utf-8");
    res.render("home");
})
app.get('/renewToken', function(req, res){
        res.header("Content-Type", "application/json; charset=utf-8");
        theToken=getToken();
        res.send('Token renewed for 90 days');

})
app.get('/categories',function(req,res){
        res.header("Content-Type", "application/json; charset=utf-8");
        getCategories(res);
});
app.get('/search/:name',function(req,res){
        res.header("Content-Type", "application/json; charset=utf-8");
        searchFor(req.params.name, res);
});
app.get('/search/:name/:cat',function(req,res){
        res.header("Content-Type", "application/json; charset=utf-8");
        searchFor(req.params.name+"&cid="+req.params.cat, res);
});

app.get('/tree',function(req,res){
        res.header("Content-Type", "application/json; charset=utf-8");
        getTerms(res);
});
app.get('/details/:tid',function(req,res){
        res.header("Content-Type", "application/json; charset=utf-8");
        getDetails(req.params.tid,res);
});
app.get('/download/:tid',function(req,res){
        res.header("Content-Type", "application/json; charset=utf-8");
        downloadTorrent(req.params.tid,res);
});
app.get('/top',function(req,res){
        res.header("Content-Type", "application/json; charset=utf-8");
        getTop("100",res);
});
app.get('/top/:qualif',function(req,res){
        res.header("Content-Type", "application/json; charset=utf-8");
        getTop(req.params.qualif,res);
});

app.listen(1337, function(){
        console.log('listening on port 1337')
})
