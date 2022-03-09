describe('create pokemon', () => {
  it('should not be able to click if no name', () => {
    cy.visit('/')
    cy.findByRole('button', { name: /nuevo/i }).click()
    cy.findByRole('button', { name: /guardar/i }).should('be.disabled')
  })

  it('should be able to click if name', () => {
    cy.visit('/')
    cy.findByRole('button', { name: /nuevo/i }).click()
    cy.findByRole('textbox', { name: /nombre/i }).type('Charmander')
    cy.findByRole('button', { name: /guardar/i }).should('be.enabled')
  })

  it('should not be able to click if name and wrong url', () => {
    cy.visit('/')
    cy.findByRole('button', { name: /nuevo/i }).click()
    cy.findByRole('textbox', { name: /nombre/i }).type('Charmander')
    cy.findByRole('textbox', { name: /imagen/i }).type('wrong url')
    cy.findByRole('button', { name: /guardar/i }).should('be.disabled')
  })

  it('should not be able to click if name and right url', () => {
    cy.visit('/')
    cy.findByRole('button', { name: /nuevo/i }).click()
    cy.findByRole('textbox', { name: /nombre/i }).type('Charmander')
    cy.findByRole('textbox', { name: /imagen/i }).type(
      'https://www.pngmart.com/files/13/Charmander-PNG-HD.png'
    )
    cy.findByRole('button', { name: /guardar/i }).should('be.enabled')
  })

  it('should create a new pokemon', () => {
    cy.visit('/')
    cy.findByRole('button', { name: /nuevo/i }).click()
    cy.findByRole('textbox', { name: /nombre/i }).type('Charmander')
    cy.findByRole('button', { name: /guardar/i }).click()
    cy.findByRole('cell', { name: /charmander/i }).should('exist')
  })

  it('should close create', () => {
    cy.visit('/')
    cy.findByRole('button', { name: /nuevo/i }).click()
    cy.findByRole('button', { name: /cancelar/i }).click()
    cy.findByRole('heading', { name: /nuevo pokemon/i }).should('not.exist')
  })
})
