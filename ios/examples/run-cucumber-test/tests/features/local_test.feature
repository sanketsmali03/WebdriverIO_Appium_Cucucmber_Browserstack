Feature: BrowserStack Local Testing

Scenario: Can check tunnel working
    Given I start test on the Local Sample App
    Then I should see "Up and running"