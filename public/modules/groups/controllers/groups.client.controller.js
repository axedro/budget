'use strict';

// Groups controller
angular.module('groups').controller('GroupsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Groups',
	function($scope, $stateParams, $location, Authentication, Groups) {
		$scope.authentication = Authentication;

		this.groups = Groups.query(function(g) {
				$scope.selected=g.slice();
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		
		$scope.selected = [];

		$scope.toggle = function (item, list) {
        	var idx = list.indexOf(item);
	        if (idx > -1) list.splice(idx, 1);
	        	else list.push(item);
	      	};
      	$scope.exists = function (item, list) {
	        return list.indexOf(item) > -1;
      	};

		// Create new Group
		$scope.create = function() {
			// Create new Group object
			var group = new Groups ({
				name: this.name
			});

			// Redirect after save
			group.$save(function(response) {
				$location.path('groups');

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Group
		$scope.remove = function(group) {
			if ( group ) { 
				group.$remove();

				for (var i in $scope.groups) {
					if ($scope.groups [i] === group) {
						$scope.groups.splice(i, 1);
					}
				}
			} else {
				$scope.group.$remove(function() {
					$location.path('groups');
				});
			}
		};

		// Update existing Group
		$scope.update = function() {
			var group = $scope.group;

			group.$update(function() {
				$location.path('groups');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Groups
		$scope.find = function() {
			$scope.groups = Groups.query();
		};

		// Find existing Group
		$scope.findOne = function() {
			$scope.group = Groups.get({ 
				groupId: $stateParams.groupId
			});
		};
	}
]);