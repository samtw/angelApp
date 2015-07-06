app.controller('MainCtrl', ['$ionicHistory', '$state', '$scope', 'User', '$ionicSideMenuDelegate', '$rootScope',
    function ($ionicHistory, $state, $scope, User, $ionicSideMenuDelegate, $rootScope) {


    $rootScope.inMain = true;

    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();
    $scope.goToTeachers = function () {
        $state.go('app.teachers');
    }


    $scope.goToFriends = function () {
        $state.go('app.login.friends');
    }

    $scope.goToAbout = function (subdomain) {
        $state.go('app.icdtinfo');
    }

    $scope.goToNews = function () {
        $state.go('app.news');
    }

    $scope.goToCalendar = function () {
        $state.go('app.login.calendar');
    }
    $scope.goTomessageboard = function () {
        $state.go('app.login.messageboard');
    }

    $ionicSideMenuDelegate.canDragContent(false);
    
}]);