/*
jQuery Redirect v1.0.5

Copyright (c) 2016-2019 Luigi Cangiano
Copyright (c) 2013-2016 Miguel Galante
Copyright (c) 2011-2013 Nemanja Avramovic, www.avramovic.info

Licensed under CC BY-SA 4.0 License: http://creativecommons.org/licenses/by-sa/4.0/

This means everyone is allowed to:

Share - copy and redistribute the material in any medium or format
Adapt - remix, transform, and build upon the material for any purpose, even commercially.
Under following conditions:

Attribution - You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
ShareAlike - If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

*/
(function ($) {
    'use strict';

    /**
     * jQuery Redirect
     * @param {string} url - Url of the redirection
     * @param {Object} values - (optional) An object with the data to send. If not present will look for values as QueryString in the target url.
     * @param {string} method - (optional) The HTTP verb can be "get" or "post" (defaults to "post")
     * @param {string} target - (optional) The target of the form. Accepted values are "_blank", "_self", "_parent", "_top" or "<framename>". "_blank" will open the url in a new window. (defaults to "_self"). Cfr: https://www.w3schools.com/tags/att_form_target.asp
	 * @param {string} enctype - (optional) The enctype attribute specifies how the form-data should be encoded when submitting it to the server. Accepted values are "application/x-www-form-urlencoded", "multipart/form-data" or "text/plain". (defaults to "application/x-www-form-urlencoded"). Cfr: https://www.w3schools.com/tags/att_form_enctype.asp
     * @param {boolean} traditional - (optional) This provides the same function as jquery's ajax function. The brackets are omitted on the field name if its an array.  This allows arrays to work with MVC.net among others.
     */
    $.redirect = function (url, values, method, target, enctype, traditional) {
		if($.type(url) !== "string")
			$.error("Parameter 'url' is not a string.");
		if(url.trim().length <= 0)
			$.error("Parameter 'url' is an empty string.");
		url = url.trim();
		values = $.type(values) === "object" ? values : {};
        method = ($.type(method) === "string" && ["get", "post", "put", "delete"].indexOf(method.toLowerCase()) !== -1) ? method.toLowerCase() : 'post';
		target = $.type(target) === "string" ? (["_blank", "_self", "_parent", "_top"].indexOf(target.toLowerCase()) !== -1 ? target.toLowerCase() : target) : '_self';
		enctype = ($.type(enctype) === "string" && ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"].indexOf(enctype.toLowerCase()) !== -1) ? enctype.toLowerCase() : 'application/x-www-form-urlencoded';
		traditional = $.type(traditional) === "boolean" ? traditional : false;

        url = url.split("#");
        var hash = url[1] ? ("#" + url[1]) : "";
		var parsed = $.parseUrl(url[0]);
		url = parsed.url;
		values = $.extend(true, {}, parsed.params, values);

        var form = $('<form>')
			.attr("method", method)
			.attr("action", url + hash)
			.attr("target", target);

		if(method === "post")
			form.attr("enctype", enctype);

        var submit = {}; //Create a symbol
        form[0][submit] = form[0].submit;
        iterateValues(values, [], form, null, traditional);
        $('body').append(form);
        form[0][submit]();
    };

    //Utility Functions
    /**
     * Url and QueryString Parser.
     * @param {string} url - a Url to parse.
     * @returns {object} an object with the parsed url with the following structure {url: URL, params:{ KEY: VALUE }}
     */
    $.parseUrl = function (url) {
		if($.type(url) !== "string")
			$.error("Parameter 'url' is not a string.");
		url = url.trim();

		var back = {
			url: url,
			params: {}
		};

		if (url.indexOf('?') !== -1) {
			var parts = url.split('?'),
				query_string = parts[1],
				couples = query_string.split('&');
			back['url'] = parts[0];

			var pair = {};
			for (var i = 0; i < couples.length; i++) {
				pair = couples[i].split('=');
				back['params'][pair[0]] = pair[1];
			}
		}

        return back;
    };

    //Private Functions
    var getInput = function (name, value, parent, array, traditional) {
		var back = $('<input>')
			.attr("type", "hidden")
			.attr("name", name)
			.attr("value", value);

        if(parent.length > 0) {
            var parentString = parent[0];
            for(var i = 1; i < parent.length; i++)
                parentString += "[" + parent[i] + "]";

            if(array) {
                if (traditional)
                    back.attr("name", parentString);
                else
                    back.attr("name", parentString + "[]");
            } else
				back.attr("name", parentString + "[" + name + "]")
        }

		return back;
    };

    var iterateValues = function (values, parent, form, array, traditional) {
        var i, iterateParent = [];
        Object.keys(values).forEach(function(i) {
            if(typeof values[i] === "object") {
                iterateParent = parent.slice();
                if(array)
					iterateParent.push('');
                else
					iterateParent.push(i);
                iterateValues(values[i], iterateParent, form, Array.isArray(values[i]), traditional);
            } else
                form.append(getInput(i, values[i], parent, array, traditional));
        });
    };
}(window.jQuery || window.Zepto || window.jqlite));
