var bball=angular.module('bball',[]);
bball.controller('ctrl',['$scope', '$http', '$timeout', function($scope, $http, $timeout){
	
	$scope.getAll=function(byDate){
		if(byDate){
			$http.get('http://nydus.fr:1665/bydate/'+byDate).success(function(data){
					$scope.players=data
				}).error(function(data){
					$scope.msg="error : "+data
				});
		}
	}
	$http.get('http://nydus.fr:1665/bydates/').success(function(data){
					$scope.alldates=data
				}).error(function(data){
					$scope.msg="error : "+data
				});
	var today=new Date();
	var currentDate=""+today.getFullYear()+((today.getMonth()+1<10)?"0"+(today.getMonth()+1):(today.getMonth()+1))+((today.getDate()<10)?"0"+today.getDate():today.getDate());
	$scope.new={};
	$scope.lastUpdate=today.getTime();
	$scope.players=[]
	$scope.getAll(currentDate);
	$scope.chosenDate=currentDate;
	$scope.addPlayer=function(player){
		$http({
            method: 'POST',
            url: 'http://nydus.fr:1665/'+player.player+'/'+player.date,
            data: player
        }).success(function(data){
			//$scope.players=data;
		}).error();
	};
	
	$scope.loadDate=function(ddd){
		$scope.chosenDate=ddd;
		$scope.getAll(ddd);
	}
	$scope.newPlayer=function(name, date){
	console.log(name, date);
		var tmp={player : name,
				date: date,
				two_taken : 0,
				two_scored : 0,
				three_taken : 0,
				three_scored : 0,
				time_played : 0,
				passes : 0,
				rebounds : 0,
				interceptions : 0,
				fouls : 0}
			$scope.players.push(tmp);
			$scope.addPlayer(tmp);
			$scope.newP.name="";
	}
	$scope.changeDate=function(nd){
		$scope.chosenDate=nd;
		$scope.getAll(nd);
	}
	$scope.updatePlayer=function(player){
		$http({
            method: 'PUT',
            url: 'http://nydus.fr:1665/'+player.player+'/'+player.date,
            data: player
        }).success(function(data){
			//$scope.players=data;
		}).error();
	}
	$scope.updateTimeSheet=function(){
		for(var i=0;i<$scope.players.length;i++){
			$scope.updatePlayer($scope.players[i]);
		}
		$scope.lastUpdate=new Date();
		$timeout(function(){//call it next time
			$scope.updateTimeSheet();
		},30000)
	}
	$timeout(function(){
		$scope.updateTimeSheet();
	},30000)

	/*$scope.$watch('players',function(n,o){
		if(n!=o){
			if(n.length>o.length)//new player added
				{}//$scope.addPlayer(n[n.length-1]);
			else
			{
				for(var i in n)
				{
					if(!upd[n[i].player]){
						console.log(upd, n[i]);
						upd[n[i].player]=!upd[n[i].player];//avoid multiple calls
						console.log(upd,n[i]);
						$scope.updatePlayer(n[i]);
					}
				}
			}
		}
	}, true);*/
	
}]);

bball.directive('stat', function(){
	var twoPoints=function(player, scored){
		if(scored){
			player.two_taken+=1;
			player.two_scored+=1;
		}
		else
		{
			player.two_taken+=1;
		}
	}
	 var threePoints=function(player, scored){
		if(scored){
			player.three_taken+=1;
			player.three_scored+=1;
		}
		else
		{
			player.three_taken+=1;
		}
	}
	var incr=function(player,param){
		player[param]+=1;
	}
	var decr=function(player,param){
		if(player[param]>=1)
			player[param]-=1;
	}
	return {
		templateUrl: "stat.html",
		scope:{pl:"="},
		link:function(scope,elt,attr){
			scope.twoPoints=twoPoints;
			scope.threePoints=threePoints;
			scope.incr=incr;
			scope.decr=decr;
		}
	}
});

bball.filter('dd', function(){
	return function(item){
		if(item.length==8)
			return ""+item[6]+item[7]+"/"+item[4]+item[5]+"/"+item[0]+item[1]+item[2]+item[3];
		else
			return '';
	}
});