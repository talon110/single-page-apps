(function () {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {
		var toBuy = this;

		toBuy.items = ShoppingListCheckOffService.getToBuyItems();

		toBuy.buyItem = function (itemIndex) {
			var item = ShoppingListCheckOffService.getItem(itemIndex);

			ShoppingListCheckOffService.removeToBuyItem(itemIndex);
			ShoppingListCheckOffService.getToBuyItems();

			ShoppingListCheckOffService.addBoughtItem(item);
			ShoppingListCheckOffService.getBoughtItems();
		}
	}

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService) {
		var alreadyBought = this;

		alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
	}

	function ShoppingListCheckOffService() {
		var service = this;
		var toBuyArray = [ { name: "cookies", quantity: 10 }, { name: "chips", quantity: 5 } ];
		var alreadyBoughtArray = [];

		service.getItem = function(itemIndex) {
			return toBuyArray[itemIndex];
		}

		service.removeToBuyItem = function(itemIndex) {
    		toBuyArray.splice(itemIndex, 1);
		};

		service.addBoughtItem = function(item) {
			alreadyBoughtArray.push(item);
		};

		service.getBoughtItems = function() {
			return alreadyBoughtArray;
		};

		service.getToBuyItems = function () {
			return toBuyArray;
		}
	}

})();