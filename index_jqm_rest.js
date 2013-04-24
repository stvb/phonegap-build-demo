var mod = angular.module("jqmREST",[]);

mod.factory('openkeyval', function($http) {
    var readUrl = 'https://secure.openkeyval.org/';
    var writeUrl = 'https://secure.openkeyval.org/store/?';

    function read(key) {
        return $http({
            method: 'JSONP',
            url: readUrl + key + '?callback=JSON_CALLBACK'
        }).then(function(response) {
            return response.data;
        });
    }

    function write(key, value) {
        value = encodeURIComponent(JSON.stringify(value));
        $http({
            method: 'JSONP',
            url: writeUrl + key + '=' + value + '&callback=JSON_CALLBACK'
        }).then(function() {
        });
    }

    return {
        read: read,
        write: write
    }
});

mod.controller('jqmRESTctrl', function($scope, $http, openkeyval) {
    $scope.yourCountry="World";
    $http.defaults.useXDomain = true;
    $scope.gpsLocation="<unknown>";

    $scope.refresh = function() {
        openkeyval.read("simplejqmdemo").then(function(data) {
            if (!data) {
                data = "World";
            }
            $scope.yourCountry = data;
        });
    }


    $scope.save = function() {
        console.log('save');
        openkeyval.write("simplejqmdemo",$scope.yourCountry);
    }
    
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
