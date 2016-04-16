'use strict'

const bluebird = require('bluebird')
const path = require('path')
const writeFile = bluebird.promisify(require('fs').writeFile)

module.exports = function () {
  this.When(/^I add a new spec file$/, function () {
    const newSpecFile = path.join(this.testDir, 'new_test.js')
    const specText = "describe('A suite', function() {\n" +
    "it('contains spec 2 with an expectation', function() {\n" +
    "expect('foobar').toBe('foobar')\n" +
    '})\n' +
    '})'
    return writeFile(newSpecFile, specText)
  })

  this.When(/^I add a new spec to the entry point$/, function () {
    const newSpecFile = path.join(this.testDir, 'new_other_suffix.js')
    const entryPoint = path.join(this.karmaTmpDir, 'entry_point.js')
    const specText = "describe('A suite', function() {\n" +
    "it('contains spec 2 with an expectation', function() {\n" +
    "expect('foobar').toBe('foobar')\n" +
    '})\n' +
    '})'
    return writeFile(newSpecFile, specText).then(function() {
      const newEntryPointFile = "var testsContext = require.context('./test', true, /_test\.js$/)\n" +
      'testsContext.keys().forEach(testsContext)\n' +
      "var moreTests = require.context('./test', true, /_other_suffix\.js$/)\n" +
      'moreTests.keys().forEach(moreTests)'
      return writeFile(entryPoint, newEntryPointFile)
    })
  })

  this.Given(/^I add a spec with a missing dependency$/, function() {
    const newSpecFile = path.join(this.testDir, 'new_test.js')
    const specText = "var missingDep=require('./missing_dependency')\n" +
    "describe('A suite', function() {\n" +
    "it('contains spec 2 with an expectation', function() {\n" +
    "expect(missingDep()).toBe('foobar')\n" +
    '})\n' +
    '})'
    return writeFile(newSpecFile, specText)
  })

  this.When(/^I correct the missing dependency$/, function () {
    const depFile = path.join(this.testDir, 'missing_dependency.js')
    const fileText = "module.exports = function() { return 'foobar' }"
    return writeFile(depFile, fileText)
  })
}
