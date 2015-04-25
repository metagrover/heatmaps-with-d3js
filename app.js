angular.module('houshing', ['ui.router', 'uiGmapgoogle-maps']);
angular.module('houshing').config(['uiGmapGoogleMapApiProvider',function(uiGmapGoogleMapApiProvider){
    uiGmapGoogleMapApiProvider.configure({
        india: true
    });
}]);
angular.module('houshing').config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/home");
    $stateProvider
        .state('home', {
            url: "/home",
            views: {
                index: {
                    templateUrl: "partials/home.html",
                    controller: "BaseController as baseCtrl"
                }
            }
        })
}]);
angular.module('houshing').controller('BaseController', [ function () {
    var baseCtrl = this;
    baseCtrl.testing = "Hello";
    baseCtrl.map = { center: {latitude: 45, longitude: -73 } , zoom: 8 };
}]);