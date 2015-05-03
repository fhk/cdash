'use strict';

app.controller('MetricController', function($scope, $location, toaster, Metric, Auth) {
    $scope.createMetric = function() {
        $scope.metric.gravatar = Auth.user.profile.gravatar;
        $scope.metric.poster = Auth.user.uid;

        Metric.createMetric($scope.metric).then(function(ref) {
            toaster.pop('success', 'Metric created successfully.');
            $scope.metric = {title: '', description: '', total: '', status: 'open', gravatar: '', name: '', poster: ''};
            $location.path('/browse/' + ref.key());
        });
    };
	
});