angular.module('app.services', [])
  .factory('hearthstoneDb', function ($http) {
    return {
      get: function () {
        return $http.get('collectible_cards.json').then(function (response) {
          return response.data;
        });
      }
    };
  });