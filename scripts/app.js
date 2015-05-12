'use strict';

var app = angular
  .module('CDash', [
    'ngAnimate',    
    'ngResource',
    'ngRoute',    
    'firebase',
    'toaster',
    'angularMoment',
    'googlechart'
  ])
  .constant('FURL', 'https://cdash.firebaseio.com/')
  .run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the login page
      if (error === "AUTH_REQUIRED") {
        $location.path("/login");
      }
    });
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/topics.html',
        controller: 'BrowseController',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          },
        }
      })
      .when('/browse', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseController',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          },
        }
      })
      .when('/topics', {
        templateUrl: 'views/topics.html',
        controller: 'BrowseController',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          },
        }
      })
      .when('/trending', {
        templateUrl: 'views/trending.html',
        controller: 'BrowseController',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          }
        }
      })
      .otherwise({
        redirectTo: '/register'
      })
      .when('/browse/:metricId', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseController',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          }
        }
      })
      .otherwise({
        redirectTo: '/register'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthController'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController'
      })
      .when('/collections', {
        templateUrl: 'views/collections.html',
        controller: 'DashboardController',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          }
        }

      })
      .when('/metric_1', {
        templateUrl: 'views/metric_1.html',
        controller: 'BrowseController',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          }
        }

      })
      .when('/metric_2', {
        templateUrl: 'views/metric_2.html',
        controller: 'BrowseController',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          }
        }

      })
      .otherwise({
        redirectTo: '/topics'
      });
  });
