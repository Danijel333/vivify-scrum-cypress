<reference types= "cypress"/>

import {loginPage} from "../page_object/loginPage.js";
import user from "../fixtures/users.json"


describe('user login', () => {

    it('visit login page', () => {
        cy.visit('');
    })

    it('validate login page', () => {
        cy.validatePageUrl('/login');
        cy.validatePageHeader('Log in with your existing account')
    })

    it('user login with valid credentials', () => {
        loginPage.loginUserWithUI(
            user.loginCredentials.user2.email,
            user.loginCredentials.user2.password
        );
    })

    it('validate home page after login', () => {
        cy.validatePageUrl('/my-organizations');
    })

})