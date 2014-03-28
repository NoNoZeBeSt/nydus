var express = require('express')
var app=express()
var events=require('events')
var eventEmitter = new events.EventEmitter();
var fs = require('fs');
var querystring = require('querystring');
var http = require('http');

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
	app.use(express.bodyParser());
});


// http://nodejs.org/api.html#_child_processes
var sys = require('sys')
var exec = require('child_process').exec;
var child;

var dlTorrent=function(torID){
child = exec("/home/tests/torrent_dl.sh http://www.t411.me/torrents/download/?id="+torID, function (error, stdout, stderr) {
 sys.print('stdout: ' + stdout);
 sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
	return false;
  }
});
	return true;
}
var writeLog=function(id){
fs.appendFile("/home/tests/added_from_node.log", new Date()+" : "+id+"\n", function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
}); 
}


app.get('/', function(req, res){
                res.header("Content-Type", "application/json; charset=utf-8");
                res.send('hello');

})
app.get('/:id', function(req, res){
		res.header("Content-Type", "application/json; charset=utf-8");
		writeLog(req.params.id);
		if(dlTorrent(req.params.id))
			res.send({added:'true'})
		else
			res.send({added:'false'});
})

app.listen(1664, function(){
        console.log('listening on port 1664')
})

