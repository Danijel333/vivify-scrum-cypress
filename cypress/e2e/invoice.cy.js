/// <reference types =" cypress" >
import { loginPage } from "../page_object/loginPage";
import { newInvoice } from "../page_object/invoice";
import user from "../fixtures/users.json";
import {faker} from '@faker-js/faker';



describe("create new invoice", () => {
    let randomNumber = "";
    let subject = "";
    let orgName = "";
    let address = "";
    let email = "";
    
    before('login', () => {
        cy.visit('');
        loginPage.loginUserWithUI(
            user.loginCredentials.user2.email,
            user.loginCredentials.user2.password
        );

        randomNumber = faker.random.numeric();
        subject = faker.name.jobDescriptor();
        orgName = faker.name.jobType();
        address = faker.address.streetAddress();
        email = faker.internet.email();
    })

    it('create invoice with valida data', ()=> {
        newInvoice.createInvoiceWithAssertions(
            randomNumber,
            randomNumber,
            subject,
            orgName,
            address,
            email,
            subject
        );
    })
})