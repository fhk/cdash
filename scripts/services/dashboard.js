'use strict';

app.factory('Dashboard', function(FURL, $firebase, Metric, Auth) {
	var ref = new Firebase(FURL);
	var user = Auth.user;
	console.log(user.uid)
	var u_metrics = $firebase(ref.child('user_metrics').child(user.uid)).$asArray();
	console.log(u_metrics)
	var Dashboard = {
		getChart: function() {
			return Metric.getChart(u_metrics[0].$value);
		}
	};


	return Dashboard;
});