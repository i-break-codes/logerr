# logerr
Logerr or Log Error. Playing with console errors, experimental project. Developing for Chrome, might fail on other browsers as of now.

#### Online Demo
[View](https://i-break-codes.github.io/logerr/) (Don't forget to open your dev console)

#### What does it do?
Provides JavaScript error details in a readable format. Recently added a feature where developers can log messages on their remote server by enabling `remoteLogging` feature of logerr. By enabling `remoteLogging`, logerr will send a post request to desired action/url with JavaScript error details along with custom parameters if required.

#### Add lib via Bower
> bower install logerr

For more information on [bower](https://bower.io/).

Or just download `logerr.js` manually and follow the setup instructions below.

#### Setup
Just include `logerr.js` file in the `<head>` section of your page, before you include any other JavaScript. To initialize logerr, use `Logerr.init()`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="logerr.js"></script> <!-- path will be different is using bower -->
	<script>
	  Logerr.init();
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

Logerr.init({
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
- [✓] Enable/Disable detailedErrors mode in console.
- [✓] Remote logging
- [✗] Add extra parameter to console with a bug report link where stacktrace will be passed as GET params to the desired action/controller where developer can log their bugs.
- [✗] Add notifications on the page if exception raises.
- [✗] Add stacktrace to these notifications.

...will add some more stuff to make debugging easy.

#### Support
- Bugs and requests, submit them through the project's issues section
- Questions? DM or Tweet me [@mr_ali3n](https://twitter.com/mr_ali3n)
