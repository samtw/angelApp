// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var app = angular.module('icdtAngel', ['ionic', 'kendo.directives']);


app.value('$', $);

app.run(['$ionicPlatform', 'SignalrService', '$ionicLoading', '$rootScope', '$state', 'User', function ($ionicPlatform, SignalrService, $ionicLoading, $rootScope, $state, User) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }


    });
    // 一進站新看localStorage內有沒有登入資訊
    try {
        User.isAuthenticated();
        $rootScope.username = User.getUserData().username;
        if ($rootScope.username != null) {
            SignalrService.initialize();
        }
    } catch (e) {
        // do nothing with this error
    }
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        //console.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
        //console.log('fromState: ', fromState);

        if (fromState.name == 'app.login.communicationBoard') {
            $rootScope.currentMessageborderId = null;
        }

        
        // 跳轉每一個頁面時必定觸發 loading
        //$ionicLoading.show({ template: 'Loading...' });
    });

    // 若未驗證成功會有stateChangeError, 判斷error名字，轉到登入會面
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        if (error.name === 'AuthenticationRequired') {
            //User.setNextState(toState.name, 'You must login to access this page');
            //alert("Login error, pls check user/pass");
            $state.go('app.loginIndex', {}, { reload: true });
        }
    });

    
    $rootScope.currentMessageborderId = null;
    $rootScope.beClickedNewsDate;


}]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "pages/sidemenu.html",
            controller: ''
        })
      .state('app.landing', {
          url: "",
          views: {
              menuContent: {
                  templateUrl: "pages/landing.html",
                  controller: 'LandingCtrl'
              }
          }
      })
        .state('app.main', {
            url: "",
            views: {
                menuContent: {
                    templateUrl: "pages/main/main.html",
                    controller: 'MainCtrl'
                }
            }
        })
     .state('app.teachers', {
         url: "/Teachers",
         views: {
             menuContent: {
                 templateUrl: "pages/teachers/Teachers.html",
                 controller: 'TeacherCtrl'
             }
         }
     })
    .state('app.teacherDetail', {
        url: "/Teachers/:id",
        views: {
            menuContent: {
                templateUrl: "pages/teachers/TeacherDetail.html",
                controller: 'TeacherDetailCtrl'
            }
        }
    })
    .state('app.loginIndex', {
        url: "/Index",
        views: {
            menuContent: {
                templateUrl: "pages/login/Index.html",
                controller: 'LoginCtrl'
            }
        }
    })
     .state('app.login.ForgetIndex', {
         url: '/login/ForgetIndex',
         templateUrl: 'pages/login/ForgetIndex.html',
         controller: ''
     })
    .state('app.login', {
        abstract: true,
        url: "",
        views: {
            menuContent: {
                template: "<ion-nav-view></ion-nav-view>",
                controller: ''
            }
        },
        resolve: {
            user: 'User',
            authenticationRequired: ['user', function (user) {
                user.isAuthenticated();
            }]
        }
    })


    .state('app.login.friends', {
        url: "/friends",
        templateUrl: "pages/friends/Friends.html",
        controller: 'FriendCtrl'
    })

        .state('app.login.messageboard', {
            url: "/messageboard",

            templateUrl: "pages/messageboard/messageboards.html",
            controller: 'messageBorderCtrl'

        })
          .state('app.login.communicationBoard', {
              url: "/communication/:id",
              templateUrl: "pages/messageboard/communicationBoard.html",
              controller: 'MessagesCtrl'

          })
        .state('app.login.calendar', {
              url: "/calendar",

                      templateUrl: "pages/calendar/Calendars.html",
                      controller: 'CalendarCtrl'
                 
          })


    .state('app.icdtinfo', {
        url: "/about",
        views: {
            menuContent: {
                templateUrl: "pages/about/About.html",
                controller: 'AboutCtrl'
            }
        }
    })
     .state('app.DetailInfo', {
         url: "/us",
         views: {
             menuContent: {
                 templateUrl: "pages/about/DetailInfo.html",
                 controller: 'DetailInfoCtrl',

             }
         }
     })

    .state('app.ClassInfoesIntro', {
        url: "/sub",
        views: {
            menuContent: {
                templateUrl: "pages/about/DetailInfo.html",
                controller: 'ClassInfoesIntroCtrl',

            }
        }
    })
        .state('app.CompanyTarget', {
            url: "/about",
            views: {
                menuContent: {
                    templateUrl: "pages/about/DetailInfo.html",
                    controller: 'CompanyTargetCtrl'
                }
            }
        })
    .state('app.news', {
        url: "/news",
        views: {
            menuContent: {
                templateUrl: "pages/news/News.html",
                controller: 'NewsCtrl'
            }
        }
    })
    .state('app.newsDetail', {
        url: "/news",
        views: {
            menuContent: {
                templateUrl: "pages/news/newsDetail.html",
                controller: 'NewsDeatailCtrl'
            }
        }
    })

         .state('app.map', {
             url: "/map",
             views: {
                 menuContent: {
                     templateUrl: "pages/map/map.html",
                     controller: 'MapCtrl'
                 }
             }
         })


    ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app');
});


app.controller('LandingCtrl', ['$scope', '$state', '$timeout', '$rootScope', function ($scope, $state, $timeout, $rootScope) {

    $timeout(function () {
        $state.go('app.main');
    }, 1000);

    $rootScope.inMain = false;
    //$scope.goToMain = function () {
    //    $state.go('app.main');
    //};

}]);


app.controller('footerCtrl', ['$state', '$scope', '$ionicHistory', function ($state, $scope, $ionicHistory) {
    $scope.goThome = function () {
        //用來清除BACK按鈕與取消返回動畫
        $ionicHistory.nextViewOptions(
            {
                disableBack: true,
                disableAnimate: true,
                historyRoot: true
            }
        );
        $state.go('app.main');
    }

    $scope.goToMap = function () {
        //用來清除BACK按鈕與取消返回動畫
        $ionicHistory.nextViewOptions(
            {
                disableBack: true,
                disableAnimate: true,
                historyRoot: true
            }
        );
        $state.go('app.map');
    }






}]);