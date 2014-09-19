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
		'data-lst-attributes': '_bindAttributes',
		'data-lst-classlist': '_bindClasslist',
		'data-lst-content': '_bindContent'
	};

	Lst.prototype._subTemplateAttribute = 'data-lst-subtemplate';
	Lst.prototype._contentBindAttribute = 'data-lst-insert';
	Lst.prototype._append = 'append';
	Lst.prototype._prepend = 'prepend';

	Lst.prototype.bindTemplate = function(object) {
		var clone = document.importNode(this._template.content, true),
			nodes;

		for (var attribute in this._supportedAttributes) {
			nodes = clone.querySelectorAll('[' + attribute + ']');

			for (var i = 0; i < nodes.length; ++i) {
				this[this._supportedAttributes[attribute]](nodes[i], object);

				//HTML clean-up
				nodes[i].removeAttribute(attribute);
			}
		}

		return clone;
	};

	Lst.prototype._bindAttributes = function(node, object) {
		var attributes = node.getAttribute('data-lst-attributes').split(',').map(function(value) {
			var keyValuePair = value.split('=');
			return {
				name: keyValuePair[0],
				value: keyValuePair[1]
			};
		});

		for (var i = 0; i < attributes.length; ++i) {
			if (object.hasOwnProperty(attributes[i].value)) {
				node.setAttribute(attributes[i].name, object[attributes[i].value]);
			}
		}
	};

	Lst.prototype._bindClasslist = function(node, object) {
		var classes = node.getAttribute('data-lst-classlist').split(',').map(function(value) {
			var keyValuePair = value.split(':');
			return {
				condition: keyValuePair[0],
				valueIfTrue: keyValuePair[1],
				valueIfFalse: keyValuePair[2]
			};
		});

		for (var i = 0; i < classes.length; ++i) {
			if (object.hasOwnProperty(classes[i].condition)) {
				if (object[classes[i].condition] && classes[i].valueIfTrue && !node.classList.contains(classes[i].valueIfTrue)) {
					node.classList.add(classes[i].valueIfTrue);
				}
				if (!object[classes[i].condition] && classes[i].valueIfFalse && !node.classList.contains(classes[i].valueIfFalse)) {
					node.classList.add(classes[i].valueIfFalse);
				}
			}
		}
	};

	Lst.prototype._bindContent = function(node, object) {
		//TODO temporary simplified implementation
		var attribute = node.getAttribute('data-lst-content');
		node.innerHTML = object[attribute];
	};

	window.Lst = Lst;
})();