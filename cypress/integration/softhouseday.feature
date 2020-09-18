Business Need: Showing my lovely co-workers how cypress works

  Scenario: User clicks the button the text changes color
    Given the backend response contains data
    When the user arrives to the application
    Then a welcome message should be visible
    When the user clicks the button
    Then the welcome message css "color" is "red"
    When the user clicks the button
    Then the welcome message css "color" is "rgb(255, 255, 255)"

  Scenario: Fetching data and displaying it on the page
    Given the backend response contains data
    And the user arrives to the application
    Then the text "SHOW COMMENTS" should be visible
    When the user clicks the "show_comments" button
    Then the text "Mock yeah" should be visible
    When the user clicks the "show_comments" button
    Then the text "Mock yeah" should "not.exist"

  Scenario: GET request contains no data
    Given the backend response contains no data
    And the user arrives to the application
    Then the text "SHOW COMMENTS" should be visible
    When the user clicks the "show_comments" button
    Then the text "No comments" should be visible

  Scenario: Save comment
    Given the backend response contains data
    When the user arrives to the application
    Then the user clicks the "show_comments" button
    When the user types a new comment
    And the user clicks the "save_comment" button
    Then the new comment should be visible

