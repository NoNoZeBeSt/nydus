var ndm=angular.module('ndm',[]);

ndm.service('TalkToMyNode', ['$http', function($http){
	return {
		search : function(na){
			return $http.get('/search/'+na)
		},
		searchWithCat : function(na,cat){
			return $http.get('/search/'+na+'/'+cat)
		},
		categories : function(){
			return $http.get('/categories');
		},
		download : function(tid){
			return $http.get('/download/'+tid);
		},
		getTop : function(type){
			return $http.get('/top/'+type);
		}
	}
}]);
ndm.filter('toSize',function(){
	var unitz=['o','ko','Mo','Go','To'];
	return function(nb){
		var cpt=0;
		var ret=nb;
		while(ret>1024){
			ret=ret/1024;
			cpt+=1;
		}
		return ""+Math.floor(ret)+" "+unitz[cpt]
	}

});
ndm.controller('searchHandler', ['$scope','TalkToMyNode',function($scope, TalkToMyNode){
	$scope.downloaded=[];
	$scope.result={};
	TalkToMyNode.categories().success(function(data){
		console.log(data);
		$scope.categories=data;
	}).error(function(data){
		console.log("err",data);
		$scope.categories={};
	});
	$scope.searchIt=function(d){
		if(typeof d.name != undefined){
			if(typeof d.cat != undefined){
					//TalkToMyNode.searchWithCat(d.name, d.cat).success(function(data){//pb with cat id
					TalkToMyNode.search(d.name).success(function(data){
					$scope.result=data;
					//console.log(data);
				}).error(function(data){
					$scope.result="ERROR !!!!!";
				});
			}
			else{
				TalkToMyNode.search(d.name).success(function(data){
					$scope.result=data;
					console.log(data);
				}).error(function(data){
					$scope.result="ERROR !!!!!";
				});
			}
		}
	}
	$scope.downloadIt=function(d){
		if(typeof d != undefined){
			TalkToMyNode.download(d.id).success(function(data){
				$scope.downloaded.push(d);
			}).error(function(data){
				$scope.msg="error with "+d.id;
			});
		}
	}
	$scope.getTop=function(type){
		if(typeof type != undefined){
			TalkToMyNode.getTop(type).success(function(data){
				$scope.result.torrents=data;
			}).error(function(data){
				$scope.result="ERROR !!!!!";
			});
		}
		else{
			TalkToMyNode.getTop("100").success(function(data){
				$scope.result.torrents=data;
			}).error(function(data){
				$scope.result="ERROR !!!!!";
			});
		}
	}

}]);


ndm.directive('enterListener', function(){
	return{
		scope:false,
		link:function(scope, element, attrs){
			element.bind('keydown', function(e){
				if(e.keyCode == 13){
					scope.searchIt(scope.search);
				}
			})
		}
	};
});