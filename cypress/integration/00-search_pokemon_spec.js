//Make sure there is a Pikachu in the API.

describe('search pokemon', () => {
  it('should not search if less <=2 characters', () => {
    cy.visit('/')
    cy.findByRole('textbox').type('Pi')
    cy.wait(1000)
    cy.get('[data-testid=table-row]').should('not.exist')
  })

  it('should search if >2 characters', () => {
    cy.visit('/')
    cy.findByRole('textbox').type('Pikachu')
    cy.wait(2000)
    cy.get('[data-testid=table-row]').should('exist')
  })

  it('should search all if button is pressed', () => {
    cy.visit('/')
    cy.findByText(/buscar todos/i).click()
    cy.wait(2000)
    cy.get('[data-testid=table-row]').should('exist')
  })

  it('should open add pokemon if button is pressed', () => {
    cy.visit('/')
    cy.findByRole('button', { name: /nuevo/i }).click()
    cy.findByRole('heading', { name: /nuevo pokemon/i }).should('exist')
  })
})
