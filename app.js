var app = angular.module('housing', ['ui.router', 'uiGmapgoogle-maps']);
app.config(['uiGmapGoogleMapApiProvider',function(uiGmapGoogleMapApiProvider){
    uiGmapGoogleMapApiProvider.configure({
        india: true
    });
}]);

var data = [{lat: 28.6139, lon: 77.2090},
    {lat: 12.9667, lon: 77.5667},
    {lat: 17.3700, lon: 78.4800}];
    
app.controller('baseController', ['$scope', function ($scope) {
    $scope.location = {};
    $scope.map = { center: {latitude: 28.6139, longitude:77.2090 } , 
                     zoom: 8,
                     options: { scrollwheel: false,
                        disableDefaultUI: true } 
                };
    $scope.resetMap = function(){
        var name = $scope.location.id;
        $scope.map = { center: {latitude: data[name].lat, longitude: data[name].lon }
                  };
    }
}]);