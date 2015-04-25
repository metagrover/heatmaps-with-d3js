var housingApp = angular.module('housingApp', ['ui.router']);

// tzAppProfile.config(['$routeProvider', '$locationProvider','$httpProvider', function($routeProvider, $locationProvider,$httpProvider) {
// 	$routeProvider.
// 	when('/photos', {
// 		templateUrl: '/static/partials/profile/photos.html'
// 	}).
// 	when('/showreels', {
// 		  templateUrl: '/static/partials/profile/showreels.html'
// 	}).
// 	when('/details', {
// 		  templateUrl: '/static/partials/profile/details.html'
// 	}).
// 	otherwise({
// 	redirectTo: ''
// 	});
// 	$locationProvider.html5Mode(true);
// 	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// 	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
// 	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
// }]);