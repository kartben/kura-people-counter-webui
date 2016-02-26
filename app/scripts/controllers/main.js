'use strict';

/**
 * @ngdoc function
 * @name kuraPeopleCounterWebuiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kuraPeopleCounterWebuiApp
 */
angular.module('kuraPeopleCounterWebuiApp')
    .controller('MainCtrl', ['$scope', '$interval', 'appSettings',
        function($scope, $interval, appSettings) {

            $scope.labels = [
                moment().toDate()
            ];
            $scope.series = ['Period In', 'Period Out'];

            $scope.data = [
                [],
                []
            ];


            /**
             * Protobuf init
             **/
            var ProtoBuf = dcodeIO.ProtoBuf;
            var Message = ProtoBuf.loadProtoFile("/kurapayload.proto").build("kuradatatypes");



            /**
             * MQTT Initialization
             **/

            var client = new Paho.MQTT.Client("ws://iot.eclipse.org/ws", "gh-" + new Date().getTime());
            client.onConnectionLost = function(responseObject) {
                if (responseObject.errorCode !== 0) {
                    console.log("onConnectionLost:" + responseObject.errorMessage);
                    console.log("Reconnecting... [" + new Date() + "]");
                    client.connect({
                        onSuccess: function() {
                            client.subscribe(appSettings.topic_prefix + "PCN-PUB-V1/washroom/period/#");
                        }
                    });
                }
            };

            client.onMessageArrived = function(message) {
                var topic = message.destinationName;
                var kuraPayload = Message.KuraPayload.decode(message.payloadBytes);

                var timestamp = Date(kuraPayload.timestamp.toNumber());

                for (var i = 0; i < kuraPayload.metric.length; i++) {
                    var metric = kuraPayload.metric[i];
                    if (metric.name === "PeriodIn") {
                        console.log("PeriodIn: " + metric.int_value);

                        $scope.labels.push(timestamp);
                        $scope.data[0].push(metric.int_value);
                        $scope.$apply();

                    } else if (metric.name === "PeriodOut") {
                        console.log("PeriodOut: " + metric.int_value);

                        // $scope.labels[1].push(timestamp);
                        $scope.data[1].push(metric.int_value);
                        $scope.$apply();
                    }
                }

            }

            client.connect({
                onSuccess: function() {
                    client.subscribe(appSettings.topic_prefix + "PCN-PUB-V1/washroom/period/#");
                }
            });



            function randomScalingFactor() {
                return Math.round(Math.random() * 1000 * (Math.random() > 0.5 ? 1 : 1));
            }

            function newDate(days) {
                return moment().add(days, 'd').toDate();
            }

            function newDateString(days) {
                return moment().add(days, 'd').format();
            }


            function getLiveChartData() {
                if ($scope.data[0].length == 50) {
                    $scope.labels = $scope.labels.slice(1);
                    $scope.data[0] = $scope.data[0].slice(1);
                } else {
                    $scope.labels.push(moment().toDate());
                    $scope.data[0].push(randomScalingFactor());
                }
            }

            // $interval(function() {
            //     getLiveChartData();
            // }, 1000);



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