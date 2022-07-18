import loginPage from "../page_object/loginPage.js"
import organization from "../page_object/organization.js"
import users from "../fixtures/users.json"
import clients  from "../page_object/clients.js"
import navigation from "../page_object/navigation.js"

describe('Clients', () => {
    let clientId = "";
    let organizationId = "";

    before(() => {
        cy.generateFixture()
        cy.visit('')
        loginPage.loginUserWithUI(users.loginCredentials.user2.email,users.loginCredentials.user2.password)
        cy.fixture('faker').then(organizationData => {

            cy.intercept({
                method : 'POST',
                url : 'organizations'
            }).as('organizationCreated');

                organization.createOrganization(organizationData.Title)

            cy.wait('@organizationCreated').then(interception => {
                organizationId = interception.response.body.id;
            })
        })
    })

        it('Add new client without name', () => {
            cy.fixture('faker').then(clientData => {
                navigation.navigationClient()
                clients.createClient('',clientData.Email,clientData.PhoneNumber,clientData.Address)
                clients.errorMessageName.should('have.text','The name field is required')
                navigation.exitModal.click()
            })
        })

        it('Add new client without email', () => {
            cy.fixture('faker').then(clientData => {
                clients.createClient(clientData.Title,'',clientData.PhoneNumber,clientData.Address)
                clients.errorMessageEmail.should('have.text','The email field must be a valid email')
                navigation.exitModal.click()
            })
        })

        it('Add new client', () => {
           cy.fixture('faker').then(clientData => {
            cy.intercept({
                method : 'POST',
                url : '**/organizations/*/clients'
            }).as('clientCreated');

                clients.createClient(clientData.Title,clientData.Email,clientData.PhoneNumber,clientData.Address)

            cy.wait('@clientCreated').then(interception => {
                clientId = interception.response.body.id;
                expect(interception.response.body.id).eq(clientId)
            })
           })
        })

        it('Edit clients info without name', () => {
            cy.fixture('faker').then(clientData => {
                clients.clearData()
                clients.editClientsInfo('',clientData.Email,clientData.PhoneNumber,clientData.Address)
                clients.clientEditErrorMsg.should('have.text', 'Name and Email fields are required.')
                navigation.exitModal.click()
            })
        })

        it('Edit clients info without email', () => {
            cy.fixture('faker').then(clientData => {
                clients.clearData()
                clients.editClientsInfo('',clientData.Email,clientData.PhoneNumber,clientData.Address)
                clients.clientEditErrorMsg.should('have.text', 'Name and Email fields are required.')
                navigation.exitModal.click()
            })
        })

        it('Edit clients info', () => {
            cy.fixture('faker').then(clientData => {
                cy.intercept({
                    method : 'PUT',
                    url : '**/organizations/*/clients/*'
                }).as('clientEdited');

                clients.clearData()
                clients.editClientsInfo(clientData.Title,clientData.Email,clientData.PhoneNumber,clientData.Address)

                cy.wait('@clientEdited').then(interception => {
                    expect(interception.response.body.id).eq(clientId)
                    expect(interception.response.body.name).eq(clientData.Title)
                    expect(interception.response.statusCode).eql(200);
                    expect(interception.response.statusMessage).eql("OK");

                })
            })
        })

        it('Delete client', () => {
            cy.intercept({
                method : 'DELETE',
                url : '**/organizations/*/clients/*'
            }).as('deleteClient');

                clients.deleteClient()

            cy.wait('@deleteClient').then(interception => {
                expect(interception.response.statusCode).eql(200);
                expect(interception.response.statusMessage).eql("OK");
            })
        })
    })