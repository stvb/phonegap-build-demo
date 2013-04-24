var module = angular.module("phonegapModule",[]);

module.factory('phonegap', function($http) {
    function getGps() {
    }
    
    return {
        getGps: getGps
    }
});

module.controller('phonegapCtrl', function($scope, $http, openkeyval) {
});
