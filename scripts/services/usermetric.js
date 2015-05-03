'use strict';

app.factory('UserMetric', function(FURL, $firebase, Auth) {
    var ref = new Firebase(FURL);
    var user = Auth.user;

    var UserMetric = {
        addMetric: function(metricId) {
            var u_metrics = $firebase(ref.child('user_metrics').child(user.uid)).$asArray();
            u_metrics.$add(metricId);
        }
    };

    return UserMetric;

});