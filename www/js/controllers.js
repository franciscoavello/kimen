var myApp = angular.module('controladoresKimen', ['ionic', 'ngCordova'])

myApp.controller('CameraCtrl', function($scope, $cordovaCamera, $cordovaGeolocation,$location, $rootScope, $timeout){
	$rootScope.latitud = '';
	$rootScope.longitud = '';
	$scope.takePicture = function(){
		$cordovaCamera.getPicture({})
			.then(function(data){

			}, function(error){

			});
	};	

	$scope.obtenerLocalizacion = function(){
		var posOptions = {timeout: 10000, enableHighAccuracy: true};
		$cordovaGeolocation
		    .getCurrentPosition(posOptions)
		    .then(function (position) {
		      var lat  = position.coords.latitude;
		      var long = position.coords.longitude;
		      $rootScope.latitud = lat;
		      $rootScope.longitud = long;
		      console.log($rootScope.latitud);
		      console.log($rootScope.longitud);
		      $location.path('/vistaAPP/datosLoc');
		    }, function(err) {
		      // error
		    });
	};	
})
