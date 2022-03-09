describe('edit pokemon', () => {
  it('should be able to edit an existing pokemon', () => {
    cy.visit('/')
    cy.findByRole('textbox').type('Charmander')
    cy.get('[data-testid=edit-button]').first().click()
    cy.findByRole('textbox', { name: /nombre/i })
      .clear()
      .type('Squirtle')
    cy.findByRole('combobox').select('Agua')
    cy.findByRole('button', { name: /guardar/i }).click()
    cy.findByRole('cell', { name: /squirtle/i }).should('exist')
  })

  it('edited pokemon should be find by API', () => {
    cy.visit('/')
    cy.findByRole('textbox').type('Squirtle')
    cy.get('[data-testid=table-pokemon]').first().contains('Squirtle')
  })
})
