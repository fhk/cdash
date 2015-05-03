'use strict';

app.controller('DashboardController', function($scope, Dashboard) {

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

	$scope.userMetrics = Dashboard.getChart()

    
});