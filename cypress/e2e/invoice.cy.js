/// <reference types =" cypress" >
import {
    loginPage
} from "../page_object/loginPage";
import {
    newInvoice
} from "../page_object/invoice";
import user from "../fixtures/users.json";
import {
    faker
} from '@faker-js/faker';



describe("create new invoice", () => {

    let randomNumber = "";
    let subject = "";
    let orgName = "";
    let address = "";
    let email = "";

    before('login', () => {
        cy.visit('');
        loginPage.loginWithoutAssertions(
            user.loginCredentials.user2.email,
            user.loginCredentials.user2.password
        );

        randomNumber = faker.random.numeric();
        subject = faker.name.jobDescriptor();
        orgName = faker.name.jobType();
        address = faker.address.streetAddress();
        email = faker.internet.email();
    })

    it('create invoice with valida data', () => {

        cy.intercept({
            method: "POST",
            url: "**/send-invoice"
        }).as('invoiceSent');
        console.log(randomNumber);

        newInvoice.createInvoice(
            randomNumber,
            randomNumber,
            subject,
            orgName,
            address,
            email,
            subject
        );

        cy.wait('@invoiceSent').then(interception => {
            expect(interception.response.statusCode).eql(200);
            expect(interception.response.statusMessage).eql('OK');
            expect(interception.response.body.client_id).eql(935);
        })
    })
})