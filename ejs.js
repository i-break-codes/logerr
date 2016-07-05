'use strict';

var Error = function() {
  function listener() {
    window.addEventListener('error', function(e) {
      _errorData(e);
    });
  }

  function _errorData(e) {
    var filename = e.filename.lastIndexOf('/');
    var datetime = new Date();

    var data = {
      type: e.type,
      path: e.filename,
      filename: e.filename.substring(++filename),
      line: e.lineno,
      column: e.colno,
      error: e.message,
      datetime: datetime
    }

    _formatError(data);
  }

  function _formatError(errorInfo) {
    var i = errorInfo;
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

  return {
    listener: listener
  }
}();

Error.listener();

var test = a + 1;