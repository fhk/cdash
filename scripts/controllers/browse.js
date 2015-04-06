'use strict';

app.controller('BrowseController', function($scope, $routeParams, toaster, Metric, Auth, Comment) {

	$scope.searchMetric = '';		
	$scope.metrics = Metric.all;

	$scope.user = Auth.user;
	$scope.signedIn = Auth.signedIn;

	$scope.listMode = true;
	
	if($routeParams.metricId) {
		var metric = Metric.getMetric($routeParams.metricId).$asObject();
		var chart = createChart(metric)
		$scope.listMode = false;
		setSelectedMetric(metric, chart);
		

	}	
		
	function setSelectedMetric(metric, chart) {
		$scope.selectedMetric = metric;
	
		// Get list of comments for the selected metric
		$scope.comments = Comment.comments(metric.$id);	

		// Get chart
		$scope.chart = chart
	}
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

	function createChart(metric) {

		var data = google.visualization.arrayToDataTable([
	          ['Year', 'Sales', 'Expenses'],
	          ['2004',  1000,      400],
	          ['2005',  1170,      460],
	          ['2006',  660,       1120],
	          ['2007',  1030,      540]
	        ]);

		var options = {
	          title: 'Company Performance',
	          width: '900px',
	          height: '200px'
	        };
	    var chart = new google.visualization.ChartWrapper({
	    	chartType: 'LineChart',
	    	dataTable: data,
	    	options: options,
	    	containerId: 'chart_div'});
	    return chart.draw();
	};

});
