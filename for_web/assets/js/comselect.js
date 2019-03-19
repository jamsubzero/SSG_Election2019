angular.module('comselect', [])
    .controller('myCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

        $scope.generateButtonText = "Generate";
        $scope.pass = "";

        $scope.myFunc = function() {
            var id = $scope.id;
            var pass = $scope.pass;

            $scope.generateButtonLoading = true;
            $scope.generateButtonText = " Generating";

            $scope.IsVisible_ider = false;
            $scope.IsVisible_voted = false;


            $http({
                method: 'POST',
                url: 'http://192.168.1.173:8080/vote/voterequest',
                data: {
                    "id": id
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response) {
                //console.log(response);
                $scope.res = response;
                var exist = $scope.res.data.exist;
                var voted = $scope.res.data.voted;
                var id = $scope.res.data.id;
                var name = $scope.res.data.name;
                var course = $scope.res.data.course;
                if (exist == 0) {
                    //alert("Not Existing");
                    $scope.IsVisible_ider = true;
                    $scope.generateButtonLoading = false;
                    $scope.generateButtonText = "Generate";
                } else {
                    if (voted == 0) {
                        $scope.pass = "SADASDSAD";
                        $scope.generateButtonLoading = false;
                        $scope.generateButtonText = "Generate";
                        //alert("You can vote");
                        //$window.location.href = '../voting';
                    } else {
                        //alert("You already VOTED!");
                        $scope.IsVisible_voted = true;
                        $scope.generateButtonLoading = false;
                        $scope.generateButtonText = "Generate";
                    }
                }
            }, function(error) {
                console.log(error);
            });
            //alert(req);
        };
    }]);