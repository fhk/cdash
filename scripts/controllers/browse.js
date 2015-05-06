'use strict';

app.controller('BrowseController', function($scope, $sce, $routeParams, toaster, Metric, Auth, UserMetric, Comment) {
	$scope.tags = [ 'cool', 'awesome', 'angular', 'directive', 'javascript', 'html' ];

    $scope.searchMetric = '';        
    $scope.metrics = Metric.all;

    $scope.user = Auth.user;
    $scope.signedIn = Auth.signedIn;

    $scope.listMode = true;
    
    if($routeParams.metricId) {
        var metric = Metric.getMetric($routeParams.metricId).$asObject();
        var chart = Metric.getChart($routeParams.metricId).$asObject();
        $scope.listMode = false;
        setSelectedMetric(metric, chart);
    }

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      }
        
    function setSelectedMetric(metric) {
        $scope.selectedMetric = metric;
        $scope.chart = chart.value;
    
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
});

app.directive('tagManager', function() {
    return {
        restrict: 'E',
        scope: { tags: '=' },
        template:
            '<div class="tags">' +
                '<a ng-repeat="(idx, tag) in tags" class="tag" ng-click="remove(idx)">{{tag}}</a>' +
            '</div>' +
            '<input type="text" placeholder="Add a tag..." ng-model="new_value"></input> ' +
            '<a class="btn" ng-click="add()">Add</a>',
        link: function ( $scope, $element ) {
            // FIXME: this is lazy and error-prone
            var input = angular.element( $element.children()[1] );
            
            // This adds the new tag to the tags array
            $scope.add = function() {
                $scope.tags.push( $scope.new_value );
                $scope.new_value = "";
            };
            
            // This is the ng-click handler to remove an item
            $scope.remove = function ( idx ) {
                $scope.tags.splice( idx, 1 );
            };
            
            // Capture all keypresses
            input.bind( 'keypress', function ( event ) {
                // But we only care when Enter was pressed
                if ( event.keyCode == 13 ) {
                    // There's probably a better way to handle this...
                    $scope.$apply( $scope.add );
                }
            });
        }
    };
});