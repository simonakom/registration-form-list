const pageUrl = "http://127.0.0.1:8080/registration.html"

const formData = {
  name: 'Tom',
  email: 'tom@gmail.com',
  phone: '+37060000000',
  dob: '2000-01-01',
  gender: 'Male'
};

const fillForm = ({ name, email, phone, dob, gender }) => {
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
};

const submitForm = () => {
  cy.get('button[type="submit"]').contains('Submit').click();
};

function expectErrorMessage(expectedMessage) {
  cy.get(".message").should('be.visible').and('have.text', expectedMessage);
}

// --------------------------------------Test Suits---------------------------------------------

// Group 1: Page load and display elements
describe('Page load and display elements', () => {
  beforeEach(() => {
    cy.visit(pageUrl); 
  });

  it('The page is loaded successfully', () => {
    cy.url().should('eq', pageUrl);
  })

  it('Favicon is loaded correctly', () => {
    cy.get('link[rel="icon"]').should('have.attr', 'href', 'form.png');
  });

  it('Displays "registration" form text on load', () => {
    cy.get('h1').should('have.text', 'Registration Form'); 
  })

  it('Displays "registered people" table text on load', () => {
    cy.get('h2').should('have.text', 'All Registered People');
  })

  it('Displays "submit" button on load', () => {
    cy.get('button[type="submit"]').should('be.visible');
  })

  it('"Registration" form fields are initially empty except phone field', () => {
    cy.get('#name').should('have.value', ''); 
    cy.get('#email').should('have.value', ''); 
    cy.get('#phone').invoke('val').should('match', /^\+370\d{8}$/); 
    cy.get('#dob').should('have.value', '');
    cy.get('#gender').should('have.value', '');
  });

  it('In "Registration" form random phone number is generated on load', () => {
    cy.get('#phone').invoke('val').should('match', /^\+370\d{8}$/); 
  })

  it('"Registered people" table is empty on load', () => {
    cy.get('#infoTable tbody tr').should('have.length', 0); 
  })

  it('Error message is not visible on load', function () {
    cy.get('.message').should('not.be.visible');
  });
})

// Group 2: Registration form input fields/labels existence and validation
describe('"Registration" form input fields/labels existence and validation', () => {
  beforeEach(() => {
    cy.visit(pageUrl); 
  });

    describe('"Registration" form input fields existence and validation', () => {

    it('The name input field exists with correct attributes', () => {
      cy.get("#name")
        .should('exist')
        .and('have.attr', 'type', 'text')
        .and('have.attr', 'placeholder', 'John')
        .and('have.attr', 'pattern', '[A-Za-z\\s]+')
        .and('have.attr', 'title', 'Name should only contain letters and spaces');
    });

    it('The email input field exists with correct attributes', () => {
      cy.get("#email")
        .should('exist')
        .and('have.attr', 'type', 'email')
        .and('have.attr', 'placeholder', 'john@email.com')
        .and('have.attr', 'required', 'required');
    });

    it('The phone input field exists with correct attributes', () => {
      cy.get("#phone")
        .should('exist')
        .and('have.attr', 'type', 'tel')
        .and('have.attr', 'placeholder', 'Enter your phone number')
        .and('have.attr', 'pattern', '\\d+')
        .and('have.attr', 'title', 'Phone number should only contain numbers');
    });

    it('The date of birth input field exists with correct attributes', () => {
      cy.get('#dob').should('exist').and('have.attr', 'type', 'date');
    });

    it('The gender input field exists with correct attributes', () => {
      cy.get("#gender").should('exist').and('have.attr', 'id', 'gender').find('option').should(($options) => {
          expect($options).to.have.length(4); 
          expect($options.eq(0)).to.contain('Select Gender');
          expect($options.eq(1)).to.contain('Male');
          expect($options.eq(2)).to.contain('Female');
          expect($options.eq(3)).to.contain('Other');
        });
      });
    });

    describe('"Registration" form labels existence and validation', () => {
    
      it('Form has labels for all required input fields', () => {
        cy.get('label[for="name"]').should('exist').and('have.text', 'Full Name:');
        cy.get('label[for="email"]').should('exist').and('have.text', 'Email:');
        cy.get('label[for="phone"]').should('exist').and('have.text', 'Phone Number:');
        cy.get('label[for="dob"]').should('exist').and('have.text', 'Date of Birth:');
        cy.get('label[for="gender"]').should('exist').and('have.text', 'Gender:');
      });
    });

});

