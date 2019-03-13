angular.module('vote', [])
.controller('Result', function($scope, $http) {
    $http.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22').
        then(function(response) {
            $scope.pres = response.data;
        });
    $http.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22').
        then(function(response) {
            $scope.vpres = response.data;
        });
        
    $timeout(function(){
            $scope.reload();
          },30000)
        
        $scope.reload();
});