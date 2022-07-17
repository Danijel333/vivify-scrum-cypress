class Invoice{

    get selectOrganization(){
        return cy.get('div[class="vs-c-my-organization organization-list-item"]').first();
    }

    get modalOkButton(){
        return cy.contains('OK');
    }

    get invoiceTabButton(){
        return cy.get('li[data-cy="organization-invoicing"]');
    }

    get createFirstInvoiceButton(){
        return cy.get('button').contains('CREATE YOUR FIRST INVOICE');
    }

    get createNewInvoiceButton(){
        return cy.get('button').contains('Create new Invoice');
    }

    get selectClientDropDown(){
        return cy.get('span').contains('Select Client');
    }

    get selectClientFromMenu(){
        return cy.get('div[class="el-autocomplete-suggestion__list"]').first();
    }

    get inputInvoiceNumber(){
        return cy.get('input[placeholder="Enter number..."]').first();
    }

    get inputDueDate(){
        return cy.get('input[placeholder="Enter due date..."]').last();
    }

    get selectInvoiceDueDate(){
        return cy.get('span[class="flatpickr-day "]').last();
    }
    
    get inputInvoicePoNumber(){
        return cy.get('input[placeholder="Enter number..."]').last();
    }

    get inputInvoiceSubject(){
        return cy.get('input[placeholder="Enter subject..."]');
    }

    get inputOrganizationName(){
        return cy.get('input[placeholder="Enter organization..."]');
    }

    get textAreaOrganizationAddress(){
        return cy.get('textarea[placeholder="Enter location..."]');
    }

    get inputEmail(){
        return cy.get('input[placeholder="Enter email..."]').first();
    }

    get textareaAdditionalInfo(){
        return  cy.get('textarea[placeholder="Enter info..."]');
    }

    get sendInvoiceButton(){
        return cy.get('button').contains('Send Invoice');
    }

    get confirmSendInvoiceButton(){
        return cy.get('button').last();
    }

    createInvoiceWithAssertions(
        invoiceId, 
        poNumber, 
        subject, 
        orgName, 
        address,
        email,
        info
        ){
            cy.intercept({
                method : "POST",
                url : "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/19293/send-invoice"
            }).as('invoiceSent');

        this.selectOrganization.click();
        if(this.modalOkButton){
            this.modalOkButton.click();
        }
        this.invoiceTabButton.click();
        if(this.modalOkButton){
            this.modalOkButton.click();
        }
        // if(this.createFirstInvoiceButton){
        //     this.createFirstInvoiceButton.click();
        // }else{
        //     this.createNewInvoiceButton.click();
        // }
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

        cy.wait('@invoiceSent').then(intersection => {
            console.log(intersection.response);
        })
    }

}

export const newInvoice = new Invoice();