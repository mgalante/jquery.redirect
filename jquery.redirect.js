/*
jQuery Redirect v1.0

Copyright (c) 2013-2015 Miguel Galante
Copyright (c) 2011-2013 Nemanja Avramovic, www.avramovic.info

Licensed under CC BY-SA 4.0 License: http://creativecommons.org/licenses/by-sa/4.0/

This means everyone is allowed to:

Share - copy and redistribute the material in any medium or format
Adapt - remix, transform, and build upon the material for any purpose, even commercially.
Under following conditions:

Attribution - You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
ShareAlike - If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

*/


(function($){
/**
 * jQuery Redirect
 * @param {string} url - Url of the redirection
 * @param {Object} values - (optional) An object with the data to send. If not present will look for values as QueryString in the target url.
 * @param {string} method - (optional) The HTTP verb can be GET or POST (defaults to POST)
 * @param {string} target - (optional) The target of the form. If you set "_blank" will open the url in a new window.
 */
'use strict';
	$.redirect = function( url, values, method, target) {
		method = (method && method.toUpperCase() == 'GET') ? 'GET' : 'POST';

		if (!values)
		{
			var obj = $.parse_url(url);
			url = obj.url;
			values = obj.params;
		}

		var form = $('<form>').attr({
			method: method,
			action: url,
			target: target
		});

		iterateValues(values, [], form);
		$('body').append(form);

		form.submit();
	};

	//Utility Functions
	$.parse_url = function(url)
	{
		if (url.indexOf('?') == -1){
			return { url: url, params: {} };
		}
		var parts = url.split('?'),
			query_string = parts[1],
			elems = query_string.split('&');
		url = parts[0];

		var obj = {};
		for (var i in elems)
		{
			var pair = elems[i].split('=');
			obj[pair[0]] = pair[1];
		}

		return {url: url, params: obj};
	}; 
	
	//Private Functions
	var getInput = function(name, value, parent) {
		var parentString;
		if( parent.length > 0 ) {
			parentString = parent[0];
			for(var i = 1; i < parent.length; ++i){
				parentString += "[" + parent[i] + "]";
			}
			name = parentString + "[" + name + "]";
		}

		return $("<input>").attr({
			type: "hidden",
			name: name,
			value: value
		});
	};

	var iterateValues = function(values, parent, form) {
		var iterateParent = [];
		for(var i in values)
		{
			if( typeof values[i] == "object" ) {
				iterateParent = parent.slice();
				iterateParent.push(i);
				iterateValues(values[i], iterateParent, form);
			} else {
				getInput(i, values[i], parent).appendTo(form);
			}
		}
	};
})(jQuery);
