var d3leg=angular.module('d3leg',[]);
var allFiles=["1H_mighty_weapon","1H_spear","2H_axe","2H_flail","2H_mace","2H_mighty_weapon","2H_sword","axe","belt","boots","bow","bracer","ceremonial_knife","chest","cloak","crossbow","crusader_shield","daggers","daibo","enchantress_focus","fist_weapon","flail","glove","hand_crossbow","helm","mace","mighty_belt","mojo","necklace","orb","pant","pauldron","polearm","potion","quiver","ring","scoundrel_token","shield","spirit_stone","staff","sword","templar_relic","voodoo_mask","wand","wizard_hat","allItems","immortal_kings_call","vyrs_amazing_arcana","raiment_of_the_jade_harvester","embodiment_of_the_marauder","armor_of_akkhan","the_legacy_of_raekor","helltooth_harness","might_of_the_earth","raiment_of_a_thousand_storms","istvans_paired_blades","the_shadows_mantle","firebirds_finery","monkey_kings_garb","thorns_of_the_invoker","bastions_of_will"];
d3leg.controller('d3l', ['$scope', 'GetJSON', function($scope, GetJSON){	$scope.types=[	{"file":"1H_mighty_weapon","name":"1H mighty weapon", "name_fr":"Arme puissante 1M"},
					{"file":"1H_spear","name":"1H spear", "name_fr":"Lance 1M"},
					{"file":"2H_axe","name":"2H axe", "name_fr":"Hache 2M"},
					{"file":"2H_flail","name":"2H flail", "name_fr":"Fl\351au 2M"},
					{"file":"2H_mace","name":"2H mace", "name_fr":"Masse 2M"},
					{"file":"2H_mighty_weapon","name":"2H mighty weapon", "name_fr":"Arme puissante 2M"},
					{"file":"2H_sword","name":"2H sword", "name_fr":"Ep\351e 2M"},
					{"file":"axe","name":"Axe", "name_fr":"Hache"},
					{"file":"belt","name":"Belt", "name_fr":"Ceinture"},
					{"file":"boots","name":"Boots", "name_fr":"Bottes"},
					{"file":"bow","name":"Bow", "name_fr":"Arc"},
					{"file":"bracer","name":"Bracer", "name_fr":"Brassard"},
					{"file":"ceremonial_knife","name":"Ceremonial knife", "name_fr":"Dague c\351r\351monielle"},
					{"file":"chest","name":"Chest", "name_fr":"Cuirasse"},
					{"file":"cloak","name":"Cloak", "name_fr":"Cape"},
					{"file":"crossbow","name":"Crossbow", "name_fr":"Arbalette"},
					{"file":"crusader_shield","name":"Crusader shield", "name_fr":"Bouclier de crois\351"},
					{"file":"daggers","name":"Daggers", "name_fr":"Dague"},
					{"file":"daibo","name":"Daibo", "name_fr":"Daibo"},
					{"file":"enchantress_focus","name":"Enchantress focus", "name_fr":"Catalyseur"},
					{"file":"fist_weapon","name":"Fist weapon", "name_fr":"Arme de pugilat"},
					{"file":"flail","name":"Flail", "name_fr":"Fl\351au"},
					{"file":"glove","name":"Glove", "name_fr":"Gant"},
					{"file":"hand_crossbow","name":"Hand crossbow", "name_fr":"Arbalette de poing"},
					{"file":"helm","name":"Helm", "name_fr":"Casque"},
					{"file":"mace","name":"Mace", "name_fr":"Masse"},
					{"file":"mighty_belt","name":"Mighty belt", "name_fr":"Ceinture puissante"},
					{"file":"mojo","name":"Mojo", "name_fr":"Mojo"},
					{"file":"necklace","name":"Necklace", "name_fr":"Amulette"},
					{"file":"orb","name":"Orb", "name_fr":"Source"},
					{"file":"pant","name":"Pant", "name_fr":"Jambi\350res"},
					{"file":"pauldron","name":"Pauldron", "name_fr":"Epaulettes"},
					{"file":"polearm","name":"Polearm", "name_fr":"Arme d'hast"},
					{"file":"potion","name":"Potion", "name_fr":"Potion"},
					{"file":"quiver","name":"Quiver", "name_fr":"Carquois"},
					{"file":"ring","name":"Ring", "name_fr":"Anneau"},
					{"file":"scoundrel_token","name":"Scoundrel token", "name_fr":"Jeton de brigand"},
					{"file":"shield","name":"Shield", "name_fr":"Bouclier"},
					{"file":"spirit_stone","name":"Spirit stone", "name_fr":"Pierre d'esprit"},
					{"file":"staff","name":"Staff", "name_fr":"B\342ton"},
					{"file":"sword","name":"Sword", "name_fr":"Ep\351e"},
					{"file":"templar_relic","name":"Templar relic", "name_fr":"Relique de templier"},
					{"file":"voodoo_mask","name":"Voodoo mask", "name_fr":"Masque vaudou"},
					{"file":"wand","name":"Wand", "name_fr":"Baguette"},
					{"file":"wizard_hat","name":"Wizard hat", "name_fr":"Chapeau de sorcier"},
					{"file":"allItems","name":"All Items", "name_fr":"Liste compl\350te"}];
	$scope.sets=[{"file":"immortal_kings_call","name":"Immortal King's Call", "name_fr":"L'Appel du Roi Immortel","class":"barb"},
	{"file":"vyrs_amazing_arcana","name":"Vyr's Amazing Arcana", "name_fr":"L'Arcane Incroyable de Vyr","class":"wiz"},
	{"file":"raiment_of_the_jade_harvester","name":"Raiment of the Jade Harvester", "name_fr":"Tenue du Moissonneur de Jade","class":"wd"},
	{"file":"embodiment_of_the_marauder","name":"Embodiment of the Marauder", "name_fr":"L'Incarnation du Maraudeur","class":"dh"},
	{"file":"armor_of_akkhan","name":"Armor of Akkhan", "name_fr":"L'Armure d'Akkhan","class":"crus"},
	{"file":"the_legacy_of_raekor","name":"The Legacy of Raekor", "name_fr":"L'h\351ritage de Raekor","class":"barb"},
	{"file":"helltooth_harness","name":"Helltooth Harness", "name_fr":"Le Harnais de Crocs de l'Enfer","class":"wd"},
	{"file":"might_of_the_earth","name":"Might of the Earth", "name_fr":"La puissance de la terre","class":"barb"},
	{"file":"raiment_of_a_thousand_storms","name": "Raiment of a Thousand Storms","name_fr": "La Tenue des mille temp\352tes","class":"monk"},
	{"file":"istvans_paired_blades","name": "Istvan's Paired Blades","name_fr": "Lames appari\351es d'Istvan","class":""},
	{"file":"the_shadows_mantle","name": "The Shadow's Mantle","name_fr": "Le Mantelet de l'ombre","class":"dh"},
	{"file":"firebirds_finery","name": "Firebird's Finery","name_fr": "Les Atours de l'oiseau de feu","class":"wiz"},
	{"file":"monkey_kings_garb","name": "Monkey King's Garb","name_fr": "Les Atours du roi-singe","class":"monk"},
	{"file":"thorns_of_the_invoker","name": "Thorns of the Invoker","name_fr": "Les Epines de l'invocateur","class":""},
	{"file":"bastions_of_will","name": "Bastions of Will","name_fr": "Redoutes de la volont\351","class":""}];	$scope.getItemUrl=function(name){		var ur=($scope.lang=="fr")?"http://eu.battle.net/d3/fr/item/":"http://us.battle.net/d3/en/item/";		var space=new RegExp(" ","g");		var apo=new RegExp("'","g");
		var star=new RegExp("[*][ ]+","g");
		var pv=new RegExp(";","g");
		var fixer={
			"burst-of-wrath": "burst-of-wrath-322lv2",
			"akanesh-the-herald-of-righteousness": "akanesh-the-herald-of-righteousness-2n8tPc",
			"soulsmasher": "soulsmasher-6EmZ3",
			"insatiable-belt": "insatiable-belt-1Yuo9W",
			"boots-of-disregard": "boots-of-disregard-29WPmn",
			"illusory-boots": "illusory-boots-29WYI0",
			"sanguinary-vambraces": "sanguinary-vambraces-1385JU",
			"cloak-of-deception": "cloak-of-deception-hEilc",
			"salvation": "salvation-TxMPT",
			"envious-blade": "envious-blade-3FoG39",
			"gloves-of-worship": "gloves-of-worship-FA37P",
			"helltrapper": "helltrapper-3tfdaj",
			"prides-fall": "prides-fall-pgClp",
			"mask-of-jeram": "mask-of-jeram-3OrCkW",
			"mask-of-jeram-(set)": "mask-of-jeram-2vRegl",
			"mad-monarchs-scepter": "mad-monarchs-scepter-2F34bH",
			"sorrowful-countenance": "sorrowful-countenance-3GeUmy",
			"golden-gorget-of-leoric": "golden-gorget-of-leoric-1I0CCL",
			"overwhelming-desire": "overwhelming-desire-1I0LYo",
			"deaths-bargain": "deaths-bargain-3STVps",
			"pauldrons-of-the-skeleton-king": "pauldrons-of-the-skeleton-king-2AGH0r3",
			"ring-of-royal-grandeur": "ring-of-royal-grandeur-3qRFop",
			"avarice-band": "avarice-band-3qROK2",
			"pandemonium-loop": "pandemonium-loop-3qRY5F",
			"covens-criterion": "covens-criterion-dzvKS"
		}		name=name.replace(star,"").replace(space,'-').replace(apo,"").replace(pv,"").toLowerCase();
		if(fixer[name])
			return ur+fixer[name];		return ur+name;	}
	$scope.lang="fr";	$scope.search=function(t, title){
		$scope.title=title;		GetJSON.get(t).success(function(data){			$scope.items=data		}).error(function(data){			$scope.items=[];			$scope.error=true;		});	}
	$scope.exps=[];
	$scope.exports=function(it){
		$scope.exps.push(it);
	}
	$scope.getClass=function(value){
		if(value){
			v=value.split('.')[0];
			if(parseInt(v)>=50)
				return "very_high"
			if(parseInt(v)>=25)
				return "over_25"
			if(parseInt(v)>=12)
				return "over_12"
			if(parseInt(v)>=4)
				return "over_4"
			return "";
		}
		return "";
	}	}]);d3leg.service('GetJSON', ['$http',function($http){	return {		get : function(i){			if(allFiles.indexOf(i) != -1){//known file				return $http.get(i+'.json')			}		}		}}])