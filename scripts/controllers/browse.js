'use strict';

app.controller('BrowseController', function($scope, $routeParams, toaster, Metric, Auth, UserMetric, Comment) {

	$scope.searchMetric = '';		
	$scope.metrics = Metric.all;
	$scope.chartObject = {}

	$scope.user = Auth.user;
	$scope.signedIn = Auth.signedIn;

	$scope.listMode = true;
	
	if($routeParams.metricId) {
		var metric = Metric.getMetric($routeParams.metricId).$asObject();
		var chart = createChart(metric)
		$scope.listMode = false;
		setSelectedMetric(metric, chart);
		$scope.chartObject = createChart();
	}	
		
	function setSelectedMetric(metric, chart) {
		$scope.selectedMetric = metric;
	
		// Get list of comments for the selected metric
		$scope.comments = Comment.comments(metric.$id);	

	}

	// --------- ADD METRIC TO DASH ----------

	$scope.addMetric = function() {
		UserMetric.addMetric($scope.selectedMetric.$id);
		console.log("123");
	};

	// --------------- COMMENT ---------------	

	$scope.addComment = function() {
		var comment = {
			content: $scope.content,
			name: $scope.user.profile.name,
			gravatar: $scope.user.profile.gravatar
		};

		Comment.addComment($scope.selectedMetric.$id, comment).then(function() {				
			$scope.content = '';		
		});
	};

	function createChart() {
		chart = Metric.getChart($routeParams.metricId).$asObject();
	    return chart;
	};

});
