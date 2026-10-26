Feature: LIMS
  @NeedLogin
  Scenario Outline: Login with multiple credentials
    Given User is on Login Page
    When User enter valid "<facility>" and "<username>" and "<password>"
    And clicks on login button
    Then User should be navigated to the home page
    Examples:
      | facility | username | password | status  |
      | MEDIQ001     | admin    | demo1234 | Failed  |
      | MEDIQ001     | admin1   | demo123  | Failed  |
      | MEDIQ001     | admin1   | demo123  | Failed  |
      | MEDIQ0001    | admin    | admin123 | Failed  |
      |              |          |          | Failed  |
      |              | admin    |          | Failed  |
      |              |          | demo123  | Failed  |
      | MEDIQ01      | admin    | DEMO123  | Failed  |
      | MEDIQ01      | admin1   | DEMO1234 | Failed  |
      | MEDIQ001     | admin    | demo123  | Success |


  @PatientRegistrationTest @NeedLogin
  Scenario: Successfully navigating to the Add Patient form
    Given User is on Login Page
    When User enter valid "MEDIQ001" and "admin" and "demo123"
    And clicks on login button
    And the user navigates to Add Patient page
    Then the user should see the message showing

  @PatientEdit @NeedLogin
  Scenario: Edit patient details and update Hospital UHID
    When the user navigates to Edit Page
    Then the user should see the message showing


#  Scenario: Successfully navigating to the Add Patient form
#    Given the user is on the printconsole
#    When the user should be redirected to the Add Patient page
#    Then the user clicks on the patients button
#    And the user should see the message showing


#    Then User add patient
#    Then user filled patient details
#    Then user navigate to labworklistpage
#    Then Order/Cancelled











