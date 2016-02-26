'use strict';

/**
 * @ngdoc function
 * @name kuraPeopleCounterWebuiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kuraPeopleCounterWebuiApp
 */
angular.module('kuraPeopleCounterWebuiApp')
    .controller('MainCtrl', ['$scope', '$interval',
        function($scope, $interval) {
            $scope.labels = [moment().toDate()];
            $scope.series = ['Absolute In', 'Absolute Out'];

            function randomScalingFactor() {
                return Math.round(Math.random() * 1000 * (Math.random() > 0.5 ? 1 : 1));
            }

            function newDate(days) {
                return moment().add(days, 'd').toDate();
            }

            function newDateString(days) {
                return moment().add(days, 'd').format();
            }


            $scope.data = [
                [], []
            ];

            function getLiveChartData() {
                if ($scope.data[0].length == 50) {
                    $scope.labels = $scope.labels.slice(1);
                    $scope.data[0] = $scope.data[0].slice(1);
                } else {
                    $scope.labels.push(moment().toDate());
                    $scope.data[0].push(randomScalingFactor());
                }
            }

            $interval(function() {
                getLiveChartData();
            }, 1000);



            $scope.options = {
                elements: {
                    line: {
                        fill: false
                    }
                },


      animation: false,
      showScale: false,
      showTooltips: false,
      pointDot: false,
      datasetStrokeWidth: 0.5,

                scales: {
                    xAxes: [{
                        type: "time",
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }, ],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'value'
                        }
                    }]
                }
            }

            $scope.onClick = function(points, evt) {
                console.log(points, evt);
            };

        }
    ]);