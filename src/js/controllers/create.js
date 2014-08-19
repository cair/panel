module.exports = ['$scope', '$stateParams', '$http', '$location', 'resourceDef', function($scope, $stateParams, $http, $location, resourceDef) {

	var collection = $stateParams.collection;

	$scope.collection = collection;

	$scope.item = {};

    $scope.attributes = [];

    resourceDef.get().then(function() {
        $scope.definition = resourceDef.resource(collection);
    });

    $scope.publish = function() {

    	$http.post('/api/' + collection, $scope.item).success(function(response) {
	        $location.path('/' + collection + '/' + response[collection].id);
	    });
    };

    var errors = {};

    errors.title = true;

    $scope.getError = function(attribute) {
        if(errors.hasOwnProperty(attribute) && errors[attribute] === true) {
            return 'has-error';
        }
    }
}];