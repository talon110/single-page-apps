(function () {
	'use strict';

	angular.module('checkLunch', [])
	.controller('checkLunchController', checkLunchController);

	checkLunchController.$inject = ['$scope'];
	function checkLunchController($scope) {

		$scope.showMessage = function () {
			var items = $scope.list;
			console.log(items);

			if (items == undefined || items == "") {
				$scope.message = "Please enter data first";
			} else {
				var list = items.split(",")
				if (list.length > 3) {
					$scope.message = "Too much!";
				} else {
					$scope.message = "Enjoy!";
				};
			};

			$scope.list = undefined
		};
	}
})();