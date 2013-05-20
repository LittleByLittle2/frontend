'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
$app.value('version', '0.1');

$app.factory('setPageTitle', ['$rootScope', function($rootScope) {
    var msgs = [];
    return function(title) {
      $rootScope.pageTitle = title;
    };
  }]);