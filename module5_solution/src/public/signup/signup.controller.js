(function () {
  "use strict";

  angular.module('public')
  .controller('SignupController', SignupController);

  SignupController.$inject = ['MenuService'];
  function SignupController(MenuService) {
    var $ctrl = this;
    var service = MenuService;

    $ctrl.submit = function (regForm) {
      var promise = service.getItem($ctrl.user.dish);
      var isValid = regForm.$valid;

      if (isValid) {
        promise.then(function (response) {
          service.user = angular.copy($ctrl.user);
          service.user.dish = angular.copy(response)
          $ctrl.completed = true;
          service.completed = $ctrl.completed;
          $ctrl.user = {};
          regForm.$setPristine();
          regForm.$setUntouched();
        })
        .catch(function (error) {
          isValid = false;
          $ctrl.completed = false;
          service.completed = $ctrl.completed;
        });
      }
    };
  }

})();
