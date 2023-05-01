describe('test main page', () => {
  it('Writes name in search', () => {
    cy.visit('/');
    cy.get('.search-input').type('rick{enter}');
    cy.get('.search-input').should('have.value', 'rick');
  });
});
