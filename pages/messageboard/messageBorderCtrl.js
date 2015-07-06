app.controller('MessagesCtrl', ['$scope', '$state', 'MessagesService', '$stateParams', 'SignalrService', '$ionicScrollDelegate', '$stateParams', 'User', 'SignalrService', 'ChatroomFactory', '$rootScope', '$sce', '$ionicModal',
    function ($scope, $state, MessagesService, $stateParams, SignalrService, $ionicScrollDelegate, $stateParams, User, SignalrService, ChatroomFactory, $rootScope, $sce, $ionicModal) {
        $scope.vm = {};

        $scope.RecoedList = ChatroomFactory.gatByMessageBorder($stateParams.id).MessageRecord;
        $rootScope.currentMessageborderId = $stateParams.id;

        $scope.sendMessage = function () {

            if ($scope.data.message == "") return;
            var newObj = {
                Name: $rootScope.username,
                Content: $scope.data.message,
                MessageBroderId: $stateParams.id
            };
            testt = JSON.stringify(newObj);
            $scope.data.message = "";
            SignalrService.invoke('SendNewComment', testt).done(function () {
                $scope.data.message = "";
            }).fail(function (error) {
                console.log('Error: ' + error);
            });
        }

        $scope.$on('client_newSlide', function (event, data) {
            debugger
            $scope.RecoedList.push(data);
            $scope.$apply();
            $ionicScrollDelegate.scrollBottom(true);
        });

        $scope.trustAsHtml = $sce.trustAsHtml;
        $ionicScrollDelegate.scrollBottom(true);

        $scope.vm.Popup = function ($event) {
            //typeof $event.target.currentSrc == 'undefined'
            if (typeof $event.target == 'undefined') {
                return;
            } else {
                $scope.vm.openModal($event.target);
            }
            debugger;
            


        }


        // Upload Modal
        $ionicModal.fromTemplateUrl('/App/pages/messageboard/imagePopu.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.vm.openModal = function (data) {
            debugger;
            $scope.vm2 = {
                src:""
            };
            $scope.vm2.src = data;
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });
    }]);


app.controller('messageBorderCtrl', ['$scope', '$state', 'ChatroomFactory', 'User', function ($scope, $state, ChatroomFactory, User) {

    $scope.messageBorder = ChatroomFactory.getAll();

    $scope.gotToTalk = function (data) {
        $state.go('app.login.communicationBoard', { id: data });
    }

}]);





//app.controller('MessagesCtrl', ['$scope', '$state', 'MessagesService', '$stateParams', 'SignalrService', '$ionicScrollDelegate', '$stateParams', 'User', 'SignalrService', 'ChatroomFactory',
//    function ($scope, $state, MessagesService, $stateParams, SignalrService, $ionicScrollDelegate, $stateParams, User, SignalrService, ChatroomFactory) {


//        var lut = "2015/02/02";
//        $scope.vm = {};


//        $scope.RecoedList = ChatroomFactory.gatByMessageBorder($stateParams.id);
//        $rootScope.currentMessageborderId = $stateParams.id;

//        // Signalr joinGroup



//        //if lut is null this method will not fire  
//        //MessagesService.getOne($stateParams.id, lut).then(function (data) {

//        //    debugger;
//        //    $scope.vm.whoIam = User.getUserData().username;

//        //    $scope.RecoedList = data;

//        //    //if (data.length > 0) {
//        //    //    var oldRecord = JSON.parse(localStorage["PassRecord"]);
//        //    //    for (var i = 0; i < data.length ; i++) {
//        //    //        oldRecord.push(data[i]);
//        //    //    }
//        //    //    localStorage["PassRecord"] = JSON.stringify(oldRecord);

//        //    //    $scope.RecoedList = oldRecord;

//        //    //} else {

//        //    //    var oldRecord = JSON.parse(localStorage["PassRecord"]);
//        //    //    $scope.RecoedList = oldRecord;

//        //    //}
//        //    $ionicScrollDelegate.scrollBottom(true);
//        //});


//        $scope.sendMessage = function () {

//            if ($scope.data.message == "") return;
//            var newObj = {
//                Name: $rootScope.username,
//                Content: $scope.data.message,
//                MessageBroderId: $stateParams.id
//            };
//            testt = JSON.stringify(newObj);
//            SignalrService.invoke_server_method('SendNewComment', testt).done(function () {
//                console.log('Invocation of joinGroup succeeded');
//            }).fail(function (error) {
//                console.log('Invocation of joinGroup failed. Error: ' + error);
//            });

//        }


//        $scope.$on('client_newSlide', function (event, data) {

//            $ionicScrollDelegate.scrollBottom(true);
//        });




//    }])

