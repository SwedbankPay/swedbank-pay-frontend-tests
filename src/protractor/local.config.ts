import dotenv from 'dotenv';
import { browser } from 'protractor';
var SpecReporter = require("jasmine-spec-reporter").SpecReporter;
dotenv.config();

export const config = {
    directConnect: true,
    acceptSslCerts: true,
    shardTestFiles: false,
    maxInstances: 2,
    maxSessions: 5,
    specs: [
      "../specs/helloWorld.spec.js",
    ],
    suites: {
        happyflow: "../specs/helloWorld.spec.js"
    },
    // Standard settings common for all browsers
    capabilities: {
      project: process.env.project,
      resolution: "1920x1080",
      os: "windows",
      os_version: "10",
      browserName: "chrome",

      chromeOptions: {
        // args: [ "--headless", "--disable-gpu", "--window-size=800,600" ]
      },
      'moz:firefoxOptions': {
        // args: [ "--headless" ]
      }
    },
    // Framework to use. Jasmine is recommended.
    framework: "jasmine",
    // For angular tests
    useAllAngular2AppRoots: true,

    getPageTimeout: 180000,
    allScriptsTimeout: 180000,
    jasmineNodeOpts: {
      defaultTimeoutInterval: 180000,
      showColors: true,
      print: function() {} //Remove protractor dot reporter
    },
    onPrepare() {
      // Override the default timeout for webdriver.
      // var width = 1920;
      // var height = 1080;
      // browser.driver.manage().window().setSize(width, height);
  
      browser
        .manage()
        .timeouts()
        .setScriptTimeout(180000);
      jasmine.getEnv().clearReporters();
      jasmine.getEnv().addReporter(
        new SpecReporter({
          spec: {
            displayStacktrace: "none",
            displayPending: true
          }
        })
      );
      browser.ignoreSynchronization = true;
    },
    beforeLaunch() {
      console.log("Connecting local");
    },
    afterLaunch() {}
  };