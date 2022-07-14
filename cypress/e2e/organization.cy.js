import { navigation } from "../page_object/navigation.js"
import { loginPage } from "../page_object/loginPage.js"
import { organization } from "../page_object/organization.js"
import users from "../fixtures/users.json"

describe('Organization', () => {
    beforeEach(() => {
        cy.generateFixture()
        cy.visit('')
        loginPage.loginUserWithUI(users.loginCredentials.user2.email,users.loginCredentials.user2.password)
        cy.url().should('include', '/my-organizations')
    })


    it('Create organiztion without title', () => {
        cy.fixture('faker').then(organizationData => {
            organization.addNewBtn.click()
            organization.addOrganizationBtn.click()
            organization.Organization("")
            navigation.nextBtn.should('be.disabled')
        })
    })

    it('Create Organization', () => {
        cy.fixture('faker').then(organizationData => {
            organization.addNewBtn.click()
            organization.addNewBtn.should('be.visible')
            organization.addOrganizationBtn.click()
            organization.organizationTitle.should('have.text', 'New Organization')
            organization.Organization(organizationData.Title)
            navigation.nextBtn.click()
            navigation.nextBtn.click()
            organization.organization.should('be.visible')
        })
    })
})