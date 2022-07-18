import navigation from "./navigation"

module.exports = {

    get addClientBtn() {
        return cy.get('button[class="vs-c-btn vs-c-btn--primary vs-c-btn--spaced vs-u-width--full"]')
    },

    get contactName() {
        return cy.get('input[name="name"]')
    },

    get contactEmail() {
        return cy.get('input[name="email"]')
    },

    get contactNumber() {
        return cy.get('input[type="tel"]')
    },

    get addressInput() {
        return cy.get('textarea[class="vs-c-mt-input"]')
    },

    get createClientBtn() {
        return cy.get('button[class="vs-c-btn vs-c-btn--primary vs-c-btn--spaced"]')
    },

    get addNewClientTitle() {
        return cy.get('h4').contains('Add new Client')
    },

    get findLastClient() {
        return cy.get('tr').eq(1)
    },

    get deleteClientBtn() {
        return cy.get('button[class="vs-c-btn vs-c-btn--warning vs-c-btn--spaced vs-c-btn--spaced-md-icon vs-u-pull--left"]')
    },

    get editClientTitle() {
        return cy.get('h4').contains('Edit Client')
    },

    get errorMessageName() {
        return cy.get('p').contains('The name field is required')
    },

    get errorMessageEmail() {
        return cy.get('p').contains('The email field must be a valid email')
    },

    get editInputName() {
        return cy.get('input[class="vs-c-mt-input"]').eq(0)
    },

    get editInputEmail() {
        return cy.get('input[class="vs-c-mt-input"]').eq(1)
    },

    get editInputPhone() {
        return cy.get('input[class="vs-c-mt-input"]').eq(2)
    },

    get clientEditErrorMsg() {
        return cy.get('p').contains('Name and Email fields are required.')
    },


    createClient(title,email,address,phoneNumber) {
        this.addClientBtn.click()
        this.addNewClientTitle.should('have.text', 'Add new Client')
        if(title) {
            this.contactName.type(title)
        }
        if(email) {
        this.contactEmail.type(email)
        }
        this.contactNumber.type(phoneNumber)
        this.addressInput.type(address)
        this.createClientBtn.click()
    },

    deleteClient() {
        this.findLastClient.click()
        this.editClientTitle.should('have.text', 'Edit Client')
        this.deleteClientBtn.click()
        navigation.confirmYourActionTitle.should('have.text', 'Confirm Your Action')
        navigation.yesBtn.click()
    },

    editClientsInfo(title,email,address,phoneNumber) {
        this.editClientTitle.should('have.text', 'Edit Client')
        if(title) {
            this.editInputName.type(title)
        }
        if(email) {
            this.editInputEmail.type(email)
        }
        this.editInputPhone.type(phoneNumber)
        this.addressInput.type(address)
        navigation.saveBtn.click()
    },

    clearData() {
        this.findLastClient.click()
        this.editInputName.clear()
        this.editInputEmail.clear()
        this.editInputPhone.clear()
        this.addressInput.clear()
    }
}