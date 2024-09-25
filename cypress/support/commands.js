
Cypress.Commands.add('fillForm', ({ name, email, phone, dob, gender }) => {
    if (name !== undefined) {
      cy.get('#name').clear();
      if (name.trim() !== '') cy.get('#name').type(name);
    }
    if (email !== undefined) {
      cy.get('#email').clear();
      if (email.trim() !== '') cy.get('#email').type(email);
    }
    if (phone !== undefined) {
      cy.get('#phone').clear();
      if (phone.trim() !== '') cy.get('#phone').type(phone);
    }
    if (dob !== undefined) {
      cy.get('#dob').clear();
      if (dob.trim() !== '') cy.get('#dob').type(dob);
    }
    if (gender !== undefined && gender !== '') {
      cy.get('label[for="gender"]').next('select').select(gender);
    }
  });
  
  Cypress.Commands.add('submitForm', () => {
    cy.get('button[type="submit"]').contains('Submit').click();
  });
  
  Cypress.Commands.add('expectErrorMessage', (expectedMessage) => {
    cy.get(".message").should('be.visible').and('have.text', expectedMessage);
  });

  Cypress.Commands.add('testNameValidation', (name, expectedMessage) => {
    cy.fillForm({
      name: name,
      email: 'test@example.com',
      phone: '+37060000000',
      dob: '2000-01-01',
      gender: 'Male'
    });
    cy.submitForm();
    cy.expectErrorMessage(expectedMessage);
  });

  Cypress.Commands.add('testEmailValidation', (email, expectedMessage) => {
    cy.fillForm({
      name: 'Tom',
      email: email,
      phone: '+37060000000',
      dob: '2000-01-01',
      gender: 'Male'
    });
    cy.submitForm();
    cy.expectErrorMessage(expectedMessage);
  });

  Cypress.Commands.add('testPhoneValidation', (phone, expectedMessage) => {
    cy.fillForm({
      name: 'Tom',
      email: 'tom@gmail.com',
      phone: phone,
      dob: '2000-01-01',
      gender: 'Male'
    });
    cy.submitForm();
    cy.expectErrorMessage(expectedMessage);
  });

  Cypress.Commands.add('submitAndCheckRow', (data, expectedRowCount) => {
    cy.fillForm(data);
    cy.submitForm();
    cy.get("#infoTable tbody tr").should('have.length', expectedRowCount);
    cy.get("#infoTable tbody tr").last().within(() => {
      cy.get('td').eq(0).should('have.text', data.name);
      cy.get('td').eq(1).should('have.text', data.email);
      cy.get('td').eq(2).should('have.text', data.phone);
      cy.get('td').eq(3).should('have.text', data.dob);
      cy.get('td').eq(4).should('contain.text', 'years');  
      cy.get('td').eq(5).should('have.text', data.gender);
    });
  });