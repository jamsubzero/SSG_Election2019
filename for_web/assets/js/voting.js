var app = angular.module('voting', []);
app.controller('myCtrl', function($scope, $http, $window) {

    $scope.votingButtonText = "Cast Ballot";

    $scope.id = sessionStorage.getItem('id');
    $scope.otp = sessionStorage.getItem('otp');
    $scope.name = sessionStorage.getItem('name');
    $scope.url = "http://192.168.1.173:8080"

    if (sessionStorage.getItem('name') == null) {
        sessionStorage.setItem('error', 2);
        $window.location.href = "../vote";
    } {
        sessionStorage.removeItem('error');
    }
    //get candidates
    $http.get($scope.url + '/ssgapi/get/pres').
    then(function(response) {
        $scope.pres = response.data;
    });
    $http.get($scope.url + '/ssgapi/get/vp').
    then(function(response) {
        $scope.vpres = response.data;
    });
    $http.get($scope.url + '/ssgapi/get/sen').
    then(function(response) {
        $scope.sen = response.data;
    });

    $scope.course = sessionStorage.getItem('course');

    if ($scope.course.includes('BSBA')) {
        $scope.courser = "Business Administration";
        $http.get($scope.url + '/ssgapi/get/barep').
        then(function(response) {
            $scope.rep = response.data;
        });
    } else if ($scope.course.includes('BSCRIM')) {
        $scope.courser = "Criminology";
        $http.get($scope.url + '/ssgapi/get/crrep').
        then(function(response) {
            $scope.rep = response.data;
        });
    } else if ($scope.course.includes('BSFI')) {
        $scope.courser = "Fisheries";
        $http.get($scope.url + '/ssgapi/get/firep').
        then(function(response) {
            $scope.rep = response.data;
        });
    } else if ($scope.course.includes('BSIND') || $scope.course.includes('BSIT')) {
        $scope.courser = "Information Technology";
        $http.get($scope.url + '/ssgapi/get/itrep').
        then(function(response) {
            $scope.rep = response.data;
        });
    } else if ($scope.course.includes('BEED') || $scope.course.includes('BSED') || $scope.course.includes('BTLED')) {
        $scope.courser = "Education";
        $http.get($scope.url + '/ssgapi/get/edrep').
        then(function(response) {
            $scope.rep = response.data;
        });
    }

    //limitations
    $scope.checkedNumberP = 0;
    $scope.limitNumberP = 1;
    $scope.checkP = function(p) {
        if (p.checked) {
            $scope.checkedNumberP--;
        } else {
            $scope.checkedNumberP++;
        }
    }

    $scope.checkedNumberVP = 0;
    $scope.limitNumberVP = 1;
    $scope.checkVP = function(vp) {
        if (vp.checked) {
            $scope.checkedNumberVP--;
        } else {
            $scope.checkedNumberVP++;
        }
    }

    $scope.checkedNumberSEN = 0;
    $scope.limitNumberSEN = 12;
    $scope.checkSEN = function(s) {
        if (s.checked) {
            $scope.checkedNumberSEN--;
        } else {
            $scope.checkedNumberSEN++;
        }
    }

    $scope.checkedNumberREP = 0;
    $scope.limitNumberREP = 2;
    $scope.checkREP = function(r) {
        if (r.checked) {
            $scope.checkedNumberREP--;
        } else {
            $scope.checkedNumberREP++;
        }
    }

    //vote
    $scope.savePres = function() {
        $scope.presidentSel = -1;
        angular.forEach($scope.pres, function(p) {
            if (p.checked) {
                $scope.presidentSel = p.id;
            }
        });
    }
    $scope.saveVPres = function() {
        $scope.VicePresidentSel = -1;
        angular.forEach($scope.vpres, function(vp) {
            if (vp.checked) {
                $scope.VicePresidentSel = vp.id;
            }
        });
    }
    $scope.saveSen = function() {
        $scope.senatorArray = [];
        angular.forEach($scope.sen, function(s) {
            if (s.checked) {
                $scope.senatorArray.push(s.id);
            }
        });
    }
    $scope.saveRep = function() {
        $scope.RepresentativeArray = [];
        angular.forEach($scope.rep, function(r) {
            if (r.checked) {
                $scope.RepresentativeArray.push(r.id);
            }
        });
    }


    $scope.castBallot = function() {
        $scope.savePres();
        $scope.saveVPres();
        $scope.saveSen();
        $scope.saveRep();

        $scope.votingButtonLoading = true;
        $scope.votingButtonText = " Casting Ballot";

        $http({
            method: 'POST',
            url: $scope.url + '/vote/voterequest',
            data: {
                "id": $scope.id,
                "otp": $scope.otp
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            //console.log(response);
            $scope.res = response;
            var exist = $scope.res.data.exist;
            var voted = $scope.res.data.voted;
            if (exist == 0) {
                //alert("Not Existing");
                sessionStorage.setItem('error', 2);
                $window.location.href = '../vote';
            } else {
                if (voted == 0) {
                    //alert("You can vote");
                    $http({
                        method: 'POST',
                        url: $scope.url + '/vote/castballot',
                        data: {
                            "voter": $scope.id,
                            "pres": $scope.presidentSel,
                            "vp": $scope.VicePresidentSel,
                            "sen": $scope.senatorArray,
                            "rep": $scope.RepresentativeArray
                        },
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function(response2) {
                        $scope.res2 = response2;
                        if ($scope.res2.data.result == "Success") {
                            sessionStorage.setItem('success', 1);
                            $window.location.href = '../vote';
                        } else {
                            alert("Something Wrong. Please Contact Administrator")
                        }
                        //console.log($scope.res2);
                    }, function(error) {
                        alert("Failed Casting Ballot, Please Try Again")
                        $scope.votingButtonLoading = false;
                        $scope.votingButtonText = "Cast Ballot";
                        console.log(error);
                    });

                } else {
                    //alert("You already VOTED!");
                    sessionStorage.setItem('error', 3);
                    $window.location.href = '../vote';
                }
            }
        }, function(error) {
            console.log(error);
        });
    }
});