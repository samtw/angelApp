
app.service('SignalrService', ['$', '$rootScope', 'MessagesService', function ($, $rootScope, MessagesService) {
    var proxy = null;

    var _initialize = function () {

        console.log('begin of signalRSvc intialize');

        // Getting the connection object
        // var url = UrlHelper.prepareSignalrUrl();
        var url = "http://localhost:51814/signalr/hubs"
        console.log(url);
        var connection = $.hubConnection(url, { useDefaultPath: false ,transport: ['longPolling']});

        // Creating proxy, 開頭字母要小寫
        proxy = connection.createHubProxy('signalrChatroomHub');

        //proxy.on('addNewCommentToPage', function (data) {

        //    localStorage["PassRecord"] = JSON.stringify(data);

        //    var tempString = JSON.parse(localStorage["PassRecord"]);
        //    $scope.RecoedList = data;
        //});

        connection.start()
                  .done(function (result) {
                      console.log('Now connected, connection ID=' + connection.id);

                      MessagesService.getBoardByUser($rootScope.username).then(function (data) {
                          debugger
                          _.forEach(data, function (item) {

                              proxy.invoke('joinGroup', item.id.toString()).done(function () {
                                  console.log('Invocation of joinGroup succeeded');
                              }).fail(function (error) {
                                  console.log('Invocation of joinGroup failed. Error: ' + error);
                              });
                          
                          });

                      });


                      
                  })
                  .fail(function (error) { console.log(error); });


        proxy.on('addNewCommentToPage', function (data) {

            var aaLocalMessage = JSON.parse(localStorage["chat"]);
            var theMessageboard = _.find(aaLocalMessage, function (item) {
                return data.MessageBroderId == item.id;
            });
            
            theMessageboard.MessageRecord.push(data);
            theMessageboard.unread += 1;

            // 在active的聊天室中觸動事件
            if ($rootScope.currentMessageborderId != null) {
                $rootScope.$broadcast("client_newSlide", data);
                theMessageboard.unread = 0;
            }

            var index = _.findIndex(aaLocalMessage, function (item) {
                return data.MessageBroderId == item.id;
            });
            aaLocalMessage[index] = theMessageboard;

            localStorage["chat"] = JSON.stringify(aaLocalMessage);

        });


    };

  
    

    // 呼叫 server 上的方法
    var _invoke = function (hubMethod, message) {
        return proxy.invoke(hubMethod, message);
    };

    return {
        initialize: _initialize,
        invoke: _invoke
    };
}]);
