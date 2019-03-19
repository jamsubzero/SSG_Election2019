angular.module('vote', [])
    .controller('myCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
        //$scope.count = 0;
        $scope.url = "http://192.168.1.173:8080"

        sessionStorage.removeItem('name');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('otp');
        sessionStorage.removeItem('course');

        $scope.voteButtonText = "Vote";

        // sessionStorage.removeItem('success');
        // sessionStorage.removeItem('error');

        // $scope.voteButtonText = "Vote";
        // $scope.voteBtnTxt = function() {
        //     $scope.voteButtonText = "Loading";
        // }

        if (sessionStorage.getItem('success') == 1) {
            $scope.IsVisible_voted_success = true;
        } else if (sessionStorage.getItem('error') == 2) {
            $scope.IsVisible_ir = true;
        }
        // } else if (sessionStorage.getItem('error') == 3) {
        //     $scope.IsVisible_voted = true;
        //     //sessionStorage.removeItem('error');
        // } else if (sessionStorage.getItem('error') == 2) {
        //     $scope.IsVisible_ir = true;
        //     //sessionStorage.removeItem('error');
        // } else {
        //     $scope.IsVisible_ir = false;
        //     $scope.IsVisible_ider = false;
        //     $scope.IsVisible_voted = false;
        //     $scope.IsVisible_voted_success = false;
        // }

        $scope.myFunc = function() {
            var id = $scope.id;
            var otp = $scope.otp;

            $scope.voteButtonLoading = true;
            $scope.voteButtonText = "";

            $scope.IsVisible_ir = false;
            $scope.IsVisible_ider = false;
            $scope.IsVisible_voted = false;
            $scope.IsVisible_voted_success = false;

            sessionStorage.removeItem('error');
            sessionStorage.removeItem('success');

            $http({
                method: 'POST',
                url: $scope.url + '/vote/voterequest',
                data: {
                    "id": id,
                    "otp": otp
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response) {
                console.log(response);
                $scope.res = response;
                var exist = $scope.res.data.exist;
                var voted = $scope.res.data.voted;
                var id = $scope.res.data.id;
                var name = $scope.res.data.name;
                var course = $scope.res.data.course;
                if (exist == 0) {
                    //alert("Not Existing");
                    $scope.IsVisible_ider = true;
                    $scope.voteButtonLoading = false;
                    $scope.voteButtonText = "Vote";
                } else {
                    if (voted == 0) {
                        //alert("You can vote");
                        sessionStorage.setItem('name', name);
                        sessionStorage.setItem('id', id);
                        sessionStorage.setItem('otp', otp);
                        sessionStorage.setItem('course', course);
                        sessionStorage.removeItem('success');
                        $window.location.href = '../voting';
                    } else {
                        //alert("You already VOTED!");
                        $scope.IsVisible_voted = true;
                        $scope.voteButtonLoading = false;
                        $scope.voteButtonText = "Vote";
                    }
                }
            }, function(error) {
                console.log(error);
            });
            //alert(req);
        };
    }]);