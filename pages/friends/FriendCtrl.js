app.controller('FriendCtrl', ['$scope', '$state', 'FrientService', '$rootScope', function ($scope, $state, FrientService, $rootScope) {


    $scope.classes = [];

    FrientService.getAllInClasses().success(function (data) {
        debugger;
        $scope.classes = data;
    }).error(function (err) {
        console.log(err);
    });

    //FrientService.getOne('1').then(function (data) {
    //    debugger;
    //    $scope.FriendList = data;
    //});


    $scope.gotToTalk = function (data) {

        var ppObj = {
            username: $rootScope.username,
            personId: data

        }
        debugger;

        FrientService.getNewBoard(ppObj).success(function (data) {
            debugger;

            oldChat = JSON.parse(localStorage['chat']);

            var newChat = _.find(oldChat, function (item) {
                return item.id == data.id
            });

            if (newChat == null)
            {
                oldChat.push(data);
                localStorage['chat'] = JSON.stringify(oldChat);
            } else {
                $state.go('app.login.communicationBoard', { id: data.id });
            }

        }).error(function (err) {
            console.log(err);
        });
        

       // $state.go('app.messageboard', {id:data});
    }



}])

