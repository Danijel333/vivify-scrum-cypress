/// <reference types =" cypress" >
import newInvoice from "../page_object/invoice.js";
import user from "../fixtures/users.json";
import { faker } from '@faker-js/faker';


describe("create new invoice", () => {
    let invoiceId = "";
    let organizationId = "";
    let randomNumber = "";
    let subject = "";
    let orgName = "";
    let address = "";
    let email = "";

    const login = (email, password) =>{
        cy.session('user1', () => {
            cy.backendLogging(email,password)
        })
    }

    beforeEach('login', () => {

        login(
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
            expect(interception.response.body.client_id).eql(805);
            invoiceId = parseInt(interception.response.body.id);
            organizationId = parseInt(interception.response.body.organization_id);        })
    })

    it('delete invoice after create', () => {
        cy.visit(`organizations/${organizationId}/invoice`)
        cy.intercept({
            method : 'GET',
            url : '**/organizations/**'
        }).as('deleteInvoiceIntercept')

        
        newInvoice.deleteInvoiceAfterCreate(invoiceId);

        cy.wait('@deleteInvoiceIntercept').then(interception => {
            console.log(interception.response)
        })

    })

    it('delete invoice after login', () => {
        cy.visit('')
        newInvoice.deleteInvoiceFullSteps();
    })
})