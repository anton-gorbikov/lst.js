(function() {
	'use strict';

	/**
	 * Creates an object, which can be used for binding data to template passed as a parameter
	 * 
	 * @constructor
	 * @param {String} templateId - Id of the template element in the current document
	 */
	var Lst = function(templateId) {
		this._template = document.getElementById(templateId);
	};

	Lst.prototype._supportedAttributes = {
		'data-lst-attributes': '_bindAttributesAll',
		'data-lst-classlist': '_bindClasslistAll',
		'data-lst-content': '_bindContentAll'
	};

	Lst.prototype._subTemplateAttribute = 'data-lst-subtemplate';
	Lst.prototype._contentBindAttribute = 'data-lst-insert';
	Lst.prototype._append = 'append';
	Lst.prototype._prepend = 'prepend';

	Lst.prototype.bindTemplate = function(object) {
		var clone = document.importNode(this._template.content, true);

		for (var attribute in this._supportedAttributes) {
			this[this._supportedAttributes[attribute]](clone.querySelectorAll('[' + attribute + ']'), object);
		}

		return clone;
	};

	Lst.prototype._bindAttributesAll = function() {

	};

	Lst.prototype._bindClasslistAll = function() {

	};

	Lst.prototype._bindContentAll = function(nodes, object) {
		for (var i = 0; i < nodes.length; ++i) {
			this._bindContent(nodes[i], object);
		}
	};

	Lst.prototype._bindContent = function(node, object) {
		//TODO temporary simplified implementation
		var attribute = node.getAttribute('data-lst-content');
		node.innerHTML = object[attribute];
	};

	window.Lst = Lst;
})();