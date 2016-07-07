# ejs
Playing with console errors, experimental project. Developing for Chrome, might fail on other browsers as of now.

#### What does it do?
Provides JavaScript error details in a readable format. Recently added a feature where developers can log messages on their remote server by enabling `remoteLogging` feature of ejs. By enabling `remoteLogging`, ejs will send a post request to desired action/url with JavaScript error details along with custom parameters if required.

#### Install
Just include `ejs.js` file in the `<head>` section of your page, before you include any other JavaScript.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="ejs.js"></script>
	<script>
	  Error.init();
	</script>
  </head>
  <body>
    Am fancy
  </body>
</html>
```

#### Enable remote logging
> Make sure you have CORS enabled if logging cross-domain.

```javascript
//Request type is POST

Error.init({
  remoteLogging: true,
  remoteSettings: {
    url: 'REMOTE_URL',
    additionalParams: {
      logged_by: 'Sam'
    },
    successCallback: function () {
      console.log('Im logged.');
    },
    errorCallback: function () {
      console.log('Err! Something went wrong.');
    }
  }
});
```

#### Default Configuration & Datatypes
```javascript
detailedErrors: true          //Boolean true/false, Optional
remoteLogging: false          //Boolean true/false, Optional
remoteSettings: {             //Object {}, required if remoteLogging is set to true
  url: null,                  //String '', required if remoteLogging is set to true
  additionalParams: null,     //Object {}, optional
  successCallback: null,      //function() {}, optional
  errorCallback: null         //function() {}, optional
}

```

#### Roadmap
- [✓] Enable/Disable debugging mode.
- [✓] Remote logging
- [✗] Add extra parameter to console with a bug report link where stacktrace will be passed as GET params to the desired action/controller where developer can log their bugs.
- [✗] Add notifications on the page if exception raises.
- [✗] Add stacktrace to these notifications.

...will add some more stuff to make debugging easy.

#### Online Demo
[View](https://i-break-codes.github.io/ejs/)

#### Support
- Bugs and requests, submit them through the project's issues section
- Questions? DM or Tweet me [@mr_ali3n](https://twitter.com/mr_ali3n)