// Group 3: Registration form submission validations
describe('"Registration" form submission validations', () => {
  beforeEach(() => {
    cy.visit(pageUrl); 
  });

    // Full form submission validations
    describe('Full form submission validations', () => {

      it('Successful form submission with valid data', () => {
        fillForm(formData);
        submitForm();
        cy.get("#infoTable tbody tr").should('have.length', 1);
        cy.get("#infoTable tbody tr").first().within(() => { 
          cy.get('td').eq(0).should('have.text', formData.name);
          cy.get('td').eq(1).should('have.text', formData.email);
          cy.get('td').eq(2).should('have.text', formData.phone);
          cy.get('td').eq(3).should('have.text', formData.dob);
          cy.get('td').eq(4).should('have.text', '24 years');
          cy.get('td').eq(5).should('have.text', formData.gender);
        });
      });

      it('Displays error if form is submitted with empty fields', () => {
        submitForm();
        expectErrorMessage('Please fill out all fields and select a gender');
      });

      it('Displays error if form contains only whitespace', () => {
        fillForm({
            name: '   ',
            email: '   ',
            phone: '   ',
            dob: '',
            gender: ''
        });
        submitForm();
        expectErrorMessage('Please fill out all fields and select a gender');
      });
    });

  // "Name" submission validations
  describe('Name submission validations', () => {

    const testNameValidation = (name, expectedMessage) => {
      fillForm({
        name: name,
        email: 'test@example.com',
        phone: '+37060000000',
        dob: '2000-01-01',
        gender: 'Male'
      });
      submitForm();
      expectErrorMessage(expectedMessage);
    };

    it('Displays error if name is too short', () => {
      testNameValidation('A', 'Name should only contain letters and spaces, and be between 2 and 50 characters');
    });

    it('Displays error if name is too long', () => {
      testNameValidation('A'.repeat(51), 'Name should only contain letters and spaces, and be between 2 and 50 characters');
    });

    it('Displays error if name contains symbols', () => {
      testNameValidation('John@#$', 'Name should only contain letters and spaces, and be between 2 and 50 characters');
    });

    it('Displays error if name contains numbers', () => {
      testNameValidation('John123', 'Name should only contain letters and spaces, and be between 2 and 50 characters');
    });
  });

  // "Email" submission validations
  describe('Email submission validations', () => {

    const testEmailValidation = (email, expectedMessage) => {
      fillForm({
        name: 'Tom',
        email: email,
        phone: '+37060000000',
        dob: '2000-01-01',
        gender: 'Male'
      });
      submitForm();
      expectErrorMessage(expectedMessage);
    };

    it('Displays error for invalid email format', () => {
      testEmailValidation('tom@invalid', 'Please enter a valid email address');
    });

    it('Displays error for email without domain', () => {
      testEmailValidation('tom@', 'Please enter a valid email address');
    });

    it('Displays error if email already exists', function () {
      fillForm(formData);
      submitForm();
      cy.get("#infoTable tbody tr").should('have.length', 1);
      fillForm(formData); 
      submitForm();
      expectErrorMessage('A person with this email already exists');
    });
  });

  // "Phone" submission validations
  describe('Phone submission validations', () => {

    const testPhoneValidation = (phone, expectedMessage) => {
      fillForm({
        name: 'Tom',
        email: 'tom@gmail.com',
        phone: phone,
        dob: '2000-01-01',
        gender: 'Male'
      });
      submitForm();
      cy.get(".message").should('be.visible').and('have.text', expectedMessage);
    };

    it('Displays error for phone number that contains letters', () => {
      testPhoneValidation('+370600abcabc', 'Phone number must contain +370 and 8 more digits');
    });

    it('Displays error for too short phone number length', () => {
      testPhoneValidation('+370600', 'Phone number must contain +370 and 8 more digits');
    });

    it('Displays error for too long phone number length', () => {
      testPhoneValidation('+3706000000000000', 'Phone number must contain +370 and 8 more digits');
    });

    it('Displays error for phone number without country code', () => {
      testPhoneValidation('60000000', 'Phone number must contain +370 and 8 more digits');
    });

    it('Displays error for phone number with spaces', () => {
      testPhoneValidation('370888 8888', 'Phone number must contain +370 and 8 more digits');
    });
  });
    
  // "Birth date" submission validations
  describe('Birth date submission validations', () => {

    it('Displays error when date of birth is in the future', () => {
      fillForm({
        name: 'Tom',
        email: 'tom@gmail.com',
        phone: '+37060000000',
        dob: '2090-01-01',
        gender: 'Male'
      });
      submitForm();
      cy.get(".message").should('be.visible').and('have.text', 'Date of birth cannot be in the future');
    });
  });

  // "Gender" submission validations
  describe('Gender submission validations', () => {

    it('Displays error when no gender is selected', () => {
      fillForm({
        name: 'Tom',
        email: 'tom@gmail.com',
        phone: '+37060000000',
        dob: '2000-01-01',
        gender: ''
      });
      submitForm();
      cy.get(".message").should('be.visible').and('have.text', 'Please fill out all fields and select a gender');
    });
  });
})

