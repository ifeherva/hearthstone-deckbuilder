angular.module('app.controllers', [])
  .controller('HeroesCtrl', function ($scope) {
    $scope.heroes = [{
        className: 'warrior',
        image: '/images/garrosh.png'
      },
      {
        className: 'shaman',
        image: '/images/thrall.png'
      },
      {
        className: 'rogue',
        image: '/images/valeera.png'
      },
      {
        className: 'paladin',
        image: '/images/uther.png'
      },
      {
        className: 'hunter',
        image: '/images/rexxar.png'
      },
      {
        className: 'druid',
        image: '/images/malfurion.png'
      },
      {
        className: 'warlock',
        image: '/images/guldan.png'
      },
      {
        className: 'mage',
        image: '/images/jaina.png'
      },
      {
        className: 'priest',
        image: '/images/anduin.png'
      }
    ];
  })
  .controller('BuilderCtrl', function ($scope, $routeParams, hearthstoneDb, $location) {
    if ($routeParams.className) {
      $scope.className = $routeParams.className;
      hearthstoneDb.get().then(function (db) {
        $scope.cards = db;
        $scope.deck = deckFromString($location.hash(), db);
        update();
      });
    }

    // TODO: this should be a map instead of an array
    $scope.deck = [];
    $scope.count = 0;
    $scope.dustCost = 0;
    $scope.unavailable = {};
    $scope.search = {
      playerClass: $scope.className
    };

    $scope.cardAllowed = function (className) {
      return function (item) {
        return item.cost >= 0 && item.playerClass == className.toUpperCase();
      }
    }

    function addCardToDeck(card) {
      if ((!$scope.arenaDeck && $scope.unavailable[card.dbfId]) || $scope.count == 30) return;
      var deck = $scope.deck;
      for (var i = 0; i < deck.length; i++) {
        if (deck[i].card.id == card.id) {
          deck[i].count += 1;
          update();
          return;
        }
      }
      deck.push({
        card: card,
        count: 1
      });
      update();
    }

    function removeCardFromDeck(card) {
      var deck = $scope.deck;
      for (var i = 0; i < deck.length; i++) {
        if (deck[i].card.id == card.id) {
          deck[i].count -= 1;
          update();
          if (deck[i].count <= 0) {
            deck.splice(i, 1);
          }
          return;
        }
      }
    }

    function deckToString() {
      var strParts = [];
      $scope.deck.forEach(function (entry) {
        var card = entry.card;
        var count = entry.count;
        if (!count) return;
        var strPart = count == 1 ? card.id : card.id + ':' + count;
        strParts.push(strPart);
      });
      var str = strParts.join(',');
      return str;
    }

    function deckFromString(str, cards) {
      var deck = [];
      var strParts = str.split(',');
      strParts.forEach(function (strPart) {
        var index = strPart.indexOf(':');
        var id = parseInt(index >= 0 ? strPart.substr(0, index) : strPart);
        var count = index >= 0 ? parseInt(strPart.substr(index + 1)) : 1;
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].id == id) {
            deck.push({
              card: cards[i],
              count: count
            });
            break;
          }
        }
      });
      return deck;
    }

    function update() {
      updateCount();
      updateAvailability();
      updateManaCurve();
      updateDustCost();
      updateHash();
    }

    function updateAvailability() {
      $scope.unavailable = {};
      $scope.deck.forEach(function (entry) {
        var card = entry.card;
        var count = entry.count;
        $scope.unavailable[card.dbfId] = count >= 2 || (card.rarity == 'LEGENDARY' && count >= 1);
      });
    }

    function updateCount() {
      $scope.count = $scope.deck.reduce(function (a, b) {
        return a + b.count;
      }, 0);
    }

    function updateDustCost() {
      var costs = {
        FREE: 0,
        COMMON: 40,
        RARE: 100,
        EPIC: 400,
        LEGENDARY: 1600
      };

      $scope.dustCost = 0;
      $scope.deck.forEach(function (entry) {
        var card = entry.card;
        var count = entry.count;
        $scope.dustCost += count * costs[card.rarity];
      });
    }

    function updateHash() {
      $location.hash(deckToString());
    }

    $scope.pick = function (card) {
      addCardToDeck(card);
    };

    $scope.remove = function (card) {
      removeCardFromDeck(card);
    };

    function updateManaCurve() {
      $scope.curve = [0, 0, 0, 0, 0, 0, 0, 0];

      $scope.deck.forEach(function (entry) {
        var card = entry.card;
        var count = entry.count;
        $scope.curve[Math.min(7, card.cost)] += count;
      });

      var max = 10;
      for (var i = 0; i < 8; i++) {
        max = Math.max(max, $scope.curve[i]);
      }
      $scope.scale = 100 / max;
    }

  })
  .controller('CardsCtrl', function ($scope) {})
  .controller('DeckCtrl', function ($scope) {});