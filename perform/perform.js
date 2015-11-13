'use strict';

angular.module('myApp.perform', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/perform', {
		templateUrl: 'perform/perform.html',
		controller: 'PerformCtrl'
	})
}])

.controller('PerformCtrl', ['$scope', '$location', '$routeParams', '$interval', '$window', function($scope, $location, $routeParams, $interval, $window) {
	var audio = new Audio('/assets/sounds/beep.mp3')
	  , voice = window.speechSynthesis.getVoices()[0]

	var workouts = localStorage.getItem('workouts')
	  , workouts = workouts ? JSON.parse(workouts) : []
	  , pauseExercise = null
	
	$scope.workoutIndex = parseInt($routeParams.workout || 0)
	$scope.exerciseIndex = parseInt($routeParams.exercise || 0)

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

	$scope.startExercise = function(allowSpeak) {
		if(!$scope.exercising) {
			pauseExercise = $interval(function() {
				$scope.time++

				var timeLeft = $scope.exercise.amount - $scope.time

				if($scope.exercise.type == 'reps')
					formatTime($scope.time)

				if($scope.exercise.type == 'time') {
					if(timeLeft <= 0) {
						$scope.pauseExerciseClick(true)
						if($scope.lastExercise) {
							speak('Workout Complete')
							return $window.location.href = '/#/home'
						} else {
							speak($scope.workout.exercises[$scope.exerciseIndex+1].name)
							return $window.location.href = '/#/perform?workout='+$scope.workoutIndex+'&exercise='+($scope.exerciseIndex+1)
						}
					}

					if(timeLeft <= 3)
						speak(timeLeft)

					formatTime(timeLeft)
				}
			}, 1000)
		}

		$scope.exercising = true
	}

	$scope.pauseExerciseClick = function(skipSound) {
		$scope.exercising = false
		
		pauseExercise ? $interval.cancel(pauseExercise) : null
	}

	$scope.pop = function() {
		audio.play()
	}

	function formatTime(time) {
		var minutes = Math.floor(time/60)
		  , seconds = time % 60

		if(minutes < 10) minutes = '0' + minutes
		if(seconds < 10) seconds = '0' + seconds

		$scope.timeText = minutes + ':' + seconds
	}

	function speak(text) {
		var speech = new SpeechSynthesisUtterance(text)
		speech.voice = voice
		$window.speechSynthesis.speak(speech)
	}


	if(!$routeParams.wait)
		$scope.startExercise()

}])