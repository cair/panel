module.exports = ['$scope', '$stateParams', '$http', 'resourceDef', '$timeout', '$sce', function($scope, $stateParams, $http, resourceDef, $timeout, $sce) {

	var collection = $stateParams.collection,
		item = $stateParams.item;

	$scope.collection = collection;

    $scope.item = {};

    $scope.loading = false;

    $scope.success = false;

    $scope.btnText = $sce.trustAsHtml('Update');

    $scope.attributes = [];

    $http.get('/api/' + collection + '/' + item).success(function(response) {
        $scope.item = response[collection];
    });

    resourceDef.get().then(function() {
        $scope.definition = resourceDef.resource(collection);
    });

    $scope.change = function() {
        $scope.btnText = $sce.trustAsHtml('Update');
        $scope.success = false;
    };

    $scope.submit = function() {

        $scope.loading = true;
        $scope.btnText = $sce.trustAsHtml('<span class="glyphicon glyphicon-refresh"></span>');

    	$http
        .put('/api/' + collection + '/' + item, $scope.item)
        .success(function() {
        });

        $timeout(function() {
            $scope.loading = false;
            $scope.success = true;
            $scope.btnText = $sce.trustAsHtml('Success <span class="glyphicon glyphicon-check"></span>');
        }, 800);
    };
}];