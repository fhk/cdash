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

app.directive('mymetrics', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            angular.forEach(scope[attrs.user_metrics], function (value, key) {
            	console.log(123)
                html += '<iframe ';
                var chart = getChart(value.value);
                $scope.trustSrc(chart);
                html += 'ng-src=' + chart + ' width="100%" height="955" border="0">';
                html += '</iframe>';
                console.log(metric)
                element.append(html)
                $compile(element.contents())(scope);
                });
        }
    };
});
