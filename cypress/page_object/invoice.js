module.exports = {

    get selectOrganization(){
        return cy.get('div[class="vs-c-my-organization organization-list-item"]').first();
    },

    get modalOkButton(){
        return cy.contains('OK');
    },

    get invoiceTabButton(){
        return cy.get('li[data-cy="organization-invoicing"]');
    },

    get createFirstInvoiceButton(){
        return cy.get('button').contains('CREATE YOUR FIRST INVOICE');
    },

    get createNewInvoiceButton(){
        return cy.get('button').contains('Create new Invoice');
    },

    get selectClientDropDown(){
        return cy.get('span').contains('Select Client');
    },

    get selectClientFromMenu(){
        return cy.get('div[class="el-autocomplete-suggestion__list"]').first();
    },

    get inputInvoiceNumber(){
        return cy.get('input[placeholder="Enter number..."]').first();
    },

    get inputDueDate(){
        return cy.get('input[placeholder="Enter due date..."]').last();
    },

    get selectInvoiceDueDate(){
        return cy.get('span[class="flatpickr-day "]').last();
    },
    
    get inputInvoicePoNumber(){
        return cy.get('input[placeholder="Enter number..."]').last();
    },

    get inputInvoiceSubject(){
        return cy.get('input[placeholder="Enter subject..."]');
    },

    get inputOrganizationName(){
        return cy.get('input[placeholder="Enter organization..."]');
    },

    get textAreaOrganizationAddress(){
        return cy.get('textarea[placeholder="Enter location..."]');
    },

    get inputEmail(){
        return cy.get('input[placeholder="Enter email..."]').first();
    },

    get textareaAdditionalInfo(){
        return  cy.get('textarea[placeholder="Enter info..."]');
    },

    get sendInvoiceButton(){
        return cy.get('button').contains('Send Invoice');
    },

    get confirmSendInvoiceButton(){
        return cy.get('button').last();
    },

    get deleteInvoiceButton(){
        return cy.get('div[class="vs-c-invoice-table-icon__item vs-c-table-icon-lighten el-tooltip"]').eq(5);
    },

    get confirmDelete(){
        return cy.get('button').contains('Yes');
    },

    createInvoice(
        invoiceId, 
        poNumber, 
        subject, 
        orgName, 
        address,
        email,
        info
        ){

        this.selectOrganization.click();
        if(this.modalOkButton){
            this.modalOkButton.click();
        }
        this.invoiceTabButton.click();
        if(this.modalOkButton){
            this.modalOkButton.click();
        }
        this.createNewInvoiceButton.click();
        this.selectClientDropDown.click(); 
        this.selectClientFromMenu.click();
        this.inputInvoiceNumber.type(invoiceId);
        this.inputDueDate.click();
        this.selectInvoiceDueDate.click();
        this.inputInvoicePoNumber.type(poNumber);
        this.inputInvoiceSubject.type(subject);
        this.inputOrganizationName.clear().type(orgName);
        this.textAreaOrganizationAddress.type(address);
        this.inputEmail.type(email);
        this.textareaAdditionalInfo.type(info);
        this.sendInvoiceButton.click();
        this.confirmSendInvoiceButton.click();

    },

    deleteInvoiceAfterCreate(invoiceId){
        cy.intercept({
            method : 'DELETE',
            url : "**/organizations/*/invoices/*"
        }).as('invoiceDeleted');

        this.deleteInvoiceButton.click({force : true});
        this.confirmDelete.click();

        cy.wait('@invoiceDeleted').then(interception =>{
            expect(interception.response.statusCode).eql(200);
            expect(interception.response.statusMessage).eql('OK');
            expect(parseInt(interception.response.url.slice(-3))).eql(invoiceId);

        });

    },

    deleteInvoiceFullSteps(){
        cy.intercept({
            method : 'DELETE',
            url : "**/organizations/*/invoices/*"
        }).as('invoiceDeleted');

        this.selectOrganization.click();
        if(this.modalOkButton){
            this.modalOkButton.click();
        }
        this.invoiceTabButton.click();
        if(this.modalOkButton){
            this.modalOkButton.click();
        }
        this.deleteInvoiceButton.click({force : true});
        this.confirmDelete.click();

        cy.wait('@invoiceDeleted').then(interception =>{
            expect(interception.response.statusCode).eql(200);
            expect(interception.response.statusMessage).eql('OK');
        });
    }

}