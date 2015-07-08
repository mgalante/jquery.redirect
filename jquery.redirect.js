/* 
JQuery Redirect v1.0

Originaly created by Nemanja Avramovic, www.avramovic.info 
Forked and mantained by Miguel Galante

Licensed under CC BY-SA 4.0 License: http://creativecommons.org/licenses/by-sa/4.0/

This means everyone is allowed to:

Share — copy and redistribute the material in any medium or format
Adapt — remix, transform, and build upon the material for any purpose, even commercially.
Under following conditions:

Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
ShareAlike — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

*/


;(function( $ ){
/**
 * jQuery Redirect
 * @param {string} target - Url of the redirection
 * @param {Object} values - (optional) An object with the data to send. If not present will look for values as QueryString in the target url.
 * @param {string} method - (optional) The HTTP verb can be GET or POST (defaults to POST)
 */
	$.redirect = function( target, values, method ) {  
		method = (method && method.toUpperCase() == 'GET') ? 'GET' : 'POST';
			
		if (!values)
		{
			var obj = $.parse_url(target);
			target = obj.url;
			values = obj.params;
		}
					
		var form = $('<form>').attr({
			method: method,
			action: target
		});
		
		iterateValues(values, [], form);
		$('body').append(form);
		form.submit();
	};

//Private Functions	
	$.parse_url = function(url)
	{
		if (url.indexOf('?') == -1)
			return { url: url, params: {} }
			
		var parts = url.split('?'),
			url = parts[0],
			query_string = parts[1],
			elems = query_string.split('&'),
			obj = {};
		
		for(var i in elems)
		{
			var pair = elems[i].split('=');
			obj[pair[0]] = pair[1];
		}

		return {url: url, params: obj};		
	}  	
		var getInput = function(name, value, parent) {
		var parentString;
		if( parent.length > 0 ) {
			parentString = parent[0];
			for( var i = 1; i < parent.length; ++i ) {
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

})( jQuery );
