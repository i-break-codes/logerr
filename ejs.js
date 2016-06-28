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
    
    var str = "%cType: %c" + i.type
            + "\n%cError: %c" + i.error
            + "\n%cFile Name: %c" + i.filename
            + "\n%cPath: %c" + i.path
            + "\n%cLine: %c" + i.line
            + "\n%cColumn: %c" + i.column
            + "\n%cDate: %c" + i.datetime
            + "\n%cDebug : %c" + i.path + ':' + i.line
              "\n%cGet Help: " + "%c" + helpPath;
  
    console.log(str, "font-weight: bold;", "color: #e74c3c;", "font-weight: bold;", "font-weight: normal; color: #e74c3c;", "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal;",  "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal; color: #3498db;");
  }
  
  return {
    listener: listener
  }
}();

Error.listener();