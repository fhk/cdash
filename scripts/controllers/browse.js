'use strict';

app.controller('BrowseController', function($scope, $routeParams, toaster, Metric, Auth, Comment) {

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
		$scope.chartObject = createChart(metric)
		

	}	
		
	function setSelectedMetric(metric, chart) {
		$scope.selectedMetric = metric;
	
		// Get list of comments for the selected metric
		$scope.comments = Comment.comments(metric.$id);	

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
		chart = {
				  "type": "ColumnChart",
				  "cssStyle": "height:200px; width:300px;",
				  "data": {
				    "cols": [
				      {
				        "id": "month",
				        "label": "Month",
				        "type": "string",
				        "p": {}
				      },
				      {
				        "id": "laptop-id",
				        "label": "Laptop",
				        "type": "number",
				        "p": {}
				      },
				      {
				        "id": "desktop-id",
				        "label": "Desktop",
				        "type": "number",
				        "p": {}
				      },
				      {
				        "id": "server-id",
				        "label": "Server",
				        "type": "number",
				        "p": {}
				      },
				      {
				        "id": "cost-id",
				        "label": "Shipping",
				        "type": "number"
				      }
				    ],
				    "rows": [
				      {
				        "c": [
				          {
				            "v": "January"
				          },
				          {
				            "v": 19,
				            "f": "42 items"
				          },
				          {
				            "v": 12,
				            "f": "Ony 12 items"
				          },
				          {
				            "v": 7,
				            "f": "7 servers"
				          },
				          {
				            "v": 4
				          }
				        ]
				      },
				      {
				        "c": [
				          {
				            "v": "February"
				          },
				          {
				            "v": 13
				          },
				          {
				            "v": 1,
				            "f": "1 unit (Out of stock this month)"
				          },
				          {
				            "v": 12
				          },
				          {
				            "v": 2
				          }
				        ]
				      },
				      {
				        "c": [
				          {
				            "v": "March"
				          },
				          {
				            "v": 24
				          },
				          {
				            "v": 0
				          },
				          {
				            "v": 11
				          },
				          {
				            "v": 6
				          }
				        ]
				      }
				    ]
				  },
				  "options": {
				    "title": "Sales per month",
				    "isStacked": "true",
				    "fill": 20,
				    "displayExactValues": true,
				    "vAxis": {
				      "title": "Sales unit",
				      "gridlines": {
				        "count": 6
				      }
				    },
				    "hAxis": {
				      "title": "Date"
				    }
				  },
				  "formatters": {},
				  "displayed": true
				}
	    return chart;
	};

});
