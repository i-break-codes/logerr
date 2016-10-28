/**
 * logerr
 *
 * @category   logerr
 * @author     Vaibhav Mehta <vaibhav@decodingweb.com>
 * @copyright  Copyright (c) 2016 Vaibhav Mehta <https://github.com/i-break-codes>
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @version    1.2.1 Stable
 */

window.Logerr = (function Logerr() {
  var setConfig;

  function errorData(e) {
    var filename = e.filename.lastIndexOf('/');
    var datetime = new Date().toString();

    /**
     * userAgent only for POST request purposes, not required in pretty print
     */
    return {
      type: e.type,
      path: e.filename,
      filename: e.filename.substring(++filename),
      line: e.lineno,
      column: e.colno,
      error: e.message,
      stackTrace: ((e.error) ? e.error.stack.toString().replace(/(\r\n|\n|\r)/gm, '') : ''),
      datetime: datetime,
      userAgent: navigator.userAgent || window.navigator.userAgent
    };
  }

  function detailedErrors(e) {
    var i = errorData(e);
    var helpPath = encodeURI('https://stackoverflow.com/search?q=' + i.error.split(' ').join('+'));

    var str = [
      '%cType: %c' + i.type,
      '%cError: %c' + i.error,
      '%cStackTrace: %c' + i.stackTrace,
      '%cFile Name: %c' + i.filename,
      '%cPath: %c' + i.path,
      '%cLine: %c' + i.line,
      '%cColumn: %c' + i.column,
      '%cDate: %c' + i.datetime,
      '%cDebug : %c' + i.path + ':' + i.line,
      '%cGet Help: %c' + helpPath
    ].join('\n');

    if (window.chrome) {
      /* eslint-disable max-len */
      console.log(str, 'font-weight: bold;', 'color: #e74c3c;', 'font-weight: bold;', 'font-weight: normal; color: #e74c3c;', 'font-weight: bold;', 'font-weight: normal; color: #e74c3c;', 'font-weight: bold;', 'font-weight: normal;', 'font-weight: bold;', 'font-weight: normal;', 'font-weight: bold;', 'font-weight: normal;', 'font-weight: bold;', 'font-weight: normal;', 'font-weight: bold;', 'font-weight: normal;', 'font-weight: bold;', 'font-weight: normal;', 'font-weight: bold;', 'font-weight: normal; color: #3498db;');
      /* eslint-enable max-len */
    } else {
      console.log(str.replace(/%c/gi, ''));
    }
  }

  function serializeData(params) {
    function encodeKey(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
    }

    return Object.keys(params).map(encodeKey).join('&');
  }

  function remoteLogging(e, remoteSettings) {
    if (!remoteSettings.url) {
      throw new Error('Provide remote URL to log errors remotely');
    } else if (
      remoteSettings.additionalParams &&
      typeof remoteSettings.additionalParams !== 'object'
      ) {
      throw new Error('Invalid data type, additionalParams should be a valid object');
    }

    var http = new XMLHttpRequest();
    var url = remoteSettings.url;
    var data = errorData(e);
    var setData = Object.assign(data, remoteSettings.additionalParams);
    var params = serializeData(setData);

    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.send(params);

    http.onreadystatechange = function onreadystatechange() {
      if (http.readyState === 4 && http.status === 200) {
        if (http.readyState === XMLHttpRequest.DONE) {
          if (remoteSettings.successCallback) {
            remoteSettings.successCallback();
          }
        } else {
          if (remoteSettings.errorCallback) {
            remoteSettings.errorCallback();
          } else {
            throw new Error('Remote error logging failed!');
          }
        }
      }
    };
  }

  function listener(e) {
    if (setConfig.detailedErrors) {
      detailedErrors(e);
    }

    if (setConfig.remoteLogging) {
      remoteLogging(e, setConfig.remoteSettings);
    }
  }

  // Polyfill for Object.assign
  if (typeof Object.assign !== 'function') {
    Object.assign = function assign(target) {
      if (target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var newTarget = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== null) {
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              newTarget[key] = source[key];
            }
          }
        }
      }
      return newTarget;
    };
  }

  function init(userConfig) {
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
    };

    // Override with user config
    setConfig = Object.assign(config, userConfig || {});

    // Remove current listener
    window.removeEventListener('error', listener);

    // Listen to errors
    window.addEventListener('error', listener);
  }

  return {
    init: init
  };
}());
