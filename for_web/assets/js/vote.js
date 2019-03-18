angular.module('vote', [])
    .controller('myCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
        //$scope.count = 0;
        localStorage.removeItem('name');
        localStorage.removeItem('id');
        localStorage.removeItem('course');

        // $scope.voteButtonText = "Vote";
        // $scope.voteBtnTxt = function() {
        //     $scope.voteButtonText = "Loading";
        // }

        if (localStorage.getItem('success') == 1) {
            $scope.IsVisible_voted_success = true;
            //localStorage.removeItem('success');
        }
        if (localStorage.getItem('error') == 3) {
            $scope.IsVisible_voted = true;
            //localStorage.removeItem('error');
        }
        if (localStorage.getItem('error') == 2) {
            $scope.IsVisible_ir = true;
            //localStorage.removeItem('error');
        } else {
            $scope.IsVisible_ir = false;
            $scope.IsVisible_ider = false;
            $scope.IsVisible_voted = false;
            $scope.IsVisible_voted_success = false;
        }

        $scope.myFunc = function() {
            var id = $scope.id;
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
                } else {
                    if (voted == 0) {
                        //alert("You can vote");
                        localStorage.setItem('name', name);
                        localStorage.setItem('id', id);
                        localStorage.setItem('course', course);
                        $window.location.href = '../voting';
                    } else {
                        //alert("You already VOTED!");
                        $scope.IsVisible_voted = true;
                    }
                }
            }, function(error) {
                console.log(error);
            });
            //alert(req);
        };
    }]);