'use strict';

angular.module('myApp.perform', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/perform', {
		templateUrl: 'perform/perform.html',
		controller: 'PerformCtrl'
	})
}])

.controller('PerformCtrl', ['$scope', '$location', '$routeParams', '$interval', '$window', function($scope, $location, $routeParams, $interval, $window) {
	var audio = new Audio('/app/assets/sounds/beep.mp3')

	var workouts = localStorage.getItem('workouts')
	  , workouts = workouts ? JSON.parse(workouts) : []
	  , pauseExercise = null
	
	$scope.workoutIndex = parseInt($routeParams.workout || 0)
	$scope.exerciseIndex = parseInt($routeParams.exercise || 0)

	console.log($scope.exerciseIndex)

	$scope.workout = workouts[$scope.workoutIndex] || null
	if(!$scope.workout) return

	$scope.exercise = $scope.workout.exercises[$scope.exerciseIndex]
	$scope.exercise.amount = parseInt($scope.exercise.amount)

	$scope.percentageComplete = ($scope.exerciseIndex/$scope.workout.exercises.length)*100

	if($scope.exerciseIndex == $scope.workout.exercises.length-1)
		$scope.lastExercise = true

	if($scope.exerciseIndex == 0)
		$scope.firstExercise = true

	$scope.time = 0
	$scope.timeText = '00:00'
	$scope.exercising = false

	if($scope.exercise.type == 'time') formatTime($scope.exercise.amount)

	$scope.startExercise = function() {
		audio.play()
		if(!$scope.exercising) {
			pauseExercise = $interval(function() {
				$scope.time++

				if($scope.exercise.type == 'reps')
					formatTime($scope.time)

				if($scope.exercise.type == 'time') {
					if($scope.exercise.amount - $scope.time < 0) {
						$scope.pauseExerciseClick()
						return $window.location.href = '/app/#/perform?workout='+$scope.workoutIndex+'&exercise='+($scope.exerciseIndex+1)
					}

					formatTime($scope.exercise.amount - $scope.time)
				}
			}, 1000)
		}

		$scope.exercising = true
	}

	$scope.pauseExerciseClick = function() {
		audio.play()
		$scope.exercising = false
		
		pauseExercise ? $interval.cancel(pauseExercise) : null
	}

	function formatTime(time) {
		var minutes = Math.floor(time/60)
		  , seconds = time % 60

		if(minutes < 10) minutes = '0' + minutes
		if(seconds < 10) seconds = '0' + seconds

		$scope.timeText = minutes + ':' + seconds
	}

}])