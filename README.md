# Cypress exercise

## Getting started

- Install dependencies with npm
```
$ npm i
```
- Run the project
```
"npm run cy:open" or "npx cypress open"
```
- to run all tests headless and create mochawesome.html report as merged html file with junit and mochawesome reports
```
"npm run cy:e2e"
```

**../support/page/brellaPage.js covers the all functions.**
**../support/command files has functions that can be reachable from anywhere.**
**.prettierrc file has format settings.**
**Under the mochawesome-report folder, mochawesome.html report can be found.**
**Under the cypress/results folder there are junit and mochawesome folders which have .xml and .json files created seperately, each file represents a spec file.**

## Assignment

**Your challenge is to list all test cases you would automate for the below form. Wrssite at least two ready test cases and just list the rest.**


How would you improve this assignment? Please share your thoughts.
- This assignment covers pretty much everything actually, but maybe these could also be added for testing:
  - A report that shows the test results **I added**
  - Test plan document regarding on testing the page which also covers hypothetical tests, steps etc.**I added**
  - There could be some API calls to use in test steps like cy.request(), cy.intercept()
  - Assignment could have such a validation like same email address can not be used
  - Year picker could have such a validation like future years can not be selected
  - Also picker could be date picker with some limitation
  - After save action, there could be filter options, sort action or search
  - Created boxes could be displayed in expand-collapse logic
  - ...

**I didn't use cucumber for BDD test cases due to project was shared with me with mocha functions(it)**
