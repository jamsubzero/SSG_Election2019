angular.module('admina', [])
    .controller('myCtrl', function($scope, $http, ) {
        $scope.url = "http://192.168.1.173:8080"

        $scope.loadFirst = function() {
            $http.get($scope.url + '/ssgapi/getresult/all').
            then(function(response) {
                $scope.candidates = response.data;
            });
        }

        $scope.loadFirst();

        $scope.getRowID = function(c) {
            $scope.deleteModalMessage = "Remove " + c.name + " ?";
        }

        $scope.insertCandidate = function() {



            $http({
                method: 'POST',
                url: $scope.url + '/vote/voterequest',
                data: {
                    "position": "sen",
                    "name": "Pedro Kalawakan"
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response2) {
                $scope.candidates = response2.data;
            });

        }
    });