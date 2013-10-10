angular.module('shareupApp')
.factory('tokenHandler', function($rootScope, $http, $q) {
  var token = null,
      currentUser;
 
  var tokenHandler = {
    set: function(v) { token = v; },
    get: function() {
      if (!token) {
        $rootScope.$broadcast('event:unauthorized');
      }
      else {
        return token;
      }
    },
    getCurrentUser: function() {
      var d = $q.defer();

      if (currentUser) {
        d.resolve(currentUser);
      } else {
        $http({
          url: '/api/current_user',
          method: 'POST'
        }).then(function(data) {
          d.resolve(data.data);
        });
      }
      return d.promise;
    },
    wrapActions: function(r, actions) {
      var wrappedResource = r;
      for (var i=0; i < actions.length; i++) {
        tokenWrapper( wrappedResource, actions[i] );
      }
      return wrappedResource;
    }
  };
  
  // https://gist.github.com/nblumoe/3052052
  var tokenWrapper = function(resource, action) {
    resource['_' + action]  = resource[action];
    resource[action] = function( data, success, error){
      return resource['_' + action](
        angular.extend({}, data || {}, {access_token: tokenHandler.get()}),
        success,
        error
      );
    };
  };
 
  return tokenHandler;
});