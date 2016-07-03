var myApp = angular.module('controladoresKimen', ['ionic', 'ngCordova'])

myApp.controller('CameraCtrl', function($scope, $cordovaCamera, $cordovaGeolocation,$location, $rootScope, $timeout){

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

myApp.controller('MapCtrl', function($scope, $state, $cordovaGeolocation,$rootScope) {
 	  var options = {timeout: 10000, enableHighAccuracy: true};
 
	  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

	    $rootScope.latitud = position.coords.latitude;
	    $rootScope.longitud = position.coords.longitude;
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
	  }, function(error){
	    console.log("Could not get location");
	  });
});