describe('e2e testing complete application', () => {
  it('should be able to use the whole app', () => {
    cy.visit('/')

    //Try to find pokemon by typing Lucario
    cy.findByRole('textbox', { name: /search/i }).type('Lucario')
    cy.wait(2000)

    //Create one because it does not exist/its not yours
    cy.findByRole('button', { name: /nuevo/i }).click()
    cy.findByRole('textbox', { name: /nombre/i }).type('Lucario')
    cy.findByRole('textbox', { name: /imagen/i }).type(
      'https://www.kindpng.com/picc/m/132-1326811_pokmon-lucario-lucario-png-transparent-png.png'
    )
    cy.findByRole('combobox').select('Normal')

    //You save your pokemon
    cy.findByRole('button', { name: /guardar/i }).click()
    cy.wait(1000)

    //You make sure you can find it
    cy.findByRole('textbox', { name: /search/i }).clear()
    cy.wait(1000)
    cy.findByRole('textbox', { name: /search/i }).type('Lucario')

    //You want to edit it since you have a wrong value
    cy.wait(2000)
    cy.get('[data-testid=edit-button]').first().click()
    cy.findByRole('combobox').select('Agua')
    cy.findByRole('button', { name: /guardar/i }).click()
    cy.wait(2000)

    //Now you want to delete it
    cy.get('[data-testid=delete-button]').first().click()
    cy.wait(1000)

    //Finally you look all the pokemon
    cy.findByRole('button', { name: /buscar todos/i }).click()
    cy.get('[data-testid=table-pokemon]').first().should('exist')
  })
})
