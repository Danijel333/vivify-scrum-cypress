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
        this.addOrganizationBtn.click()

        if(title) {
        this.organizationName.type(title)
        }

        navigation.nextBtn.click()
        navigation.nextBtn.click()
        navigation.okBtn.click()
    },

    confirmingPass(password) {
        this.confirmingPassword.type(password)
    }
}