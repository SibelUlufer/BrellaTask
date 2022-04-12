/// <reference types ="cypress" />

import { mainPage } from "../support/page/brellaPage"

describe('Brella test page functionality testing', () => {
  beforeEach('Open the page',()=>{
    cy.visit('/')
  })
  it('Fill all fields and save, as happypath', () => {
    mainPage.fillAll()
    mainPage.assertAll()
    mainPage.validationCheck()
  })
  it('Check all validations', ()=>{
    mainPage.typeInvalidEmail()
    mainPage.typeInvalidNumber()
    mainPage.numberValidation()
    mainPage.clickSave()
    mainPage.validationCheck()
    mainPage.emailValidation()
  }) 
  it('Should work on mobile view for multiple saving',()=>{
    cy.viewport('iphone-8')
    mainPage.fillAll()
    mainPage.fillAll()
    mainPage.fillAll()
  })
  it('Should not save without email',()=>{
    mainPage.typeName()
    mainPage.typeNumber()
    mainPage.yearPicker()
    mainPage.switchOff()
  })
  it('Should work with mixed order', ()=>{
    mainPage.typeEmail()
    mainPage.yearPicker()
    mainPage.typeName()
    mainPage.clickSave()
  })
  //all other possible combinations can be run by calling each needed function in a new scenario
  //when creating all functions, my main desire was to make it dynamic, flexible and fast 
})
