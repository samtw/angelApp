app.factory('AboutClintService', ['$q', '$http', function ($q, $http) {
   return {

        getAll: function () {

            var deferred = $q.defer();

            $http.get('/api/AboutUs').success(function (data) {
                debugger;
                return deferred.resolve(data);

            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;

        },
        //setclickTarget: function (data) {
        //    debugger
        //    temp = data;
        //},
        getAllCarousel: function (ppId) {

            var deferred = $q.defer();

            $http.get('/api/GetCarouselByName?viewName=' + ppId).success(function (data) {
                debugger;
                return deferred.resolve(data);

            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;

        }

    };
}])

app.factory('NewsClintService', ['$q', '$http', function ($q, $http) {

    var temp;
    return {

        getAll: function () {

            var deferred = $q.defer();

            $http.get('/api/News1').success(function (data) {
                debugger;
                return deferred.resolve(data);

            }).error(function (err) {

                return deferred.reject(err);

            });

            return deferred.promise;

        },
        getClickTarget: function () {
            return temp;
        },
        setClickTarget: function (data) {
            temp = data;
        }

    };
}])

app.factory('TeacherClintService', ['$q', '$http', function ($q, $http) {
   

    return {

        getAll: function () {

            var deferred = $q.defer();

            $http.get('/api/teachers').success(function (data) {
                debugger;
                return deferred.resolve(data);

            }).error(function (err) {

                return deferred.reject(err);

            });

            return deferred.promise;

        },
        getSubject: function () {

            var deferred = $q.defer();

            $http.get('/api/Subjects').success(function (data) {
                
                return deferred.resolve(data);

            }).error(function (err) {

                return deferred.reject(err);

            });

            return deferred.promise;

        },
        getTeacherBySubject: function (ppId) {

            var deferred = $q.defer();

            $http.get('/api/TeachersClient/' + ppId).success(function (data) {

                return deferred.resolve(data);

            }).error(function (err) {

                return deferred.reject(err);

            });

            return deferred.promise;

        },
        getAllCarousel: function (ppId) {

            var deferred = $q.defer();

            $http.get('/api/GetCarouselByName?viewName=' + ppId).success(function (data) {
                debugger;
                return deferred.resolve(data);

            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;

        }
        

    };
}])


app.factory('FrientService', ['$q', '$http', 'User',function ($q, $http, User) {

    
    return {

        getAllInClasses: function () {
            return $http.get('/api/friends?user=' + User.getUserData().username);
        },

        getNewBoard: function (ppObj) {

            return $http.post('/api/MessageBorderClient', ppObj);
        },


        getAll: function () {

            var deferred = $q.defer();

            $http.get('/api/MessageBorderClient').success(function (data) {
                debugger;
                return deferred.resolve(data);

            }).error(function (err) {

                return deferred.reject(err);

            });

            return deferred.promise;

        },

        getOne: function (ppId) {

            var deferred = $q.defer();

            $http.get('/api/MessageBorderClient/' + ppId).success(function (data) {
                debugger;
                return deferred.resolve(data);

            }).error(function (err) {

                return deferred.reject(err);

            });

            return deferred.promise;

        },

    };
}])


app.factory('MessagesService', ['$q', '$http', function ($q, $http) {


    return {

        getBoardByUser:function(ppId){
            var deferred = $q.defer();

            $http.get('/api/MessageBorders?username=' + ppId).success(function (data) {
                debugger;
                return deferred.resolve(data);

            }).error(function (err) {

                return deferred.reject(err);

            });

            return deferred.promise;
        },

        getOne: function (ppId, lut) {

            if (lut == "") return;

            var deferred = $q.defer();

            $http.get('/api/MessageRecords/' + ppId + "?lut=" + lut).success(function (data) {
                debugger;
                return deferred.resolve(data);

            }).error(function (err) {

                return deferred.reject(err);

            });

            return deferred.promise;

        },

        create: function (ppObj) {

            var deferred = $q.defer();

            $http.post('/api/MessageRecords', ppObj).success(function (data) {

                return deferred.resolve(data);

            }).error(function (err) {

                return deferred.reject(err);

            });

            return deferred.promise;

        },

    };
}])


app.factory('UserService', ['$q', '$http', function ($q, $http) {

    var ticket = false;

    return {

        getOne: function (ppObj) {

            var deferred = $q.defer();

            $http.post('/api/MembersClient', ppObj).success(function (data) {

                return deferred.resolve(data);

            }).error(function (err) {

                return deferred.reject(err);

            });

            return deferred.promise;

        },
        getTicket: ticket
    };
}])


app.factory('CalendarService', ['$q', '$http', function ($q, $http) {



    return {

        getAll: function () {

            var deferred = $q.defer();

            $http.get('/api/CalendarsClient').success(function (data) {
                debugger;
                return deferred.resolve(data);

            }).error(function (err) {

                return deferred.reject(err);

            });

            return deferred.promise;

        }
    };
















}])



app.factory('ClassInfoesService', ['$q', '$http', function ($q, $http) {
    return {

        getAll: function () {

            var deferred = $q.defer();

            $http.get('/api/ClassInfoes').success(function (data) {
                debugger;
                return deferred.resolve(data);

            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;

        },
        getAllCarousel: function () {

            var deferred = $q.defer();

            $http.get('/api/ClassInfoes').success(function (data) {
                debugger;
                return deferred.resolve(data);

            }).error(function (err) {
                return deferred.reject(err);
            });
            return deferred.promise;

        }

    };
}])
