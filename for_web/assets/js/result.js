angular.module('voteresult', [])
    .controller('Result', function($scope, $http, $timeout, ) {

        $scope.i = 0;
        $scope.url = "http://192.168.1.173:8080";

        $scope.overall = 123456;

        $scope.reload = function() {
            $http.get($scope.url + '/ssgapi/getresult/pres').
            then(function(response) {
                $scope.pres = response.data;
            });
            $http.get($scope.url + '/ssgapi/getresult/vp').
            then(function(response) {
                $scope.vpres = response.data;
            });
            $http.get($scope.url + '/ssgapi/getresult/sen').
            then(function(response) {
                $scope.sen = response.data;
            });
            $http.get($scope.url + '/ssgapi/getresult/itrep').
            then(function(response) {
                $scope.itrep = response.data;
            });
            $http.get($scope.url + '/ssgapi/getresult/edrep').
            then(function(response) {
                $scope.edrep = response.data;
            });
            $http.get($scope.url + '/ssgapi/getresult/barep').
            then(function(response) {
                $scope.barep = response.data;
            });
            $http.get($scope.url + '/ssgapi/getresult/crrep').
            then(function(response) {
                $scope.crrep = response.data;
            });
            $http.get($scope.url + '/ssgapi/getresult/firep').
            then(function(response) {
                $scope.firep = response.data;
            });
            $http.get($scope.url + '/vote/statistics/all').
            then(function(response) {
                $scope.all = response.data;
            });
            $http.get($scope.url + '/vote/statistics/BA').
            then(function(response) {
                $scope.ba = response.data;
            });
            $http.get($scope.url + '/vote/statistics/CRIM').
            then(function(response) {
                $scope.cr = response.data;
            });
            $http.get($scope.url + '/vote/statistics/ED').
            then(function(response) {
                $scope.ed = response.data;
            });
            $http.get($scope.url + '/vote/statistics/FI').
            then(function(response) {
                $scope.fi = response.data;
            });
            $http.get($scope.url + '/vote/statistics/IT').
            then(function(response) {
                $scope.it = response.data;
            });

            $timeout(function() {
                $scope.reload();
            }, 60000)
        };
        $scope.reload();

    });