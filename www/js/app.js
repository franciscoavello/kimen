// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('kimen', ['ionic', 'ngCordova', 'ui.router', 'kimen.controllers'])

myApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

  });
})

myApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/404");
  $stateProvider
  .state('root', {
    url: "",
    templateUrl: "views/vistaPrincipal.html",
  })
  .state('vistaMapa', {
    url: "/vistaMapa",
    templateUrl: "views/vistaMapa.html",
  })
  .state('nuevoRegistro', {
    url: "/nuevoRegistro",
    templateUrl: "views/nuevoRegistro.html",
  })
  .state('404',   {
  	url: '/404',
    templateUrl: 'views/404.html'
  })
});


