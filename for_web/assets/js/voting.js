var app = angular.module('voting', []);
app.controller('myCtrl', function($scope, $http, $window) {
    $scope.name = localStorage.getItem('name');
    $scope.url = "http://192.168.1.173:8080"

    if (localStorage.getItem('name') == null) {
        localStorage.setItem('error', 2);
        $window.location.href = "../vote";
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
    $scope.limitNumberREP = 12;
    $scope.checkREP = function(r) {
        if (s.checked) {
            $scope.checkedNumberREP--;
        } else {
            $scope.checkedNumberREP++;
        }
    }

    //vote
    $scope.savePres = function() {
        angular.forEach($scope.pres, function(p) {
            if (p.checked) {
                $scope.presidentSel = p.id;
            }
        });
    }
    $scope.saveVPres = function() {
        angular.forEach($scope.vpres, function(vp) {
            if (vp.checked) {
                $scope.VicePresidentSel = vp.id;
            }
        });
    }
    $scope.saveSen = function() {
        $scope.senatorArray = [];
        angular.forEach($scope.sen, function(s) {
            if (s.selected) {
                $scope.senatorArray.push(s.id);
            }
        });
    }


    $scope.castBallot = function() {
        $scope.savePres();
        $scope.saveVPres();
        $scope.saveSen();

    }
});