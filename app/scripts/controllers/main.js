'use strict';

/**
 * @ngdoc function
 * @name kuraPeopleCounterWebuiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kuraPeopleCounterWebuiApp
 */
angular.module('kuraPeopleCounterWebuiApp')
    .controller('MainCtrl', ['$scope',
        function($scope) {
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

		    $scope.type = 'Scatter';
            $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
            $scope.series = ['Series A', 'Series B'];
            $scope.data = [
    {
      label: 'My First dataset',
      strokeColor: '#F16220',
      pointColor: '#F16220',
      pointStrokeColor: '#fff',
      data: [
        { x: 19, y: 65 }, 
        { x: 27, y: 59 }, 
        { x: 28, y: 69 }, 
        { x: 40, y: 81 },
        { x: 48, y: 56 }
      ]
    },
    {
      label: 'My Second dataset',
      strokeColor: '#007ACC',
      pointColor: '#007ACC',
      pointStrokeColor: '#fff',
      data: [
        { x: 19, y: 75, r: 4 }, 
        { x: 27, y: 69, r: 7 }, 
        { x: 28, y: 70, r: 5 }, 
        { x: 40, y: 31, r: 3 },
        { x: 48, y: 76, r: 6 },
        { x: 52, y: 23, r: 3 }, 
        { x: 24, y: 32, r: 4 }
      ]
    }
  ]
            $scope.onClick = function(points, evt) {
                console.log(points, evt);
            };

        }
    ]);