class Board {

    get addNewButton() {
        return cy.contains('Add New')
    }

    get addBoardButton() {
        return cy.contains('Add Board')
    }

    get openOrganizationDropdown(){
        return cy.get('div[class="el-select vs-c-new-board-select"]');
    }

    get selectOrganization(){
        return cy.get('ul[class="el-scrollbar__view el-select-dropdown__list"]').children().first();
    }

    get boardTitleInput() {
        return cy.get('input[name="name"]');
    }

    get goNextButton() {
        return cy.get('button[name="next_btn"]')
    }

    get boardTypeRadioButton() {
        return cy.get('span[class="vs-c-radio-check"]').first();
    }

    get finishButton(){
        return cy.get('button[class="el-button vs-c-button-focus el-button--success el-button--large"]').last();
    }

    // method for adding new board with assertions
    addNewBoardWithAssert(title){

        cy.intercept({
            method : 'POST',
            url : "boards"
        }).as('boardCreated');

        this.addNewButton.click();
        this.addBoardButton.click();
        this.openOrganizationDropdown.click();
        this.selectOrganization.click();
        this.boardTitleInput.type(title);
        this.goNextButton.click();
        this.boardTypeRadioButton.click();
        this.goNextButton.click();
        this.goNextButton.click();
        this.goNextButton.click();
        this.finishButton.click();

        cy.wait('@boardCreated').then(interception => {
            expect(interception.response.statusCode).eql(201);
            expect(interception.response.statusMessage).eql('Created');
        })
    };
    
    // method for adding new board without assertions
    addNewBoard(title){
        this.addNewButton.click();
        this.addBoardButton.click();
        this.openOrganizationDropdown.click();
        this.selectOrganization.click();
        this.boardTitleInput.type(title);
        this.goNextButton.click();
        this.boardTypeRadioButton.click();
        this.goNextButton.click();
        this.goNextButton.click();
        this.goNextButton.click();
        this.finishButton.click();
    };
    
    addBoardWithoutTitle(){
        this.addNewButton.click();
        this.addBoardButton.click();
        this.goNextButton.should('be.disabled');
    }
}

export const createBoard = new Board();