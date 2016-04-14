Feature: default

  Scenario: Standard case passes
    Given the 'passing' tests
    And the simple.js Karma config file
    When I run the Karma test
    Then the test passes with JSON results:
    """
    {
        "A suite": {
            "contains spec with an expectation": "PASSED"
        }
    }
    """
    And existing webpack bundle is left intact
    And webpack info level logging occurs

  Scenario: Standard case fails with source maps
    Given a complete scenario

  Scenario: Handles webpack compilation errors
    Given a complete scenario

  Scenario: Standard case fails without source maps
    Given a complete scenario
