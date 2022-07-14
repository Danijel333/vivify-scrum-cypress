class Organization {

    get addNewBtn() {
        return cy.contains('Add New')
    }

    get addOrganizationBtn() {
        return cy.contains('Add Organization')
    }

    get organizationName() {
        return cy.get('input[name="name"]')
    }

    get organizationTitle() {
        return cy.get("h2").contains('New Organization')
    }

    get organization() {
        return cy.get('a[class="vs-c-list__btn vs-c-list__organisation"]').last()
    }

    get confirmingPassword() {
        return cy.get('input[type="password"]')
    }

    get confirmYourActionTitle() {
        return cy.get('h4').contains('Confirm Your Action')
    }
    Organization(title) {

        if(title) {
        this.organizationName.type(title)
        }
    }

    confirmingPass(password) {
        this.confirmingPassword.type(password)
    }
}

export const organization = new Organization()