export class brellaPage{
    //enables to type on name field and checks
    typeName(){
        this.setName('[data-test="form-name-input"]') //name is being created randomly  
        cy.get('[data-test="form-name-input"]').invoke('prop', 'value').should('contain',Cypress.env('nameS')) //checks the field if typed 
        this.checkButton()//checks save button is disable or enable
    }
    //makes switch on
    switchOn(){
        cy.get('[data-test="form-switch"]').find('button').click().and('have.value', 'true')//clicks on switch button to open and checks its value
        Cypress.env('offOn', true)//keeps the "true" value for switch "on"
        this.checkButton()//checks save button is disable or enable
    }
    //switch is off as default, this function is created to make assertion of its value when it is used
    switchOff(){
        Cypress.env('onOff', false)//keeps the "false" value for switch "off"
        this.checkButton()//checks save button is disable or enable
    }
    //enables to type on email field and checks 
    typeEmail(){
        this.setEmail('[data-test="form-email-input"]')//email is being created randomly
        cy.get('[data-test="form-email-input"]').invoke('prop', 'value').should('contain',Cypress.env('emailS')) //checks the field if typed
        this.checkButton()//checks save button is disable or enable
    }
    //enables to type invalid email on email field and checks
    typeInvalidEmail(){
        this.setEmail('[data-test="form-email-input"]')//email is being created randomly
        //makes invalid the valid email to invalid by removing "@"
        cy.get('[data-test="form-email-input"]').invoke('val').then(el =>{
            let mail 
            mail = el.replace('@', '')
            cy.get('[data-test="form-email-input"]').clear()
            .typeCommand('[data-test="form-email-input"]',mail)
            .invoke('prop', 'value').should('contain',mail) //checks the field if typed
        })
        this.checkButton()//checks save button is disable or enable
    }
    //enables to type on input number field
    typeNumber(){
        this.setNumber('[data-test="form-number-input"]')//number is being created randomly
        cy.get('[data-test="form-number-input"]').invoke('prop', 'value').should('contain',Cypress.env('numberS'))//checks the field if typed
        this.checkButton()//checks save button is disable or enable
    }
    //enables to type invalid number on input number field and checks
    typeInvalidNumber(){
        let invalidNumber= Math.floor(Math.random() * 200) + 100
        cy.get('[data-test="form-number-input"]').clear()//clears the field
        cy.typeCommand('[data-test="form-number-input"]', invalidNumber)//types invalid number randomly
        cy.get('[data-test="form-number-input"]').invoke('prop', 'value').should('contain',invalidNumber)//checks the field if typed
        this.checkButton()//checks save button is disable or enable
    }
    //enables to pick year
    yearPicker(){
        this.setYear('[data-test="form-year-input"]')//year is being created randomly
        cy.get('[data-test="form-year"]').click()//clicks on year picker
        cy.get('[data-test="form-year-input"]').invoke('prop', 'value').should('contain',Cypress.env('yearS'))//checks the field if typed
        this.checkButton()//checks save button is disable or enable
    }
    //enables to click on save button and checks
    clickSave(){
        this.checkButton()//checks save button is disable or enable
        cy.clickButton('[data-test="submit"]',{force:true})
        this.validationCheck() //checks validation message     
    }
    //checks save button is disable or enable
    checkButton(){
        cy.get('[data-test="submit"]').then(btn=>{
            if(btn.is(':disabled')){
                cy.get('[data-test="submit"]').should('be.disabled')//checks if button is disable
            }else{
                cy.get('[data-test="submit"]').should('be.enabled')//checks if button is enable
            }
        })
    }
    //makes assertion for name field after save action   
    assertName(){
        cy.get('[data-test="item-undefined-name"]').invoke('text').then( val =>{
            cy.wrap(val).should('contain', Cypress.env('nameS'))//checks if the name value in the box has the added name
        })
        cy.get('[data-test="item-undefined-name"]').its('length').should('be.gt', 0)//checks that the box is added
    }
    //makes assertion for input number field after save action   
    assertNumber(){
        cy.get('.item-undefined-input[data-test="item-undefined-email"]').invoke('text').then( val =>{
            cy.wrap(val).should('contain', Cypress.env('numberS'))//checks if the number value in the box has the added number
        })
    }
    //makes assertion for year field after save action   
    assertYear(){
        cy.get('.item-undefined-year[data-test="item-undefined-email"]').invoke('text').then( val =>{
            cy.wrap(val).should('contain', Cypress.env('yearS'))//checks if the year value in the box has the added year
        })
    }
    //makes assertion for "email" and "switch" fields after the "save" action 
    //I combined them in a function due to "switch" field and "email" always be in the created box
    //"switch" has a default value and "email" is mandatory 
    //this fuction is for switch "on" option  
    assertEmailAndSwitchOn(){
        cy.get('.item-undefined-email[data-test="item-undefined-email"]').invoke('text').then( val =>{
            cy.wrap(val).should('contain', Cypress.env('emailS'))//checks if the email value in the box has the added email
        })
        cy.isContain('.item-undefined-switch[data-test="item-undefined-email"]', Cypress.env('offOn'))//checks if the switch "on" value in the box 
    }
    //this fuction is for switch "off" option  
    assertEmailAndSwitchOff(){
        cy.get('.item-undefined-email[data-test="item-undefined-email"]').invoke('text').then( val =>{
            cy.wrap(val).should('contain', Cypress.env('emailS'))//checks if the email value in the box has the added email
        })
        cy.isContain('.item-undefined-switch[data-test="item-undefined-email"]', Cypress.env('onOff'))//checks if the switch "off" value in the box 
    }
    //enables to see input number validation message
    numberValidation(){
        cy.isVisible('.show-help').and('have.text','Maximum number is 100')
    }
    //enables to see invalid email validation message
    emailValidation(){
        cy.get('[data-test="form-email-input"]').clear()//clears the email field
        this.typeInvalidEmail()//types invalid email randomly
        cy.get('[data-test="form-email-input"]').clear()//clears the email field
        cy.isContain('.ant-form-item-explain', 'Please fill the email!')//checks validation message
    }
    //enables to check pop-up validation messages
    validationCheck(){
    cy.get('.ant-message-notice-content').then( content=>{
        if(content.text().includes('email doesn\'t have @')){
         cy.isVisible('.ant-message-notice-content')
        }else{
         cy.isContain('.ant-message-notice-content','cool, it is done') 
        }
    })
    }
    //enables to type and fill all fields in a function
    //in case of using "switchOff()" function here instead of "switchOn()", 
    //it also should be changed to "assertEmailAndSwitchOff()" in "assertAll()" function
    fillAll(){
        this.typeName()
        this.switchOn()
        this.typeEmail()
        this.typeNumber()
        this.yearPicker()
        this.clickSave()
    }
    assertAll(){
        this.assertName()
        this.assertEmailAndSwitchOn()
        this.assertNumber()
        this.assertYear()
    }
   //creates random name
   setName(selector){
    let randomText = ''
    let nameText =''
    var Textpattern = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for(var i=0; i<8; i++)
    randomText+=Textpattern.charAt(Math.floor(Math.random() * Textpattern.length)) 
    nameText = randomText
    cy.typeCommand(selector,String(nameText))
    Cypress.env('nameS', nameText)
   }
   //creates random email
   setEmail(selector){
    let randomText = ''
    let testEmail =''
    var pattern = 'abcdefghigklmnopqrstyvwxyz'
    for(var i=0; i<10; i++)
    randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length)) 
    testEmail = randomText + '@gmail.com'
    Cypress.env('emailS', testEmail)
    cy.wrap(testEmail).as('emailS')
    cy.typeCommand(selector, String(testEmail))   
   }
   //creates random number
   setNumber(selector){
    let randomNumber= Math.floor((Math.random() * 100) + 1)
    cy.typeCommand(selector, String(randomNumber))
    Cypress.env('numberS', randomNumber)
   }
   //creates random year
   setYear(selector){
    let randomYear = Math.floor((Math.random() * 100) + 2000)
    cy.typeCommand(selector, String(randomYear))
    Cypress.env('yearS', randomYear)
   }
}
export const mainPage = new brellaPage