// Group 4: Registration form reset
describe('"Registration" form reset', () => {
  beforeEach(() => {
    cy.visit(pageUrl); 
  });

  it('Clears the form fields after successful submission', () => {
    fillForm(formData);
    submitForm();
    cy.get("#name").should('have.value', '');
    cy.get("#email").should('have.value', '');
    cy.get("#phone").should('have.value', '');
    cy.get("#dob").should('have.value', '');
    cy.get("#gender").should('have.value', '');
  });
});

// Group 5: Submit button existence and behavior
describe('Submit button existence and behavior', () => {
  beforeEach(() => {
    cy.visit(pageUrl); 
  });

  it('Submit button exists and is visible', () => {
    cy.contains('button', 'Submit').should('exist').and('be.visible');
  });

  it('Submit button is clickable', () => {
    cy.contains('button', 'Submit').should('not.be.disabled');
  });
});

// Group 6: Registered people table validations
describe('"Registered people" table validations', () => {
  beforeEach(() => {
    cy.visit(pageUrl); 
  });

  const submitAndCheckRow = (data, expectedRowCount) => {
    fillForm(data);
    submitForm();
    cy.get("#infoTable tbody tr").should('have.length', expectedRowCount);
    cy.get("#infoTable tbody tr").last().within(() => {
      cy.get('td').eq(0).should('have.text', data.name);
      cy.get('td').eq(1).should('have.text', data.email);
      cy.get('td').eq(2).should('have.text', data.phone);
      cy.get('td').eq(3).should('have.text', data.dob);
      cy.get('td').eq(4).should('contain.text', 'years');  
      cy.get('td').eq(5).should('have.text', data.gender);
    });
  };

  it('Table has correct columns', () => {
    cy.get("#infoTable thead tr").within(() => {
      cy.get('th').eq(0).should('have.text', 'Full Name'); 
      cy.get('th').eq(1).should('have.text', 'Email'); 
      cy.get('th').eq(2).should('have.text', 'Phone'); 
      cy.get('th').eq(3).should('have.text', 'Date of Birth');
      cy.get('th').eq(4).should('have.text', 'Age'); 
      cy.get('th').eq(5).should('have.text', 'Gender'); 
    });
  });

  it('Table is updated successfully with submitted information from form', () => {
    submitAndCheckRow(formData, 1);
  });

  it('Allows multiple submissions with identical data except email', () => {
    submitAndCheckRow(formData, 1);

    const dataWithDifferentEmail = {
      name: 'Tom',
      email: 'tom2@gmail.com',
      phone: '+37060000000',
      dob: '2000-01-01',
      gender: 'Male'
    };
    submitAndCheckRow(dataWithDifferentEmail, 2);
  });

  it('Does not add red background for users over 18 years old', () => {
    fillForm(formData);
    submitForm();
    cy.get("#infoTable tbody tr").last().should('not.have.class', 'table-row-under-18');  
  });

  it('Adds red background for users under 18 years old', () => {
    const data = {
      name: 'Anna',
      email: 'anna@gmail.com',
      phone: '+37060000001',
      dob: '2010-01-01',
      gender: 'Female'
    };
    fillForm(data);
    submitForm();
    cy.get("#infoTable tbody tr").last().should('have.class', 'table-row-under-18');  
  });
});




