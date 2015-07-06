app.controller('LoginCtrl', ['$scope', 'User', '$ionicHistory', '$state', '$rootScope', 'SignalrService', 'ChatroomFactory',
    function ($scope, User, $ionicHistory, $state, $rootScope, SignalrService, ChatroomFactory) {

    $scope.dataObj = {
        Account: "",
        Password:""
    }
   
    $scope.login = function (obj) {
        debugger;
        User.authenticate(obj.username, obj.password, onSuccess, onFail, obj.persistData);

    };

    function onSuccess() {
        alert('登入成功');
        $rootScope.username = User.getUserData().username;
        SignalrService.initialize();
        debugger;
        ChatroomFactory.getBoardByUser($rootScope.username);
        $state.go('app.main');
    }

    function onFail(err) {
        console.log('err: ', err);
    }


}]);