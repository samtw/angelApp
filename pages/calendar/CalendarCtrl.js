app.controller('CalendarCtrl', ['$state', '$scope', '$ionicModal', 'CalendarService', function ($state, $scope, $ionicModal, CalendarService) {
    debugger
    console.log('$scope: ', $scope);

    var events = [];
    var eventDetail = [];
    $scope.vm = {
        selectDate: null
    }
    CalendarService.getAll().then(function (data) {

        eventDetail = data;

        for (var i = 0; i <= data.length - 1 ; i++) {
            var tempDatw = new Date(data[i].StartTime);
            debugger;
            events.push(+new Date(tempDatw.getFullYear(), tempDatw.getMonth(), tempDatw.getDate()))
        }

        $scope.options = {
            value: new Date(),
            dates: events,
            month: {
                // template for dates in month view
                content: '# if ($.inArray(+data.date, data.dates) != -1) { #' +
                            '<div class="' +
                               '# if (data.value < 10) { #' +
                                   "exhibition" +
                               '# } else if ( data.value < 20 ) { #' +
                                   "party" +
                               '# } else { #' +
                                   "cocktail" +
                               '# } #' +
                            '">#= data.value #</div>' +
                         '# } else { #' +
                         '#= data.value #' +
                         '# } #'
            }
        };
    })


    

    $scope.$watch("vm.selectDate", function (val,gh) {
       
        console.log('selectDate: ', val);
        if (val == null) return;
        var dayEvents = [];

        for (var i = 0; i < eventDetail.length; i++) {
            var valStr = new Date(val).yyyymmdd();
            var itemStr = new Date(eventDetail[i].StartTime).yyyymmdd();
            if (valStr == itemStr) {
                dayEvents.push(eventDetail[i]);
            }
        }
        $scope.eventList = dayEvents;
        debugger;
        //var maxEndDate = new Date(val);
        //maxEndDate.setDate(maxEndDate.getDate() + 14);
        //$scope.maxEndDate = maxEndDate;
        //delete $scope.endDate;
    }, true);

    // Upload Modal
    $ionicModal.fromTemplateUrl('/App/pages/calendar/upload.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function (data) {
        $scope.vm2 = data;
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

    function sqlToJsDate(sqlDate) {
        debugger;
        //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
        var sqlDateArr1 = sqlDate.split("-");
        //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
        var sYear = sqlDateArr1[0];
        var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
        var sqlDateArr2 = sqlDateArr1[2].split("T");
        //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
        var sDay = sqlDateArr2[0];
        var sqlDateArr3 = sqlDateArr2[1].split(":");
        //format of sqlDateArr3[] = ['hh','mm','ss.ms']
        var sHour = sqlDateArr3[0];
        var sMinute = sqlDateArr3[1];
        var sqlDateArr4 = sqlDateArr3[2].split(".");
        //format of sqlDateArr4[] = ['ss','ms']
        var sSecond = sqlDateArr4[0];
        var sMillisecond = sqlDateArr4[1];

        return new Date(sYear, sMonth, sDay, sHour, sMinute);
        //return new Date(sYear, sMonth, sDay, sHour, sMinute, sSecond, sMillisecond);
    }
}]);
