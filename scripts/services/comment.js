'use strict';

app.factory('Comment', function(FURL, $firebase) {

	var ref = new Firebase(FURL);	

	var Comment = {
		comments: function(metricId) {
			return $firebase(ref.child('comments').child(metricId)).$asArray();
		},

		addComment: function(metricId, comment) {
			var metric_comments = this.comments(metricId);
			comment.datetime = Firebase.ServerValue.TIMESTAMP;

			if(metric_comments) {
				return metric_comments.$add(comment);	
			}			
		}
	};

	return Comment;
});