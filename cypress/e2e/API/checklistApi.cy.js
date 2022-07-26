import login from "../../fixtures/apiMock/login"
import organization from "../../fixtures/apiMock/organization"
import checklist from "../../fixtures/apiMock/checklist"
import task from "../../fixtures/apiMock/task"
import board from "../../fixtures/apiMock/board"

describe ('Checklists', () => {
    let organization_id = ""
    let boardID = ""
    let taskID = ""
    let checklistID = ""

    beforeEach(() => {
        login.post({assert: false})
    })

    it('Create organization', () => {
        organization.post({
            statusCode: 201,
            statusText: "Created"
        }).then(response => {
            organization_id = response.body.id
        })
    })

    it('Create board', () => {
        board.post({
            organization_id: organization_id,
            type: "scrum_board"
        }).then(response => {
            boardID = response.body.id
        })
    })

    it('Create task', () => {
        task.post({
            boardID: boardID,
            statusCode: 201,
            statusText: 'Created'
        }).then(response =>{
            expect(response.body.name).eq('Task')
            expect(response.body.board_id).eq(boardID)
            taskID = response.body.id
        })
    })

    it('Create checklist without title', () => {
        checklist.post({
            title: "",
            taskID: taskID,
            statusCode: 400,
            statusText: "Bad Request"}).then(response => {
                expect(response.body.title[0]).eq('The title field is required.')
            })
    })

    it('Create checklist with a object in title', () => {
        checklist.post({
            title: {title: "test"},
            taskID: taskID,
            statusCode: 400,
            statusText: "Bad Request"}).then(response => {
                expect(response.body.title[0]).eq('The title field is required.')
            })
    })

    it('Create checklist with an array in title', () => {
        checklist.post({
            title: [1,2,3,4],
            taskID: taskID,
            statusCode: 400,
            statusText: "Bad Request"}).then(response => {
                expect(response.body.title[0]).eq('The title field is required.')
            })
    })

    it('Create checklist', () => {
        checklist.post({
            taskID: taskID,
            statusCode: 201,
            statusText: "Created"}).then(response => {
                expect(response.body.title).eq("Checklist 3")
                expect(response.body.task_id).eq(taskID)
                checklistID = response.body.id
            })
    })

    it('All checklists', () => {
        checklist.get({
            taskID: taskID,
            statusCode: 200,
            statusText: "OK"}).then(response => {
                expect(response.body.checklists).to.be.a('array')
                expect(response.body.checklists.length).to.be.gt(0)
            })
    })

    it('Edit checklist withou title', () => {
        checklist.put({
            title: "",
            checklistID: checklistID,
            taskID: taskID,
            statusCode: 400,
            statusText: "Bad Request"
        }).then(response => {
            expect(response.body.title[0]).eq("The title field is required.")
        })
    })

    it('Edit checklist with an array in title', () => {
        checklist.put({
            title: [1,2,3],
            checklistID: checklistID,
            taskID: taskID,
            statusCode: 400,
            statusText: "Bad Request"
        }).then(response => {
            expect(response.body.title[0]).eq("The title field is required.")
        })
    })

    it('Edit checklist with a object in title', () => {
        checklist.put({
            title: {title: "test3"},
            checklistID: checklistID,
            taskID: taskID,
            statusCode: 400,
            statusText: "Bad Request"
        }).then(response => {
            expect(response.body.title[0]).eq("The title field is required.")
        })
    })

    it('Edit checklist', () => {
        checklist.put({
            checklistID: checklistID,
            taskID: taskID,
            statusCode: 200,
            statusText: "OK"
        }).then(response => {
            expect(response.body.title).eq("Checklist 55")
        })
    })

    it('Delete checklist', () => {
        checklist.delete({
            checklistID: checklistID,
            taskID: taskID,
            statusCode: 200,
            statusText: "OK"
        })
    })

    it('Delete a checklist that has already been deleted', () => {
        checklist.delete({
            checklistID: checklistID,
            taskID: taskID,
            statusCode: 404,
            statusText: "Not Found"
        })
    })

    it('Delete organization', () => {
        organization.delete({statusCode: 201, statusText: "Created", organizationID: organization_id})
    })
})