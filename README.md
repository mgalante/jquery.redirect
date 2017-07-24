# jQuery.redirect
A simple HTTP POST and GET Redirection Plugin for jQuery

* Easy to use
* GET and POST requests
* Compatible with jQuery, jQlite and Zepto.js
* Supports nested objects and arrays

## How does it work?
The function jQuery.redirect will create a form and populate it with the data (it supports nested values).

## Installation

### Using Bower

 ```bash
bower install jquery.redirect
 ```

### Manually Installation
Just download jquery.rediect.js and include it in your html after jquery.js

 ```html
 <html>
 <head>
     <!-- other headers -->
     <script src="jquery-XXX.js"></script>
     <script src="jquery.redirect.js"></script>
 </head>
 <body>
     <!-- your content -->
 </body>
 </html>
 ```
## CDN
If you prefer, you can use [RawGit CDN hosted version](https://cdn.rawgit.com/mgalante/jquery.redirect/master/jquery.redirect.js)


## Usage
 ```javascript
/**
 * jQuery Redirect
 * @param {string} url - Url of the redirection
 * @param {Object} values - (optional) An object with the data to send. If not present will look for values as QueryString in the target url.
 * @param {string} method - (optional) The HTTP verb can be GET or POST (defaults to POST)
 * @param {string} target - (optional) The target of the form. If you set "_blank" will open the url in a new window.
 * @param {boolean} traditional - (optional) This provides the same function as jquery's ajax function. The brackets are omitted on the field name if its an array.  This allows arrays to work with MVC.net among others.
 * @param {boolean} redirectTop - (optional) If its called from a iframe, force to navigate the top window. 
 */
$.redirect(url, [values, [method, [target, [traditional, [redirectTop]]]]])
 ```


##Example of use

 ```html
 <html>
 <head>
     <!-- other headers -->
     <script src="jquery-XXX.js"></script>
     <script src="jquery.redirect.js"></script>
     <script>
      jQuery(function($){
      //OnClick testButton do a POST to a login.php with user and pasword
       $("#testButton").click(function(){
        $.redirect("/login.php",{ user: "johnDoe", password: "12345"}); 
       });
      }
     </script>
 </head>
 <body>
    <button id="testButton">Test Redirect</button>
 </body>
 </html>
 ```
