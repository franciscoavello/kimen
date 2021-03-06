var myApp = angular.module('controladoresKimen', ['ionic', 'ngCordova'])

myApp.controller('MapCtrl', function($scope, $location, $cordovaGeolocation,$rootScope,$cordovaDialogs) {

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
				timeout : 10000,
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

myApp.controller('IonicitudeCtrl', function($scope, Ionicitude,$cordovaDialogs){
	$scope.revisarDispositivo = function(){
		Ionicitude.init({
			doDeviceCheck: false
		});
		Ionicitude.checkDevice()
		.then(function(success) {
			$cordovaDialogs.alert('Este dispositivo es soportado', 'Éxito', 'Aceptar')
		    .then(function() {
		      $scope.iniciarIonicitude();
		    });
		})
		.catch(function(error) {
			$cordovaDialogs.alert('Lo sentimos. Este dispositivo no es soportado', 'Función no soportada', 'Atrás')
		    .then(function() {		      
		    });
		});
	};

	$scope.iniciarIonicitude = function(){
		    Ionicitude.launchAR("prueba")
		        .then(function(success) {
		            $cordovaDialogs.alert('Iniciando el entorno de RA', 'Iniciando', 'Aceptar')
				    .then(function() {
				      // callback success
				    });
		        })
		        .catch(function(error) {
		            $cordovaDialogs.alert('No se pudo iniciar el entorno de RA', 'Error', 'Atrás')
				    .then(function() {
				      // callback success
				    });
		        });
	};

});




		