//enables to check an element if visible
Cypress.Commands.add('isVisible', selector =>{
    cy.get(selector).should('be.visible')
})
//enables to check text if contains
Cypress.Commands.add('isContain', (selector, text) =>{
    cy.get(selector).should('contain', text)
})
//enables to click
Cypress.Commands.add('clickButton', selector =>{
    cy.get(selector).click()
})
//enables to type
Cypress.Commands.add('typeCommand', (selector, text)=>{
    cy.get(selector).type(text,{force: true})
})
