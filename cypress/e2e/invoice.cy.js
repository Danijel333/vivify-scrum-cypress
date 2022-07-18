/// <reference types =" cypress" >
import newInvoice from "../page_object/invoice.js";
import user from "../fixtures/users.json";
import { faker } from '@faker-js/faker';


describe("create new invoice", () => {
    let invoiceId = "";
    let randomNumber = "";
    let subject = "";
    let orgName = "";
    let address = "";
    let email = "";

    before('login', () => {

        cy.backendLogging(
            user.loginCredentials.user2.email,
            user.loginCredentials.user2.password
        )

        randomNumber = faker.random.numeric();
        subject = faker.name.jobDescriptor();
        orgName = faker.name.jobType();
        address = faker.address.streetAddress();
        email = faker.internet.email();
    })

    it('create invoice with valida data', () => {
        cy.visit('')
        cy.intercept({
            method: "POST",
            url: "**/send-invoice"
        }).as('invoiceSent');

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
            invoiceId = parseInt(interception.response.body.id);
        })
    })

    it('delete invoice after create', () => {
        newInvoice.deleteInvoiceAfterCreate(invoiceId);
    })

    xit('delete invoice after login', () => {
        cy.visit('')
        newInvoice.deleteInvoiceFullSteps();
    })
})