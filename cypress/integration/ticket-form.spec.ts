// Your tests go in here. Happy coding! 🤓
describe('Submitting ticket form', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('#name').type('Test name')
        cy.get('#email').type('test.email@email.com')
        cy.get('#subject').type('Test subject')
        cy.get('#message').type('Test message')
        cy.contains('button', 'Submit').click()
    })

    it('Form is successfully sent', () => {
        cy.intercept('POST', '*/tickets/new', {
            statusCode: 200,
            body: { id: 'ABCD' },
        }).as('FormSuccess')
        cy.wait('@FormSuccess')
        cy.contains('Thank you!').should('be.visible')
    })

    it('Form fails to be sent', () => {
        cy.intercept('POST', '*/tickets/new', {
            statusCode: 500,
            body: { error: 'Internal server error' },
        }).as('FormFail')
        cy.wait('@FormFail')
        cy.contains('Error!').should('be.visible')
    })
})
