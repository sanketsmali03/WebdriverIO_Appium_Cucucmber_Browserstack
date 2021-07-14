const { Given, When, Then } = require('cucumber');
var assert = require('assert');
var path = require('path');

Given('I start test on the Local Sample App', function () {
	var searchSelector = `~Test BrowserStackLocal connection`;
    browser.waitForVisible(searchSelector, 30000);
    browser
      .element(searchSelector)
      .click();
})

Then('I should see "Up and running"', function () {
	var responseText = `~Response is: Up and running`;
    browser.waitForVisible(responseText, 30000);
    var allTextElements = browser.elements(responseText).value;

    var testElement = null;
    allTextElements.forEach(function (textElement) {
      var textContent = browser.elementIdText(textElement['ELEMENT']).value;
      if (textContent.indexOf('Up and running') !== -1) {
        testElement = textElement;
      }
    });

    if (testElement === null) {
      var screenshotPath = path.resolve(__dirname, 'screenshot.png');
      browser.saveScreenshot(screenshotPath);
      console.log('Screenshot stored at ' + screenshotPath);
      throw new Error('Cannot find the Up and running response');
    }

    var matchedString = browser.elementIdText(testElement['ELEMENT']).value;
    assert(matchedString == 'Response is: Up and running');
})