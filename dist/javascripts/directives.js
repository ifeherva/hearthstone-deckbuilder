angular.module('app.directives', [])
  .directive('watchLoad', function () {
    return {
      link: function (scope, element, attr) {
        element.on('load', function (event) {
          element.addClass('loaded');
        });
      },
      restrict: 'A'
    };
  })
  .directive('cardListItem', function () {
    var tooltip = angular.element('<img id="card-tooltip"></img>');

    return {
      link: function (scope, element, attr) {
        element.on('mouseenter', function () {
          tooltip.attr('src', 'https://art.hearthstonejson.com/v1/render/latest/enUS/256x/' + scope.card.id + '.png');
          angular.element(document.body).append(tooltip);

          var rect = element[0].getBoundingClientRect();
          var clientHeight = document.documentElement.clientHeight;
          var topOffset = rect.top + 298 >= clientHeight ? -298 : 0;

          tooltip.css({
            left: rect.left - 210 + 'px',
            top: rect.top + topOffset + 'px'
          });
        });
        element.on('mousemove', function (event) {});
        element.on('mouseleave', function (event) {
          tooltip.remove();
        });
        scope.$on('$destroy', function () {
          tooltip.remove();
        });
      },
      restrict: 'EA',
      scope: {
        card: '=',
        count: '='
      },
      template: '<div class="image" style="background-image: url(https://art.hearthstonejson.com/v1/render/latest/enUS/256x/{{card.id}}.png);">{{count}}</div>' +
        '<div class="content">' +
        '  <div class="mana">{{card.cost}}</div>' +
        '  <div class="name">{{card.name}}</div>' +
        '  <div class="count" ng-show="count > 1">{{count}}</div>' +
        '</div>'
    };
  });