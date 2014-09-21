describe('lst.js', function() {
	var testContainer, bindingComponent, bindingData;

	document.body.innerHTML += '<div id="testContainer"></div>';
	testContainer = document.getElementById('testContainer');

	afterEach(function() {
		bindingComponent = null;
		bindingData = null;
		testContainer.innerHTML = '';

		var templates = document.getElementsByTagName('template'),
			i = 0;

		for (; i < templates.length; ++i) {
			templates[i].parentNode.removeChild(templates[i]);
		}
	});

	it('should be loaded to page', function() {
		expect(window.Lst).not.toBe(undefined);
	});

	it('should bind attributes correctly', function() {
		document.head.innerHTML += '' +
			'<template id="bind-attributes-test">' +
				'<div data-lst-attributes="title=test-01,href=invalid-field"></div>' +
				'<div data-lst-attributes="data-test-attribute=test-02,title=test-03"></div>' +
			'</template>';
		bindingData = {
			'test-01': 'aaaa',
			'test-02': 'fasdf',
			'test-03': '<b>asdsadas</b>'
		};

		bindingComponent = new Lst('bind-attributes-test');
		testContainer.appendChild(bindingComponent.bindTemplate(bindingData));

		//All attributes removed after processing
		expect(testContainer.querySelectorAll(['data-lst-attributes']).length).toBe(0);

		//Only first attribute should be created
		expect(testContainer.children[0].getAttribute('title')).toBe('aaaa');
		expect(testContainer.children[0].hasAttribute('href')).toBe(false);

		expect(testContainer.children[1].getAttribute('data-test-attribute')).toBe('fasdf');
		expect(testContainer.children[1].getAttribute('title')).toBe('<b>asdsadas</b>');

	});
});