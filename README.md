![alt tag](http://i.imgur.com/rVWDzcC.png)

Logerr or Log Error. Playing with console errors, experimental project. Started developing for Chrome but now it supports Internet Explorer as well as Edge.

#### Online Demo
[View](https://i-break-codes.github.io/logerr/) (Don't forget to open your dev console)

---

#### What does it do?
Provides JavaScript error details in a readable format. You can log these errors remotely by enabling `remoteLogging`. After enabling, logerr will send a post request to the desired action/url with exception details along with custom parameters (if provided using `additionalParams`).

---

#### Install via :-

#### CDN
**Development [Unminified]**
> https://cdnjs.cloudflare.com/ajax/libs/logerr/1.2.0/logerr.js

**Production [Minified]**
> https://cdnjs.cloudflare.com/ajax/libs/logerr/1.2.0/logerr.min.js

#### [Bower](https://bower.io/)
> bower install logerr

#### Manually

Download `logerr.js` and follow the setup instructions below.

---

#### Setup
Just include `logerr.js` file and the `init()` i.e initializer in the `<head>` section of your page, before you include any other JavaScript. `init()` will initialize the lib, where later you can pass an object to customize.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="logerr.js"></script>
	<script>
	  Logerr.init();
	</script>
  </head>
  <body>
    Am fancy
  </body>
</html>
```

---

#### Enable remote logging
> Make sure you have CORS enabled if logging cross-domain.

```javascript
//Request type is POST

Logerr.init({
  remoteLogging: true, //Checkout https://github.com/i-break-codes/logerr-remote
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

Also checkout Logerr Remote to log these exceptions remotely. (Powered by NodeJS)

[View](https://github.com/i-break-codes/logerr-remote)


---

#### Default Configuration & Datatypes
```javascript
detailedErrors: true          //Boolean true/false, optional
remoteLogging: false          //Boolean true/false, optional
remoteSettings: {             //Object {}, required if remoteLogging is set to true
  url: null,                  //String '', required if remoteLogging is set to true
  additionalParams: null,     //Object {}, optional
  successCallback: null,      //function() {}, optional
  errorCallback: null         //function() {}, optional
}

```

---

#### Roadmap
- [✓] Enable/Disable detailedErrors mode in console.
- [✓] Remote logging by sending post request
- [✓] Cross browser support (Partially fixed)
- [✗] Add notifications on the page if any exception. (in progress)

...will add some more stuff to make debugging easy.

---

#### Support
- Bugs and requests, submit them through the project's issues section
- Questions? DM or Tweet me [@mr_ali3n](https://twitter.com/mr_ali3n)

Thanks to all contributors, stargazers, pr's, issue submissions for suggesting features and making this more awesome.
