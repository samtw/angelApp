app.directive('fileModel', ['$parse', '$http', '$rootScope', 'SignalrService', function ($parse, $http, $rootScope, SignalrService) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                debugger;
                var fd = new FormData();
                fd.append('file', element[0].files[0]);
                var uploadUrl = "../api/filesClient?owner=test005&folder=chatroom,test005";
                 $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                 }).success(function (data) {
                     debugger;
                     var newObj = {
                         Name: $rootScope.username,
                         Content: data,
                         MessageBroderId: $rootScope.currentMessageborderId
                     };
                     testt = JSON.stringify(newObj);
                     SignalrService.invoke('SendNewComment', testt).done(function () {
                     }).fail(function (error) {
                         console.log('Error: ' + error);
                     });
                 }).error(function () {


                 });
            });
        }
    };
}]);