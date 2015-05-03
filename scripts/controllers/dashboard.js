'use strict';

app.controller('DashboardController', function($scope, Dashboard) {
	$scope.dashChart = Dashboard.getChart()
});