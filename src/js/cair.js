require('angular');
var router = require('angular-ui-router');

var app = angular.module('app', [router]);

var config = {
    namespace: '/api',
    views: {
        home: 'home.html',
        resource: 'collection.html',
        create: 'create.html',
        item: 'item.html'
    }
};

app.config(function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise("/");

    // Now set up the states
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: config.views.home,
            controller: require('./controllers/home')
        })
        .state('collection', {
            url: '/:collection',
            templateUrl: config.views.resource,
            controller: require('./controllers/collection')
        })
        .state('create', {
            url: '/:collection/create',
            templateUrl: config.views.create,
            controller: require('./controllers/create')
        })
        .state('item', {
            url: '/:collection/:item',
            templateUrl: config.views.item,
            controller: require('./controllers/item')
        })
});

app.service('resourceDef', ['$http', '$q', function($http, $q) {

    var deffered = $q.defer();
    var resources = {};  
    var resourceDef = {};

    var _isEmpty = function(obj) {
        for (var prop in obj) {
            return false;
        }
        return true;
    };

    resourceDef.get = function() {

        var promise = resourceDef._get();

        if ( ! _isEmpty(resources)) {
            setTimeout(function() {
                deffered.resolve();
            }, 1);
        }

        return promise;
    };

    resourceDef._get = function() {
        // Add temporary trailing slash, because of a bug in access.
        if (_isEmpty(resources)) {
            $http.get(config.namespace).success(function (response) {
                resources = response.resources;
                deffered.resolve();
            });
        }

        return deffered.promise;
    };

    resourceDef.resources = function() {
        return Object.keys(resources);
    };

    resourceDef.resource = function(resource) {
        return resources[resource];
    };

    return resourceDef;
}]);