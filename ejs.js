'use strict';

var Error = function() {
  
  function init(userConfig = {}) {
  
    // Default configuration
    var config = {
      detailedErrors: true,
      remoteLogging: false,
      remoteSettings: {
        url: null,
        additionalParams: null,
        successCallback: null,
        errorCallback: null
      }
    }
    
    // Override with user config
    var setConfig = Object.assign(config, userConfig);
    
    // Listen to errors
    window.addEventListener('error', function(e) {
      if(setConfig.detailedErrors) {
        _detailedErrors(e);
      }
      
      if(setConfig.remoteLogging) {
        _remoteLogging(e, setConfig.remoteSettings);
      }
    });
  }
  
  // NOTE: Private
  
  function _detailedErrors(e) {
    _formatError(e);
  }

  function _formatError(e) {
    var i = _errorData(e);
    var helpPath = encodeURI("https://stackoverflow.com/search?q=" + i.error.split(' ').join('+'));

    var str = [
      "%cType: %c" + i.type,
      "%cError: %c" + i.error,
      "%cFile Name: %c" + i.filename,
      "%cPath: %c" + i.path,
      "%cLine: %c" + i.line,
      "%cColumn: %c" + i.column,
      "%cDate: %c" + i.datetime,
      "%cDebug : %c" + i.path + ':' + i.line,
      "%cGet Help: " + "%c" + helpPath
    ].join("\n");

    console.log(str, "font-weight: bold;", "color: #e74c3c;", "font-weight: bold;", "font-weight: normal; color: #e74c3c;", "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal; color: #3498db;");
  }
  
  function _remoteLogging(e, remoteSettings) {
    if(!remoteSettings.url) {
      throw 'Provide remote URL to log errors remotely';
      return false;
    } else if(remoteSettings.additionalParams && typeof remoteSettings.additionalParams !== 'object') {
      throw 'Invalid data type, additionalParams should be a valid object';
      return false;
    }
    
    var http = new XMLHttpRequest();
    var url = remoteSettings.url;
    var data = _errorData(e);
    var setData = Object.assign(data, remoteSettings.additionalParams);
    var params = _serializeData(setData);
    
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(params);

    http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
        if (http.readyState == XMLHttpRequest.DONE) {
          if(remoteSettings.successCallback) {
            remoteSettings.successCallback();
          }
        } else {
          if(remoteSettings.errorCallback) {
            remoteSettings.errorCallback();
          } else {
            throw 'Remote error logging failed!';
          }
        }
      }
    }
  }
  
  function _serializeData(params) {
    return Object.keys(params).map(function(k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
    }).join('&');
  }
  
  function _errorData(e) {
    var filename = e.filename.lastIndexOf('/');
    var datetime = new Date().toString();

    return {
      type: e.type,
      path: e.filename,
      filename: e.filename.substring(++filename),
      line: e.lineno,
      column: e.colno,
      error: e.message,
      datetime: datetime
    }
  }

  return {
    init: init
  }
}();

Error.init({
  remoteLogging: true,
  remoteSettings: {
    url: 'http://localhost:4000/push/local'
  }
});