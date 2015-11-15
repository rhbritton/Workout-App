'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'HomeCtrl'
	})
}])

.controller('HomeCtrl', ['$scope', function($scope) {
	var pop = new Audio('/assets/sounds/beep.mp3')
	  , workouts = localStorage.getItem('workouts')
	  
	$scope.workouts = workouts ? JSON.parse(workouts) : []

	$scope.delWorkout = function(index) {
		var deleteNow = confirm('Are you sure you want to delete this workout?')

		if(deleteNow) {
			$scope.workouts.splice(index, 1)

			localStorage.setItem('workouts', JSON.stringify($scope.workouts))
		}
	}

	$scope.pop = function() {
		pop.play()
	}

}])