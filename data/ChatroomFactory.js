app.factory('ChatroomFactory', ['$q', '$http', '$rootScope', function ($q, $http, $rootScope) {

    return {

        // 進溝通天地
        getAll: function () {
            return JSON.parse(localStorage['chat']);
        },

        // 進聊天室
        gatByMessageBorder: function (ppId) {
            var chat = JSON.parse(localStorage['chat']);
            return _.find(chat, function (item) {
                return item.id == ppId;
            });
        },

        // user login: get all board from server and write to localStorage
        getBoardByUser: function (ppUsername) {
            $http.get('/api/MessageBorders?username=' + ppUsername).success(function (data) {

                var aaChat = [];

                // 第一次login
                if (localStorage['chat'] == "" || typeof localStorage['chat'] == 'undefined') {
                    for (var i = 0; i < data.length; i++) {
                        data[i].unread = data[i].MessageRecord.length;
                    }
                    aaChat = data;

                // 第n次login
                } else {

                    aaChat = JSON.parse(localStorage['chat']);
                    for (var i = 0; i < data.length; i++) {
                        var localChat = _.find(aaChat, function (item) {
                            return item.id == data[i].id
                        });

                        if (localChat == null) {
                            data[i].unread = data[i].MessageRecord.length;
                            aaChat.push(data[i]);
                        } else {
                            localChat.unread = data[i].MessageRecord.length - localChat.MessageRecord.length;

                            var index = _.findIndex(aaChat, function (item) {
                                return item.id = localChat.id;
                            });

                            aaChat[index].MessageRecord = data[i].MessageRecord;
                        }

                    }
                }

                localStorage['chat'] = JSON.stringify(aaChat);

            }).error(function (err) {
                console.log(err);
            });
        }


    };

}]);

