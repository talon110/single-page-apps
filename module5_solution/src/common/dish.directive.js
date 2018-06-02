(function() {
  "use strict";

  angular.module('common')
  .directive('dish', DishDirective);

  DishDirective.$inject = ['$q', 'MenuService'];
  function DishDirective($q, MenuService) {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {

        console.log(scope, elm, attrs, ctrl);
        ctrl.$asyncValidators.dish = function(modelValue, viewValue) {

          if (ctrl.$isEmpty(modelValue)) {
            // consider empty model valid
            return $q.resolve();
          }

          var promise = MenuService.getItem(modelValue);

          promise.then(function (response) {
            console.log('Found value');
          })
          .catch(function (response) {
            console.log('Didn\'t find value');
          });

          return promise;
        };
      }
    };
  }

})();