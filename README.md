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

### Using NPM

 ```bash
npm install --save jquery.redirect
 ```

### Using Yarn

 ```bash
yarn add jquery.redirect
 ```

### Manual Installation
Just download jquery.redirect.js and include it in your html after jquery.js

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
 * @param {Object} values - (optional) An object with the data to send. If not present it will look for values as QueryString in the target url.
 * @param {string} method - (optional) The HTTP verb can be GET or POST (defaults to POST)
 * @param {string} target - (optional) The target of the form. If you set "_blank" will open the url in a new window.
 * @param {boolean} traditional - (optional) This provides the same function as jquery's ajax function. The brackets are omitted on the field name if its an array.  This allows arrays to work with MVC.net among others.
 * @param {boolean} redirectTop - (optional) If its called from a iframe, force to navigate the top window.
 * @param {boolean} shouldKeepBlankFields - (optional) If shouldKeepBlankFields is false, blank fields will be removed.
 */
$.redirect(url, [values, [method, [target, [traditional, [redirectTop, [shouldKeepBlankFields]]]]]])

/**
* jQuery Redirect
* @param {string} opts - Options object
* @param {string} opts.url - Url of the redirection
* @param {Object} opts.values - (optional) An object with the data to send. If not present will look for values as QueryString in the target url.
* @param {string} opts.method - (optional) The HTTP verb can be GET or POST (defaults to POST)
* @param {string} opts.target - (optional) The target of the form. "_blank" will open the url in a new window.
* @param {boolean} opts.traditional - (optional) This provides the same function as jquery's ajax function. The brackets are omitted on the field name if its an array.  This allows arrays to work with MVC.net among others.
* @param {boolean} opts.redirectTop - (optional) If its called from a iframe, force to navigate the top window.
* @param {boolean} opts.shouldKeepBlankFields - (optional) If shouldKeepBlankFields is false, blank fields will be removed.
*/
$.redirect(opts)
 ```

## Example of use with Object

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
        $.redirect("/login.php", {user: "johnDoe", password: "12345"}, "POST", "_blank");
       });
      });
     </script>
 </head>
 <body>
    <button id="testButton">Test Redirect</button>
 </body>
 </html>
 ```


## Example of use with links

 ```html
 <html>
 <head>
     <!-- other headers -->
     <script src="jquery-XXX.js"></script>
     <script src="jquery.redirect.js"></script>
     <script>
      jQuery(function($){
      //OnClick link do a POST to a login.php with query string
      // data (user and pasword in this case)
       $("body").on("click",".post-redirect", function(){
         $.redirect($(this).attr("href"));
       });
      });
     </script>
 </head>
 <body>
    <a href="/login.php?user=johnDoe&password=12345" class="post-redirect">Test redirect</a>
 </body>
 </html>
 ```


## Running Tests with Yarn

 ```bash
yarn install
yarn test
 ```
