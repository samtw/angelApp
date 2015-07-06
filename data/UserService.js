'use strict';

app.service('User', ['$http', '$window', function ($http, $window) {
    function NoAuthenticationException(message) {
      this.name = 'AuthenticationRequired';
      this.message = message;
    }

    function NextStateUndefinedException(message) {
      this.name = 'NextStateUndefined';
      this.message = message;
    }

    function AuthenticationExpiredException(message) {
      this.name = 'AuthenticationExpired';
      this.message = message;
    }

    function AuthenticationRetrievalException(message) {
      this.name = 'AuthenticationRetrieval';
      this.message = message;
    }

    var userData = {
      isAuthenticated: false,
      username: '',
      bearerToken: '',
      expirationDate: null
    };

    var nextState = {
      name: '',
      error: ''
    };

    function isAuthenticationExpired(p_expirationDate) {
      var now = new Date();
      var expirationDate = new Date(p_expirationDate);
      if (expirationDate.getTime() > now.getTime()) {
        return false;
      } else {
        return true;
      }
    }

    function saveData() {
      removeData();
      $window.localStorage.setItem('auth_data', JSON.stringify(userData));
    }

    function removeData() {
        $window.localStorage.removeItem('auth_data');
    }

    function retrieveSavedData() {
        var _savedData = $window.localStorage["auth_data"];
        var savedData = JSON.parse(_savedData);
      if (typeof savedData === 'undefined') {
        throw new AuthenticationRetrievalException('No authentication data exists');
      } else if (isAuthenticationExpired( (savedData.expirationDate))) {
        throw new AuthenticationExpiredException('Authentication token has already expired');
      } else {
        userData = savedData;
        setHttpAuthHeader();
      }
    }

    function clearUserData() {
      userData.isAuthenticated = false;
      userData.username = '';
      userData.bearerToken = '';
      userData.expirationDate = null;
    }

    function setHttpAuthHeader() {
      $http.defaults.headers.common.Authorization = 'Bearer ' + userData.bearerToken;
    }

    this.isAuthenticated = function() {
      if (userData.isAuthenticated && !isAuthenticationExpired(userData.expirationDate)) {
        return true;
      } else {
        try {
          retrieveSavedData();
        } catch (e) {
          throw new NoAuthenticationException('Authentication not found');
        }
        return false;
      }
    };

    this.getNextState = function() {
      if (nextState.name === '') {
        throw new NextStateUndefinedException('No state data was set');
      } else {
        return nextState;
      }
    };

    this.setNextState = function(name, error) {
      nextState.name = name;
      nextState.error = error;
    };

    this.clearNextState = function() {
      nextState.name = '';
      nextState.error = '';
    };

    this.getUserData = function(){
      return userData;
    };

    this.removeAuthentication = function() {
      removeData();
      clearUserData();
      $http.defaults.headers.common.Authorization = null;
    };

    this.authenticate = function (username, password, successCallback, errorCallback, persistData) {

      var url = '/token';

      this.removeAuthentication();
      var config = {
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: 'grant_type=password&username=' + username + '&password=' + password,
      };

      $http(config)
        .success(function(data) {
          userData.isAuthenticated = true;
          userData.username = data.userName;
          userData.bearerToken = data.access_token;
          userData.expirationDate = new Date(data['.expires']);
          setHttpAuthHeader();
          if (persistData === true) {
            saveData();
          }
          if (typeof successCallback === 'function') {
            successCallback();
          }
        })
        .error(function(data) {
          if (typeof errorCallback === 'function') {
            if (data.error_description) {
              errorCallback(data.error_description);
            } else {
              errorCallback('Unable to contact server; please, try again later.');
            }
          }
        });
    };
  }]);
