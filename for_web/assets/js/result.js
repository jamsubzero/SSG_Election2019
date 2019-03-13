angular.module('vote', [])
.controller('Result', function($scope, $http, $timeout) {

    $scope.reload = function(){
        $http.get('http://192.168.1.173:8080/ssgdummyapi/getresult/pres').
            then(function(response) {
                $scope.pres = response.data;
            });
        $http.get('http://192.168.1.173:8080/ssgdummyapi/getresult/vp').
            then(function(response) {
                $scope.vpres = response.data;
            });
            
         $timeout(function(){
                 $scope.reload();
             },30000)
    };        
             $scope.reload();
    
});