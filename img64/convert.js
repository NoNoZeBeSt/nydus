var express = require('express'), request = require('request'), BufferList = require('bufferlist').BufferList, sys = require('sys');
var app=express()
var fs=require('fs');
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
    app.use(express.bodyParser({uploadDir:__dirname + '/upload'}));
});

var delIt=function(fname){
    fs.unlink(fname, function (err) {
      if (err) throw err;
      console.log('successfully deleted '+fname);
    });
}

app.get('/', function(req, res){
    res.header("Content-Type", "text/html; charset=utf-8");
//    res.send('hello');
    res.write("<html><head></head><body>");
    res.write("<form name='disp' action='/' method='POST' enctype='multipart/form-data' >")
    res.write("<input type='file' name='displayImage' />")
    res.write("<input type='submit' value='Submit' />")
    res.write("</form>");
    res.write("</body></html>");
    res.end();

})
app.post('/', function(req, res){
    res.header("Content-Type", "application/json; charset=utf-8");
    res.header("Content-Type", "text/html; charset=utf-8");
    res.write("<html><head></head><body>");
    res.write("<textarea><img src=\"data:"+req.files.displayImage.headers['content-type']+";base64,");
    fs.readFile(req.files.displayImage.path, function (err, data) {
        var base64Image = data.toString('base64'); 
        
        
        res.write(base64Image);
        res.write("\"></img></textarea>");
        res.write("<img src=\"data:"+req.files.displayImage.headers['content-type']+";base64,"+base64Image+"\"></img>");
        res.write("</body></html>");
        delIt(req.files.displayImage.path);
        res.end();
      });
});


app.listen(2345, function(){
        console.log('listening on port 2345')
})
