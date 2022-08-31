// Your tests go in here. Happy coding! 🤓
describe('Integration tests for ticket form', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Form is successfully sent', () => {
        cy.get('#name').type('Test name')
        cy.get('#email').type('test.email@email.com')
        cy.get('#subject').type('Test subject')
        cy.get('#message').type('Test message')
        cy.contains('button', 'Submit').click()

        cy.intercept('POST', '/v2/tickets/new', {
            statusCode: 200,
            body: { id: 'ABCD' },
        })
        cy.contains('Thank you!').should('be.visible')
    })

    it('Form fails to be sent', () => {
        cy.get('#name').type('Test name')
        cy.get('#email').type('test.email@email.com')
        cy.get('#subject').type('Test subject')
        cy.get('#message').type('Test message')
        cy.contains('button', 'Submit').click()

        cy.intercept('POST', '/v2/tickets/new', {
            statusCode: 500,
            body: { error: 'Internal server error' },
        })
        cy.contains('Error!').should('be.visible')
    })
})
