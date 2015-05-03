'use strict';

app.factory('Metric', function(FURL, $firebase, Auth) {
	var ref = new Firebase(FURL);
	var metrics = $firebase(ref.child('metrics')).$asArray();
	var user = Auth.user;

	var Metric = {
		all: metrics,

		getMetric: function(metricId) {
			return $firebase(ref.child('metrics').child(metricId));
		},
		getChart: function(metricId) {
			return $firebase(ref.child('metrics').child(metricId).child('chart'));
		},

		createMetric: function(metric) {
			metric.datetime = Firebase.ServerValue.TIMESTAMP;
			return metrics.$add(metric);
		},
	};

	return Metric;

});