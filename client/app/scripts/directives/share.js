angular.module('shareupApp')
.directive('share', function($http, $timeout, ShareService, tokenHandler) {
  return {
    restrict: 'A',
    require: 'ngModel',
    templateUrl: 'views/share.html',
    scope: {
      ngModel: '=',
      onShare: '&'
    },
    link: function(scope, attrs, ele) {
      scope.newShare = {recipient: ""};
      scope.showPending = false;
      scope.showConfirmation = false;
      scope.share = function() {
        scope.newShare = {recipient: ""};
        var share = new ShareService({
          url: scope.ngModel.url,
          from_user: tokenHandler.getCurrentUser().id,
          to_user: scope.newShare.recipient
        });
        scope.showPending = true;
        share.$save(function(s) {
          scope.showPending = !(scope.showConfirmation = true);
          $timeout(scope.hideConfirmation, 2000);
        });
      }
      scope.hideConfirmation = function() {
        scope.showConfirmation = false;
      }
    }
  }
});
