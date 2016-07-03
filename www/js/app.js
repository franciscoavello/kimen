// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('kimen', ['ionic', 'ngCordova','IonicitudeModule','controladoresKimen'])

myApp.run(function($ionicPlatform, Ionicitude) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

myApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('root', {
    url: "",
    templateUrl: "views/vistaPrincipal.html",
  })
  .state('vistaAPP', {
    url: "/vistaAPP",
    templateUrl: "views/vistaAPP.html"      
  })
  .state('vistaAPP.datosLoc', {
    url: '/datosLoc',
    views: {
      'vistaAPPPrincipal': {
        templateUrl: 'views/datosLoc.html',
        controller: 'MapCtrl'
      }
    }
  })
  .state('nuevoRegistro', {
    url: "/nuevoRegistro",
    templateUrl: "views/nuevoRegistro.html",
  })
  .state('404',   {
  	url: '/404',
    templateUrl: 'views/404.html'
  })
  $urlRouterProvider.otherwise("/404");
});