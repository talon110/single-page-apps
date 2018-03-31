(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      restrict: 'E',
      scope: {
        foundItems: '<',
        onRemove: '&',
      },
    };

    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;
    var searchedMenu = MenuSearchService;

    menu.narrowButton = function () {
      var promise = searchedMenu.getMatchedMenuItems(menu.searchTerm);
      console.log("Search term is: " + menu.searchTerm);

      promise.then(function (response) {
        menu.found = response;
        console.log(menu.found);
      }).catch(function (error) {
        console.log("Something went terribly wrong.");
      });
    };

    menu.removeItem = function(index) {
      searchedMenu.removeItem(index);
    };

  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var items = [];

    service.getMatchedMenuItems = function(searchTerm) {
      var response = $http({
                            method: "GET",
                            url: ApiBasePath + "/menu_items.json",
                          }
        ).then(function (result) {
          var i = 0;
          for (i = 0; i < result.data.menu_items.length; i++) {
            if (service.descriptionMatches(searchTerm, result.data.menu_items[i].description)) {
              items.push(result.data.menu_items[i]);
            }
          }
          return items;
        });
      return response;
    };

    service.descriptionMatches = function(searchTerm, description) {
      description = description.toLowerCase();
      searchTerm = searchTerm.toLowerCase();
      if (description.indexOf(searchTerm) !== -1) {
        return true;
      } else {
        return false;
      }
    };

    service.removeItem = function(index) {
      items.splice(index, 1);
    };
  }

})();