import  navigation  from "../page_object/navigation.js"
import  loginPage  from "../page_object/loginPage.js"
import  organization  from "../page_object/organization.js"
import users from "../fixtures/users.json"

describe('Organization', () => {
    let organizationId = "";

    beforeEach(() => {
        cy.generateFixture()
        cy.session('Login', () => {
            cy.visit('')
            loginPage.loginWithoutAssertions(users.loginCredentials.user2.email,users.loginCredentials.user2.password)
            cy.validatePageUrl('/my-organizations')
        })
    })

    it('Create organiztion without title', () => {
        cy.visit('my-organizations')
            organization.createOrganization('')
            navigation.nextBtn.should('be.disabled')
            navigation.exitBoardModal.click()
        })

    it('Create Organization', () => {
        cy.fixture('faker').then(organizationData => {
            cy.visit('my-organizations')
            cy.intercept({
                method : 'POST',
                url : '**/organizations'
            }).as('organizationCreated');

            organization.createOrganization(organizationData.Title)
            navigation.navigationOrganization()

            cy.wait('@organizationCreated').then(interception => {
                organizationId = interception.response.body.id;
                expect(interception.response.body.id).eq(organizationId)
                expect(interception.response.body.name).eq(organizationData.Title)
                expect(interception.response.statusCode).eql(201);
                expect(interception.response.statusMessage).eql("Created");
            })
        })
    })

    it('Delete organization', () => {
        cy.fixture('faker').then(organizationData => {
            cy.visit(`organizations/${organizationId}/boards`)
            cy.intercept({
                method : 'POST',
                url : '**/organizations/*'
            }).as('organizationDeleted');

            navigation.okBtn.click()
            organization.deleteOrganization(users.loginCredentials.user2.password)

            cy.wait('@organizationDeleted').then(interception => {
                expect(parseInt(interception.response.url.slice(-5))).eq(organizationId)
                expect(interception.response.statusCode).eql(201);
                expect(interception.response.statusMessage).eql("Created");
            })
        })
    })
})