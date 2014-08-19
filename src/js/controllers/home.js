module.exports = ['$scope', 'resourceDef', function($scope, resourceDef) {

    $scope.resources = [];

    resourceDef.get().then(function() {
    	$scope.resources = resourceDef.resources();
    });
}];