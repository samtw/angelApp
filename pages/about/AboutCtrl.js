app.controller('AboutCtrl', ['$state', '$scope', 'AboutClintService', '$ionicSlideBoxDelegate', function ($state, $scope, AboutClintService, $ionicSlideBoxDelegate) {

    AboutClintService.getAllCarousel('關於我們').then(function (data) {

        debugger;
        $scope.DataList = data;
        $ionicSlideBoxDelegate.update();
    });

    $scope.goToDetailInfo = function (data) {
        debugger
        if (data == 1) {
            $state.go('app.DetailInfo');
        } else if (data == 2) {
            $state.go('app.ClassInfoesIntro');
        }

    };

}]);

app.controller('DetailInfoCtrl', ['$state', '$scope', 'AboutClintService', '$sce', function ($state, $scope, AboutClintService, $sce) {
   
    $scope.vm = {};
    AboutClintService.getAll().then(function (data) {
        $scope.vm.infoList = data;
    });
    $scope.trustAsHtml = $sce.trustAsHtml;


}]);

app.controller('ClassInfoesIntroCtrl', ['$state', '$scope', 'ClassInfoesService', '$sce', function ($state, $scope, ClassInfoesService, $sce) {
    debugger
    $scope.vm = {};
    ClassInfoesService.getAll().then(function (data) {
        $scope.vm.infoList = data;
    });
    $scope.trustAsHtml = $sce.trustAsHtml;

}]);


