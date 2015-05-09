app.factory("SetMetric",function($rootScope, $scope, Comment){
    var SetMetric = {};
    SetMetric.metric = '';
    $scope.metric = '';

    SetMetric.share = function(metric) {
        this.metric = metric;
          // Get list of comments for the selected metric
        this.metric.comments = Comment.comments(metric.$id);
        this.broadcastItem();
    };

    SetMetric.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    return SetMetric;
        
});