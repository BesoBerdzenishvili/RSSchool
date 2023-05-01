describe('test main page', () => {
  it('Writes name in search', () => {
    cy.visit('/');
    cy.get('.search-input').type('rick{enter}');
    cy.get('.search-input').should('have.value', 'rick');
  });
});

describe('test about page', () => {
  it('checks values', () => {
    cy.visit('/about');
    cy.get('h2').should('contain', 'About');
    cy.get('p').should('contain', 'This is a project for RS School.');
  });
});

describe('test 404 page', () => {
  it('checks values', () => {
    cy.visit('/wrong_page');
    cy.get('.error-msg').should('contain', '404');
  });
});

describe('Add form', () => {
  beforeEach(() => {
    cy.visit('/form');
  });

  it('should render the form', () => {
    cy.get('form').should('exist');
  });

  it('should display an error message if img is not provided', () => {
    cy.get('form').submit();
    cy.contains('Image is required').should('be.visible');
  });

  it('should display an error message if price is less than 1000', () => {
    cy.get('#price').type('500').blur();
    cy.get('form').submit();
    cy.contains('Price must be greater than or equal to 1000').should('be.visible');
  });

  it('should display an error message if priceType is not selected', () => {
    cy.get('#priceType').should('not.be.checked');
    cy.get('#priceType').parent().click();
    cy.get('form').submit();
    cy.contains('Price Type is required').should('be.visible');
  });

  it('should display an error message if description is not provided', () => {
    cy.get('#description').type('a').blur();
    cy.get('form').submit();
    cy.contains('Description must be at least 10 characters long').should('be.visible');
  });

  it('should display an error message if date is not provided', () => {
    cy.get('form').submit();
    cy.contains('Date is required').should('be.visible');
  });

  it('should display an error message if recieveEmails is not selected', () => {
    cy.get('#recieveEmails').select('');
    cy.get('form').submit();
    cy.contains('Recieve Emails is required').should('be.visible');
  });

  it('should display an error message if agreeTerms is not checked', () => {
    cy.get('#agreeTerms').should('not.be.checked');
    cy.get('form').submit();
    cy.get('#agreeTerms').check().should('be.checked');
  });
});
