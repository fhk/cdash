'use strict';

app.controller('DashboardController', function($scope, Dashboard, Auth) {

	$scope.metricSaved = [];

	var uid = Auth.user.uid;

	Dashboard.getMetricsForUser(uid).then(function(metrics) {
	});
	
});