'use strict';

angular.module('shareupApp', ['ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          token: function(tokenHandler) {
            return tokenHandler.get();
          }
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config( function( $httpProvider ) {
    var interceptor = ['$rootScope', '$location', '$q', function($scope, $location, $q) {
      var success = function(resp) { return resp; }, 
          err = function(resp) {
            if (resp.status == 401) {
              var d = $q.defer(); 
              $scope.$broadcast('event:unauthorized'); 
              return d.promise;
            };
            return $q.reject(resp); 
          };
      return function(promise) {
        return promise.then(success, err);
      } 
    }];
    $httpProvider.responseInterceptors.push(interceptor);
  })
  .run(function($rootScope,$http,$location,tokenHandler){ 
    $rootScope.$on('event:unauthorized', function(evt) {
      $location.path('/login');
    });
  });
