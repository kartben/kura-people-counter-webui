'use strict';

/**
 * @ngdoc overview
 * @name kuraPeopleCounterWebuiApp
 * @description
 * # kuraPeopleCounterWebuiApp
 *
 * Main module of the application.
 */
angular
  .module('kuraPeopleCounterWebuiApp', [
    'kuraPeopleCounterWebuiApp.services',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'chart.js'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
