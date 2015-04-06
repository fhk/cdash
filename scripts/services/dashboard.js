'use strict';

app.factory('Dashboard', function(FURL, $firebase, $q) {
	var ref = new Firebase(FURL);

	var Dashboard = {
		
		getMetricsForUser: function(uid) {
			var defer = $q.defer();

			$firebase(ref.child('user_metrics').child(uid))
				.$asArray()
				.$loaded()
				.then(function(metrics) {					
					defer.resolve(metrics);
				}, function(err) {
					defer.reject();
				});

			return defer.promise;
		}
	};

	return Dashboard;
});