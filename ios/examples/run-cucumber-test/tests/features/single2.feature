Feature: Verify if displayed text matches entered text 2

Scenario: Type a term
    Given I try to find Text Button in Sample App
    When I type in "hello@browserstack.com" in the Text Input field
    Then I should get the entered text in the Text Output field