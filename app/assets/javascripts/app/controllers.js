angular.module('myApp.controllers', [])
.controller('HomeController', function($scope, session, SessionService, ArticleService, Share) {
  $scope.articles = ArticleService.getLatestFeed();
  $scope.user = session.user;
  $scope.newShare = {
    recipient: ''
  };
  $scope.share = function(recipient, article) {
    var share = new Share({
      url: article.link,
      from_user: $scope.user.id,
      user: recipient
    });
    share.$save();
    $scope.newShare.recipient = '';
  }
});