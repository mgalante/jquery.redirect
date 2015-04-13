# jQuery.redirect
A simple HTTP POST and GET Redirection Plugin for jQuery

* Easy to use
* GET and POST requests
* Works in any WebBrowser
* Supports nested objects and arrays


## Usage:
 ```
$.redirect(target, [values, [method]])
target: url to redirect
values: an object with the data to send. If not present will look for values as QueryString in the target url.
method: POST or GET. defaults to POST. 
 ```

## How does it work?
The function jQuery.redirect will create a form and populate it with the data (it supports nested values).
