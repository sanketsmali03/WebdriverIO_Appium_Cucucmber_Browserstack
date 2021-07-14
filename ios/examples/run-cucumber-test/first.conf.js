exports.config = {
  user: 'USERNAME',
  key: 'PASSWORD',

  updateJob: false,
  specs: [
    './examples/run-cucumber-test/tests/features/single.feature',
    './examples/run-cucumber-test/tests/features/single2.feature'
  ],
  exclude: [],

  capabilities: [{
   
    project: "First Webdriverio iOS Project",
    device: 'iPhone 11 Pro',
    os_version: "13",
    app: process.env.BROWSERSTACK_APP_ID || 'bs://6d78de572aa5baf9269db50c04c9b875d7d2390e',
    'browserstack.debug': true,
    name: (require('minimist')(process.argv.slice(2)))['bstack-session-name'] || 'default_name',
    build: process.env.BROWSERSTACK_BUILD_NAME || 'browserstack-examples-webdriverio' + " - " + new Date().getTime()
  }],

  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
 

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 40000
  },

  framework: 'cucumber',
  cucumberOpts: {
    require: [
      './examples/run-cucumber-test/tests/step-definitions/single.js',
  ],
     // require: require('glob').sync('./examples/run-cucumber-test/tests/step-definitions/single-steps.js'),        // <string[]> (file/dir) require files before executing features
      backtrace: false,   // <boolean> show full backtrace for errors
      compiler: [],       // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
      dryRun: false,      // <boolean> invoke formatters without executing steps
      failFast: false,    // <boolean> abort the run on first failure
      format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
      colors: true,       // <boolean> disable colors in formatter output
      snippets: true,     // <boolean> hide step definition snippets for pending steps
      source: true,       // <boolean> hide source uris
      profile: [],        // <string[]> (name) specify the profile to use
      strict: false,      // <boolean> fail if there are any undefined or pending steps
      tags: [],           // <string[]> (expression) only execute the features or scenarios with tags matching the expression
      timeout: 30000,     // <number> timeout for step definitions
      ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
  },
  

  afterFeature: function (uri, feature) {{
   if((require('minimist')(process.argv.slice(2)))['bstack-session-name']) {
    browser.executeScript("browserstack_executor: {\"action\": \"setSessionName\", \"arguments\": {\"name\":\"" +
     (require('minimist')(process.argv.slice(2)))['bstack-session-name'] +  "\" }}");
  } else {
    browser.executeScript("browserstack_executor: {\"action\": \"setSessionName\", \"arguments\": {\"name\":\"" + feature.name +  "\" }}");
  }

  
}
},

afterScenario: function (world, result) {

  if(result.passed==true) {
    browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}');
  } else {
    browser.takeScreenshot();
    browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}');
  }
},


};
