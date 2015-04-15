# jQuery.redirect
A simple HTTP POST and GET Redirection Plugin for jQuery

* Easy to use
* GET and POST requests
* Works in any WebBrowser
* Supports nested objects and arrays


## Usage:
 ```javascript
/**
 * jQuery Redirect
 * @param {string} target - Url of the redirection
 * @param {Object} values - (optional) An object with the data to send. If not present will look for values as QueryString in the target url.
 * @param {string} method - (optional) The HTTP verb can be GET or POST (defaults to POST)
 */
$.redirect(target, [values, [method]])

 ```

## How does it work?
The function jQuery.redirect will create a form and populate it with the data (it supports nested values).
