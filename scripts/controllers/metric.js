'use strict';

app.controller('MetricController', function($scope, $location, toaster, Metric, Auth) {
	$scope.metric.name = Metric.name;
    $scope.chart = Metric.chart;
	$scope.metric.description = Metric.description;
	$scope.metric.state = Metric.state;
	
});