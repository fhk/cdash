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
