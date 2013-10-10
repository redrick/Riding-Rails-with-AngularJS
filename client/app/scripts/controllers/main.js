angular.module('shareupApp')
  .controller('MainCtrl', function ($scope, $http, ArticleService) {
    $scope.currentUser = {};
    $scope.articles = ArticleService.getLatestFeed();
  });
