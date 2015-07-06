app.controller('TeacherCtrl', ['$state', '$scope', 'TeacherClintService', '$ionicSlideBoxDelegate', function ($state, $scope, TeacherClintService, $ionicSlideBoxDelegate) {

    TeacherClintService.getSubject().then(function (data) {

        $scope.SubjectList = data;
    });

    TeacherClintService.getAllCarousel("師資團隊").then(function (data) {

        debugger;
        $scope.DataList = data;
        $ionicSlideBoxDelegate.update();
    });

    


    $scope.goToTeachersDetail = function (ppId) {
        $state.go('app.teacherDetail', { id: ppId });
    };
   
}]);

app.controller('TeacherDetailCtrl', ['$state', '$scope', '$stateParams', 'TeacherClintService', '$sce', function ($state, $scope, $stateParams, TeacherClintService, $sce) {
    TeacherClintService.getTeacherBySubject($stateParams.id).then(function (data) {
        
        $scope.TeacherList = data;
    })
    $scope.trustAsHtml = $sce.trustAsHtml;

}]);