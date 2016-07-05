# ejs
Playing with console errors, experimental project.

### Install
Just include `ejs.js` file in the `<head>` section of your page, before you include any other JavaScript.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="ejs.js"></script> <!-- Script goes here -->
  </head>
  <body>
    Am fancy
  </body>
</html>
```

### What does it do?
Provides JavaScript error details in a readable format. Helpful while developing(not much now tbh), and it's helpful if you want your clients to provide information if they 
face any client side issues, as JS errors are not that friendly :)

### Roadmap (I'll be updating this regularly)
- [x] Enable/Disable debugging mode.
- [x] Add extra parameter to console with a bug report link where stacktrace will be passed as GET params to the desired action/controller where developer can log their bugs.
- [x] Add notifications on the page if exception raises.
- [x] Add stacktrace to these notifications.

...will add some more stuff to make debugging easy.

### Online Demo
[View](https://i-break-codes.github.io/ejs/)

### Support
- Bugs and requests, submit them through the project's issues section
- Questions? DM or Tweet me [@mr_ali3n](https://twitter.com/mr_ali3n)
