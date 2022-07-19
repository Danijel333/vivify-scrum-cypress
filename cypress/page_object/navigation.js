module.exports = {

    get nextBtn() {
        return cy.get('button[name="next_btn"]')
    },

    get configurationBtn() {
        return cy.get('a[class="vs-c-site-logo"]').last()
    },

    get deleteBtn() {
        return cy.get('button[class="vs-c-btn vs-c-btn--warning vs-c-btn--spaced"]')
    },

    get okBtn() {
        return cy.get('button[class="vs-c-btn vs-c-btn--primary vs-c-btn--lg vs-u-font-sm vs-c-modal--features-confirm-button"]')
    },

    get yesBtn() {
        return cy.get('button[name="save-btn"]')
    },

    get clientBtn() {
        return cy.get('a[class="vs-c-site-logo"]').eq(2)
    },

    get confirmYourActionTitle() {
        return cy.get('h4').contains('Confirm Your Action')
    },

    get saveBtn() {
        return cy.get('button').contains('Save')
    },

    get exitModal() {
        return cy.get('button[name="close-confirmation-modal-btn"]')
    },

    get exitBoardModal() {
        return cy.get('button[name="close-new-board-modal-btn"]')
    },

    navigationOrganization() {
        this.nextBtn.click()
        this.nextBtn.click()
        this.okBtn.click()
    },

    navigationClient() {
        this.clientBtn.click()
        this.okBtn.click()
    }
}