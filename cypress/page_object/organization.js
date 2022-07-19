import navigation from "../page_object/navigation.js"
module.exports = {

    get addNewBtn() {
        return cy.contains('Add New')
    },

    get addOrganizationBtn() {
        return cy.contains('Add Organization')
    },

    get organizationName() {
        return cy.get('input[name="name"]')
    },

    get organizationTitle() {
        return cy.get("h2").contains('New Organization')
    },

    get confirmingPassword() {
        return cy.get('input[type="password"]')
    },

    createOrganization(title) {

        this.addNewBtn.click()
        this.addNewBtn.should('be.visible')
        this.addOrganizationBtn.click()
        this.organizationTitle.should('have.text', 'New Organization')
        if(title) {
        this.organizationName.type(title)
        }
    },

    deleteOrganization(password) {
        navigation.configurationBtn.click()
        navigation.deleteBtn.click()
        navigation.confirmYourActionTitle.should('have.text', 'Confirm Your Action')
        this.confirmingPassword.type(password)
        navigation.yesBtn.click()
    }
}