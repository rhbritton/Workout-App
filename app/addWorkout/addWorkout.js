'use strict';

angular.module('myApp.addWorkout', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/addWorkout', {
		templateUrl: 'addWorkout/addWorkout.html',
		controller: 'AddWorkoutCtrl'
	})
}])

.controller('AddWorkoutCtrl', ['$scope', '$location', function($scope, $location) {

	$scope.exercises = []

	$scope.addExercise = function() {
		$scope.exercises.push({
			name: 'Rest', // name of exercise
			type: 'time', // time or reps
			amount: 60, // seconds or rep amount
			weight: 0 // additional weight
		})
	}

	$scope.delExercise = function(index) {
		$scope.exercises.splice(index, 1)
	}

	$scope.submit = function() {
		var workouts = localStorage.getItem('workouts')
		workouts = workouts ? JSON.parse(workouts) : []

		workouts.push({
			name: $scope.name,
			exercises: $scope.exercises
		})

		localStorage.setItem('workouts', JSON.stringify(workouts))

		$location.path('/app/#/home')
	}
}])