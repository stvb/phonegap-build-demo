var module = angular.module("phonegapModule",[]);

module.controller('phonegapCtrl', function($scope, $http) {
    $scope.gpsLocation="<unknown>";
    
    $scope.syncGPS=function() {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                 $scope.gpsLocation="Lat: "+position.coords.latitude+
                                    " Lon: "+position.coords.longitude;
            },
            function() {
                console.log("failed...");
            });
    }
});
