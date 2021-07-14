const { Given, When, Then } = require('@cucumber/cucumber')
var assert = require('assert');

Given('I try to find Text Button in Sample App', async () =>  {
  var textButton = await $(`~Text Button`);
  await textButton.waitForDisplayed({ timeout: 30000 });
  await textButton.click();
})

When('I type in "hello@browserstack.com" in the Text Input field',  async () =>  {
  var textInput = await $(`~Text Input`);
  await textInput.waitForDisplayed({ timeout: 30000 });
  await textInput.click()
  await textInput.addValue("hello01@browserstack.com"+"\n");
})

Then('I should get the entered text in the Text Output field',  async () =>  {
  var textOutput = await $(`~Text Output`);
  await textOutput.waitForDisplayed({ timeout: 30000 });
  var value = await textOutput.getText();

  if (value === "hello01@browserstack.com")
    assert(true)
  else
    assert(false)
  
 // var back = await $('~UI Elements');
 // await back.click();
})