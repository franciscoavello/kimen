var myApp = angular.module('controladoresKimen', ['ionic', 'ngCordova'])

myApp.controller('CameraCtrl', function($scope, $cordovaCamera, $cordovaGeolocation,$location, $rootScope, $timeout){


})

myApp.controller('MapCtrl', function($scope, $location, $cordovaGeolocation,$rootScope) {

	$scope.obtenerLocalizacionMapa = function(){
		var options = {timeout: 10000, enableHighAccuracy: true};
	    $cordovaGeolocation.getCurrentPosition(options).then(function(position){	    	
		    $rootScope.latitud = position.coords.latitude;
		    $rootScope.longitud = position.coords.longitude;
		    $rootScope.altitud = position.coords.altitude;
		    console.log($rootScope.latitud);
		    console.log($rootScope.longitud);
		    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		 
		    var mapOptions = {
			    center: latLng,
		    	zoom: 15,
			    mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			 
			$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
			 	
			google.maps.event.addListenerOnce($scope.map, 'idle', function(){	 
				var marker = new google.maps.Marker({
					map: $scope.map,
					animation: google.maps.Animation.DROP,
					position: latLng
				});      
			});
			$scope.activarWatcher();

		}, function(error){
			console.log("No se pudo obtener la localización");
		});
	};	


    // Watch para obtener la posición si es que se mueve el usuario
	$scope.activarWatcher = function(){
			var watchOptions = {
				maximumAge: 3600000,
				timeout : 100000,
				enableHighAccuracy: false
			};
			var watch = $cordovaGeolocation.watchPosition(watchOptions);
			watch.then(null, function(err){
				console.log("Error al actualizar la posición");
			}, function(position) {
				console.log(position);
				$rootScope.latitud = position.coords.latitude;
				$rootScope.longitud = position.coords.longitude;
				$rootScope.altitud = position.coords.altitude;
			});


	};



});