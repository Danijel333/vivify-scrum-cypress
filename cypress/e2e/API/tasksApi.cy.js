import login from "../../fixtures/apiMock/login"
import organization from "../../fixtures/apiMock/organization"
import board from "../../fixtures/apiMock/board"
import task from "../../fixtures/apiMock/task"

describe('Tasks', () => {
    let organizationID = ""
    let boardID = ""
    let taskID = ""

    beforeEach(() => {
        login.post({assert: false})
    })

    it('Create organization', () => {
        organization.post({
            statusCode: 201,
            statusText: "Created"
        }).then(response => {
            organizationID = response.body.id
        })
    })

    it('Create board', () => {
        board.post({organizationID: organizationID, type: "scrum_board"}).then(response => {
            boardID = response.body.id
        })
    })

    it('Create tasks without boardID', () => {
        task.post({
            boardID: "",
            statusCode: 403,
            statusText: "Forbidden",
        }).then(response => {
            expect(response.body.errors[0]).eq("This action is unauthorized.")
        })
    })

    it('Create tasks without name', () => {
        task.post({
            boardID: boardID,
            statusCode: 422,
            statusText: 'Unprocessable Entity',
            name: ''
        }).then(response => {
            expect(response.body["item.name"][0]).eq('The item.name field is required.')
        })
    })

    it('Create task with an object in the name field', () => {
        task.post({
            boardID: boardID,
            statusCode: 422,
            statusText: 'Unprocessable Entity',
            name: {"name" : "agsga"}
        })
    })

    it('Create task with an array in the name field', () => {
        task.post({
            boardID: boardID,
            statusCode: 422,
            statusText: 'Unprocessable Entity',
            name: [1,2,3]
        })
    })

    it('Create task with empty sprint_id', () => {
        task.post({
            boardID: boardID,
            statusCode: 422,
            statusText: 'Unprocessable Entity',
            sprint_id: ""
        })
    })

    it('Create task with an object in sprint_id', () => {
        task.post({
            boardID: boardID,
            statusCode: 422,
            statusText: 'Unprocessable Entity',
            sprint_id: {"sprint_id" : "fafa"}
        })
    })

    it('Create task with an array in sprint_id', () => {
        task.post({
            boardID: boardID,
            statusCode: 422,
            statusText: 'Unprocessable Entity',
            sprint_id: [1,2,3]
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

    it('All tasks', () => {
        task.get({boardID: boardID}).then(response =>{
            expect(response.body.tasks).to.be.a('array')
            expect(response.body.tasks.length).to.be.gt(0)
        })
    })

    it('Edit task without title', () => {
        task.put({
            taskID: taskID,
            name: "",
            statusCode: 400,
            statusText: "Bad Request"
        }).then(response => {
            expect(response.body.name[0]).eq("The title is required.")
        })
    })

    it('Edit task with an object in title field', () => {
        task.put({
            taskID: taskID,
            name: {"name" : "agsga"},
            statusCode: 400,
            statusText: "Bad Request"
        })
    })

    it('Edit task with an array in title field', () => {
        task.put({
            taskID: taskID,
            name: [1,2,3],
            statusCode: 400,
            statusText: "Bad Request"
        })
    })

    it('Edit task with invalid points id', () => {
        task.put({
            taskID: taskID,
            pointsID: "3412",
            statusCode: 400,
            statusText: "Bad Request"
        }).then(response => {
            expect(response.body.points_id[0]).eq("The selected points id is invalid.")
        })
    })

    it('Edit tasks with an array in description field', () =>{
        task.put({
            taskID: taskID,
            description: [1,2,3,4],
            statusCode: 400,
            statusText: "Bad Request"
        })
    })

    it('Edit tasks with an object in description field', () =>{
        task.put({
            taskID: taskID,
            description:  {"name" : "agsga"},
            statusCode: 400,
            statusText: "Bad Request"
        })
    })

    it('Edit tasks', () => {
        task.put({
            taskID: taskID
        }).then(response => {
            expect(response.body.id).eq(taskID)
            expect(response.body.board_id).eq(boardID)
            expect(response.body.name).eq('Task2')
        })
    })

    it('Delete task', () => {
        task.delete({taskID: taskID, boardID: boardID})
    })

    it('Delete a task that has already been deleted', () => {
        task.delete({taskID: taskID, boardID: boardID, statusCode: 404, statusText: "Not Found"})
    })
})