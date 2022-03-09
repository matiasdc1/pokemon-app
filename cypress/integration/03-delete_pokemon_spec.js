describe('delete a pokemon', () => {
  it('should be able to delete an existing pokemon', () => {
    cy.visit('/')
    cy.findByRole('textbox').type('Squirtle')
    const button = cy.get('[data-testid=delete-button]').first()
    button.click()
    button.should('not.exist')
  })
})
