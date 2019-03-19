angular.module('otp', [])
    .controller('myCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

        $scope.url = "http://192.168.1.173:8080"
        $scope.generateButtonText = "Generate";
        $scope.pass = "";

        $scope.myFunc = function() {
            var id = $scope.id;

            $scope.generateButtonLoading = true;
            $scope.generateButtonText = " Generating";

            $scope.IsVisible_ider = false;
            $scope.IsVisible_voted = false;
            $scope.IsVisible_votername = false;

            $http.get($scope.url + '/vote/genotp/' + id).
            then(function(response) {
                $scope.res = response.data;
                var status = $scope.res.status;

                if (status == 0) {
                    $scope.pass = "";
                    $scope.IsVisible_ider = true;
                    $scope.generateButtonLoading = false;
                    $scope.generateButtonText = "Generate";
                } else if (status == 1) {
                    $scope.pass = $scope.res.voter.otp;
                    $scope.IsVisible_votername = true;
                    $scope.voter_name = $scope.res.voter.name;
                    $scope.voter_course = $scope.res.voter.course;
                    $scope.generateButtonLoading = false;
                    $scope.generateButtonText = "Generate";
                } else if (status == 3) {
                    $scope.pass = "";
                    $scope.IsVisible_voted = true;
                    $scope.generateButtonLoading = false;
                    $scope.generateButtonText = "Generate";
                }
            });

            // $http({
            //     method: 'POST',
            //     url: 'http://192.168.1.173:8080/vote/genotp/',
            //     data: {
            //         "id": id
            //     },
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // }).then(function(response) {
            //     //console.log(response);
            //     $scope.res = response;
            //     var exist = $scope.res.data.exist;
            //     var voted = $scope.res.data.voted;
            //     var id = $scope.res.data.id;
            //     var name = $scope.res.data.name;
            //     var course = $scope.res.data.course;
            //     if (exist == 0) {
            //         //alert("Not Existing");
            //         $scope.pass = "";
            //         $scope.IsVisible_ider = true;
            //         $scope.generateButtonLoading = false;
            //         $scope.generateButtonText = "Generate";
            //     } else {
            //         if (voted == 0) {
            //             $scope.pass = "SADASDSAD";
            //             $scope.IsVisible_votername = true;
            //             $scope.voter_name = name;
            //             $scope.voter_course = course;
            //             $scope.generateButtonLoading = false;
            //             $scope.generateButtonText = "Generate";
            //             //alert("You can vote");
            //             //$window.location.href = '../voting';
            //         } else {
            //             //alert("You already VOTED!");
            //             $scope.pass = "";
            //             $scope.IsVisible_voted = true;
            //             $scope.generateButtonLoading = false;
            //             $scope.generateButtonText = "Generate";
            //         }
            //     }
            // }, function(error) {
            //     console.log(error);
            // });
            //alert(req);
        };
    }]);