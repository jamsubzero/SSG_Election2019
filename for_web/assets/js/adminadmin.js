angular.module('admina', [])
    .controller('myCtrl', function($scope, $http, $window) {
        $scope.url = "http://192.168.1.213:8080"

        $scope.password = "b@ss6w@p0";

        $http.get($scope.url + '/config/getstat').
        then(function(response) {
            $scope.stat = response.data;
            //alert($scope.stat.votingStatus);
            if ($scope.stat.votingStatus == 1) {
                $scope.votingStat = true;
                $scope.votingStatusSet = 0;
                $scope.VotingModalMessage = "Close Voting?"
            } else {
                $scope.votingStat = false;
                $scope.votingStatusSet = 1;
                $scope.VotingModalMessage = "Open Voting?"
            }

        });

        $scope.addCandidateNotify = false;
        $scope.errorCandidateNotify = false;
        $scope.deleteCandidateNotify = false;
        $scope.cannotdeleteCandidateNotify = false;
        $scope.reZeroNotify = false;

        if (sessionStorage.getItem('notify') == 1) {
            $scope.addCandidateNotify = true;
            sessionStorage.removeItem('notify');
        } else if (sessionStorage.getItem('notify') == 2) {
            $scope.errorCandidateNotify = true;
            sessionStorage.removeItem('notify');
        } else if (sessionStorage.getItem('notify') == 3) {
            $scope.deleteCandidateNotify = true;
            sessionStorage.removeItem('notify');
        } else if (sessionStorage.getItem('notify') == 4) {
            $scope.cannotdeleteCandidateNotify = true;
            sessionStorage.removeItem('notify');
        } else if (sessionStorage.getItem('notify') == 5) {
            $scope.reZeroNotify = true;
            sessionStorage.removeItem('notify');
        }

        $scope.loadFirst = function() {
            $http.get($scope.url + '/ssgapi/getresult/all').
            then(function(response) {
                $scope.candidates = response.data;
            });
        }

        $scope.loadFirst();

        $scope.getRowID = function(c) {
            $scope.deleteModalMessage = "Remove " + c.name + " ?";
            var id = c.id;

            $scope.confirmDelete = function() {

                if ($scope.deletepassword == $scope.password) {

                    $http.get($scope.url + '/ssgapi/delete/' + id).
                    then(function(response1) {
                        if (response1.status == 200) {
                            sessionStorage.setItem('notify', 3);
                            $window.location.href = "../admin";
                        } else {
                            sessionStorage.setItem('notify', 4);
                            $window.location.href = "../admin";
                            //alert("Error");
                        }
                    });

                }

            }
        }

        $scope.setVoting = function() {

            if ($scope.votingpassword == $scope.password) {
                $http.get($scope.url + '/config/votestat/' + $scope.votingStatusSet).
                then(function(response1) {
                    if (response1.status == 200) {
                        $window.location.href = "../admin";
                    } else {
                        $window.location.href = "../admin";
                        //alert("Error");
                    }
                });
            }
        }

        $scope.reZero = function() {

            if ($scope.rezeropassword == $scope.password) {
                $http.get($scope.url + '/config/rezero').
                then(function(response2) {
                    if (response2.status == 200) {
                        sessionStorage.setItem('notify', 5);
                        $window.location.href = "../admin";
                    } else {
                        $window.location.href = "../admin";
                        //alert("Error");
                    }
                });
            }
        }

        $scope.insertCandidate = function() {

            var cname = $scope.candidatename;
            var cpos = $scope.candidateposition;

            $http({
                method: 'POST',
                url: $scope.url + '/ssgapi/insertcanditate',
                data: {
                    "position": cpos,
                    "name": cname
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response2) {
                if (response2.status == 200) {
                    sessionStorage.setItem('notify', 1);
                    $window.location.href = "../admin";
                } else {
                    sessionStorage.setItem('notify', 2);
                    $window.location.href = "../admin";
                    //alert("Error");
                }

            });

        }
    });