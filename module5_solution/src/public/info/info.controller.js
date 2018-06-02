(function () {
  "use strict";

  angular.module('public')
  .controller('InfoController', InfoController);

  InfoController.$inject = ['ApiPath', 'MenuService'];
  function InfoController(ApiPath, MenuService) {
    var $ctrl = this;
    var service = MenuService;

    $ctrl.basePath = ApiPath;
    $ctrl.user = angular.copy(service.user);
    $ctrl.completed = service.completed;
  }

})();
