var express = require('express')
var app=express()
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var gameSchema=mongoose.Schema({
    player : String,
	date : String,
	two_taken : Number,
	two_scored : Number,
	three_taken : Number,
	three_scored : Number,
	time_played : Number,
	passes : Number,
	rebounds : Number,
	interceptions : Number,
	fouls : Number
});
var BskGames=mongoose.model('BskGames', gameSchema);
var ObjectId=mongoose.Schema.ObjectId;
var returnAll=function(response){
	BskGames.find(function(err, data){
			response.header("Content-Type", "application/json");
			response.send(data);
		});
}
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

app.get('/', function(req, res){
                res.header("Content-Type", "application/json; charset=utf-8");
				/*var nn=new BskGames({player:"jon",	date : "20140122",
									two_taken : 12,
									two_scored : 5,
									three_taken : 7,
									three_scored : 2,
									time_played : 24,
									passes : 6,
									rebounds : 2,
									interceptions : 4,
									fouls : 1
									});
				nn.save();*/
				
                //res.send('hello');
				returnAll(res);

})
app.get('/bydates/', function(req, res){//return all dates
		res.header("Content-Type", "application/json; charset=utf-8");
		BskGames.find(function (err, docs) {
		var ret=[];
		for( var i in docs){
			if(ret.indexOf(docs[i].date)==-1)
				ret.push(docs[i].date);
		}
			res.send(ret);
		});
})
/*app.get('/byplayers/', function(req, res){//return all player
		res.header("Content-Type", "application/json; charset=utf-8");
		BskGames.find({},['*'], {'group':'player'},function (err, docs) {
			res.send(docs);
		});
})*/
app.get('/:player', function(req, res){
		res.header("Content-Type", "application/json; charset=utf-8");
		BskGames.find({ player: req.params.player}, function (err, docs) {
			res.send(docs);
		});
		//res.send('hello'+req.params.date);
})
app.get('/bydate/:date', function(req, res){//date format should be 20140113
		res.header("Content-Type", "application/json; charset=utf-8");
		BskGames.find({ date: req.params.date}, function (err, docs) {
			res.send(docs);
		});
})

app.get('/:player/:date', function(req, res){
		res.header("Content-Type", "application/json; charset=utf-8");
		BskGames.findOne({ date: req.params.date, player: req.params.player}, function (err, docs) {
			res.send(docs);
		});
})
app.post('/:player/:date', function(req, res){//sets value
	var nn=new BskGames({player : req.params.player,
	date: req.params.date,
	two_taken : 0,
	two_scored : 0,
	three_taken : 0,
	three_scored : 0,
	time_played : 0,
	passes : 0,
	rebounds : 0,
	interceptions : 0,
	fouls : 0});
	nn.save(function(err,doc,nb){
		returnAll(res);
	});
	
});
app.put('/:player/:date', function(req, res){//sets value
	console.log(req.body);
	BskGames.findOne({ player: req.params.player, date: req.params.date},function (err, docs) {
				docs.two_taken = req.body.two_taken,
				docs.two_scored = req.body.two_scored,
				docs.three_taken = req.body.three_taken,
				docs.three_scored = req.body.three_scored,
				docs.time_played = req.body.time_played,
				docs.passes = req.body.passes,
				docs.rebounds = req.body.rebounds,
				docs.interceptions = req.body.interceptions,
				docs.fouls = req.body.fouls
				docs.save(function(err,doc,nb){
					returnAll(res);
				});
	});
});
app.delete('/:player/:date', function(req, res){
	BskGames.findOneAndRemove({ date: req.params.date, player: req.params.player},function (err, docs) {
		returnAll(res);
	});
});
app.delete('/byid/:id', function(req, res){
	BskGames.findOneAndRemove({"_id":ObjectId(req.params.id)},function (err, docs) {
		returnAll(res);
	});
});
app.listen(1665, function(){
        console.log('listening on port 1665')
});
