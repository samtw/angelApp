﻿

app.controller('MapCtrl', function ($scope, $ionicLoading, $compile) {

    function initialize() {

        //var myLatlng = null;
        //var myLatlng = new google.maps.LatLng(22.6579411, 120.28010540000002);


        navigator.geolocation.getCurrentPosition(
          function success(position) {


              var myLatlng = new google.maps.LatLng(position.coords.latitude,
                                                position.coords.longitude);

              var mapOptions = {
                  center: myLatlng,
                  zoom: 16,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
              };
              var map = new google.maps.Map(document.getElementById("map"),
                  mapOptions);

              //Marker + infowindow + angularjs compiled ng-click
              var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
              var compiled = $compile(contentString)($scope);

              var infowindow = new google.maps.InfoWindow({
                  content: compiled[0]
              });

              var marker = new google.maps.Marker({
                  position: myLatlng,
                  map: map,
                  title: 'Uluru (Ayers Rock)'
              });

              google.maps.event.addListener(marker, 'click', function () {
                  infowindow.open(map, marker);
              });



          },
          function fail(err) {
              console.log('geolocation not work' + '\n' + err);
              console.log('isReady: ' + $scope.mapIsReady);
          }
        );
    }

    $scope.centerOnMe = function () {
        if (!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function (pos) {
            $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            $scope.loading.hide();
        }, function (error) {
            alert('Unable to get location: ' + error.message);
        });
    };

    $scope.clickTest = function () {
        alert('Example of infowindow with ng-click')
    };

    google.maps.event.addDomListener(window, 'load', initialize);
    initialize();
});