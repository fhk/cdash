'use strict';

app.factory('Dashboard', function(FURL, $firebase, Metric, Auth) {
	var ref = new Firebase(FURL);
	var user = Auth.user;
	

	var uMetric = {
	getChart: function() {
			return $firebase(ref.child('user_metrics').child(user.uid)).$asArray();
		}
	};

	return uMetric;
});

app.directive('myMetrics', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var html = '<iframe>';
            angular.forEach(scope[attrs.user_metrics], function (metric) {
            	$scope.trustSrc(metric.value);
                html += 'ng-src=' + metric.value + '"width="100%" height="955" border="0"';
                });

            html += '</iframe>';
            element.replaceWith(html)
        }
    }
});