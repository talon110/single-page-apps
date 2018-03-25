(function () {
	'use strict';

	angular.module('LunchCheck', [])
		.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope) {

		$scope.showMessage = function () {
			var items = $scope.list;
			console.log(items);

			if (items == undefined || items == "") {
				$scope.message = "Please enter data first";
				$scope.in = false;
			} else {
				$scope.in = true;
				var list = items.split(",");
				if (list.length > 3) {
					$scope.message = "Too much!";
				} else {
					$scope.message = "Enjoy!";
				}
			}

			$scope.list = undefined;
		};
	}

})();