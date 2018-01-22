angular.module('app.services', [])
  .factory('hearthstoneDb', function ($http) {
    return {
      get: function () {
        return $http.get('collectible_cards.json').then(function (response) {
          return response.data;
        });
      }
    };
  })
  .factory('suggestionService', function ($http) {
    return {
      get: function (hero_class) {
        return $http.post('http://127.0.0.1:5000/suggestor/api/v1.0/cardsuggestions', '{"hero_class":"' + hero_class + '","cards":["Dragoncaller Alanna"]}', {
          "method": "POST"
        }).then(function (response) {
          return response.data;
        });
      }
    };
  });