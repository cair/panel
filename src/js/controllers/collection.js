module.exports = ['$scope', '$stateParams', '$http', 'resourceDef', function($scope, $stateParams, $http, resourceDef) {

	var collection = $stateParams.collection;

	$scope.collection = collection;
    
    $scope.attributes = [];

    $scope.items = [];

    $scope.delete = function($index) {

    	var item = $scope.items[$index];

    	$http.delete('/api/' + collection + '/' + item.id).success(function(response) {
    		$scope.items.splice($index, 1)
    	});
    };

    resourceDef.get().then(function() {
        $scope.attributes = resourceDef.resource(collection).attributes;
    });

    $http.get('/api/' + collection).success(function(response) {
        $scope.items = response[collection];
    });
}];