angular.module('vote', [])
    .controller('Result', function ($scope, $http, $timeout, ) {

        $scope.i = 0;

        $scope.reload = function () {
            $http.get('https://ssgdummyapi.herokuapp.com/ssgdummyapi/getresult/pres').
                then(function (response) {
                    $scope.pres = response.data;
                });
            $http.get('https://ssgdummyapi.herokuapp.com/ssgdummyapi/getresult/vp').
                then(function (response) {
                    $scope.vpres = response.data;
                });
            $http.get('https://ssgdummyapi.herokuapp.com/ssgdummyapi/getresult/sen').
                then(function (response) {
                    $scope.sen = response.data;
                });
            $http.get('https://ssgdummyapi.herokuapp.com/ssgdummyapi/getresult/itrep').
                then(function (response) {
                    $scope.itrep = response.data;
                });

            $timeout(function () {
                $scope.reload();
            }, 60000)
        };
        $scope.reload();

    });