const pageUrl = "http://127.0.0.1:8080/registration.html"

// Common functions for form interaction
const fillForm = ({ name, email, phone, dob, gender }) => {
  if (name !== undefined) cy.get("#name").clear().type(name);
  if (email !== undefined) cy.get("#email").clear().type(email);
  if (phone !== undefined) cy.get("#phone").clear().type(phone);
  if (dob !== undefined) cy.get("#dob").clear().type(dob);
  if (gender !== undefined) cy.get("#gender").select(gender);
};
const submitForm = () => {
  cy.get("button").click();
};

// Group for page load
describe('Page load and display elements', () => {
  beforeEach(() => {
    cy.visit(pageUrl); 
  });

  it('The page loads successfully', () => {
    cy.url().should('eq', pageUrl);
  })

  it('Displays registration form on load', () => {
    cy.get('h1').should('have.text', 'Registration Form');
  })

  it('Displays submit button on load', () => {
    cy.contains('button', 'Submit').should('be.visible');
  })

  it('Displays registered people table on load', () => {
    cy.get('h2').should('have.text', 'All Registered People');
  })

  it('Form is empty on load - except phone filed', () => {
    cy.get("#name").should('have.value', '');
    cy.get("#email").should('have.value', '');
    cy.get("#phone").should('not.have.value', ''); 
    cy.get("#phone").invoke('val').should('match', /^\+370\d{8}$/);
    cy.get("#dob").should('have.value', '');
    cy.get("#gender").should('have.value', '');
  })

  it('Generates a random phone number on page load', () => {
    cy.get("#phone").should('not.have.value', ''); 
    cy.get("#phone").invoke('val').should('match', /^\+370\d{8}$/);
  })

  it('Table is empty on load', () => {
    cy.get("#infoTable").should('be.visible');
    cy.get("#infoTable tbody tr").should('have.length', 0);  
  })
})

// Group for full form submission validations
describe('Full form submission validations', () => {
  beforeEach(() => {
    cy.visit(pageUrl); 
  });

  it('Allows form submission with valid data', () => {
    fillForm({
      name: 'Tom',
      email: 'tom@gmail.com',
      phone: '+37060000000',
      dob: '2000-01-01',
      gender: 'Male'
    });
    submitForm();
    cy.get("#infoTable tbody tr").should('have.length', 1); // Check that one row is added
    cy.get("#infoTable tbody tr").first().within(() => { // Verify the content of the newly added row
      cy.get('td').eq(0).should('have.text', 'Tom');
      cy.get('td').eq(1).should('have.text', 'tom@gmail.com');
      cy.get('td').eq(2).should('have.text', '+37060000000');
      cy.get('td').eq(3).should('have.text', '2000-01-01');
      cy.get('td').eq(4).should('have.text', '24 years');
      cy.get('td').eq(5).should('have.text', 'Male');
    });
  });

  it('Displays error if form is submitted with empty fields', () => {
    submitForm();
    cy.get(".result").should('be.visible').and('have.text', 'Please fill out all fields and select a gender');
  });

  it('Displays error if form contains only whitespace', () => {
    cy.get("#name").clear().type('   ');  
    cy.get("#email").clear().type('   '); 
    cy.get("#phone").clear().type('   '); 
    cy.get("#dob").clear();                
    cy.get("#gender").select('');           
    submitForm(); 
    cy.get(".result")
      .should('be.visible')
      .and('have.text', 'Please fill out all fields and select a gender');
  });
});

// Group for name submission validations
describe('Name submission validations', () => {
  beforeEach(() => {
    cy.visit(pageUrl); 
  });

  const testNameValidation = (name, expectedMessage) => {
    fillForm({
      name,
      email: 'test@example.com',
      phone: '+37060000000',
      dob: '2000-01-01',
      gender: 'Male'
    });
    submitForm();
    cy.get(".result").should('be.visible').and('have.text', expectedMessage);
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

// Group for email submission validations
describe('Email submission validations', () => {
  beforeEach(() => {
    cy.visit(pageUrl); 
  });

  const testEmailValidation = (email, expectedMessage) => {
    fillForm({
      name: 'Tom',
      email,
      phone: '+37060000000',
      dob: '2000-01-01',
      gender: 'Male'
    });
    submitForm();
    cy.get(".result").should('be.visible').and('have.text', expectedMessage);
  };

  it('Displays error for invalid email format', () => {
    testEmailValidation('tom@invalid', 'Please enter a valid email address');
  });

  it('Displays error for email without domain', () => {
    testEmailValidation('tom@', 'Please enter a valid email address');
  });

  it('Displays error if email already exists', () => {
    fillForm({  // First submission with a unique email
      name: 'Tom',
      email: 'tom@gmail.com',
      phone: '+37060000000',
      dob: '2000-01-01',
      gender: 'Male'
    });
    submitForm();
    cy.get("#infoTable tbody tr").should('have.length', 1);
    cy.get("#infoTable tbody").contains('tom@gmail.com').should('exist');
    // Refill the form for the second submission with the same email
    fillForm({
      name: 'Tom',
      email: 'tom@gmail.com',
      phone: '+37060000000',
      dob: '2000-01-01',
      gender: 'Male'
    });
    submitForm();
    cy.get("#infoTable tbody tr").should('have.length', 1);
    cy.get(".result").should('be.visible').and('have.text', 'A person with this email already exists');
  });
});

// Group for phone submission validations
describe('Phone submission validations', () => {
  beforeEach(() => {
    cy.visit(pageUrl); 
  });

  const testPhoneValidation = (phone, expectedMessage) => {
    fillForm({
      name: 'Tom',
      email: 'tom@gmail.com',
      phone,
      dob: '2000-01-01',
      gender: 'Male'
    });
    submitForm();
    cy.get(".result").should('be.visible').and('have.text', expectedMessage);
  };

  it('Displays error for phone number that contains letters', () => {
    testPhoneValidation('+370600000abcabc', 'Phone number must contain +370 and 8 more digits');
  });

  it('Displays error for too short phone number length', () => {
    testPhoneValidation('+370600000', 'Phone number must contain +370 and 8 more digits');
  });

  it('Displays error for too long phone number length', () => {
    testPhoneValidation('+3706000000000000', 'Phone number must contain +370 and 8 more digits');
  });
});
  
// Group for birth date submission validations
describe('Birth date submission validations', () => {
  beforeEach(() => {
    cy.visit(pageUrl); 
  });

  it('Displays error when date of birth is in the future', () => {
    fillForm({
      name: 'Tom',
      email: 'tom@gmail.com',
      phone: '+37060000000',
      dob: '2090-01-01',
      gender: 'Male'
    });
    submitForm();
    cy.get(".result").should('be.visible').and('have.text', 'Date of birth cannot be in the future');
  });
});

// Group for gender submission validations
describe('Gender submission validations', () => {
  beforeEach(() => {
    cy.visit(pageUrl); 
  });

  it('Displays error when no gender is selected', () => {
    fillForm({
      name: 'Tom',
      email: 'tom@gmail.com',
      phone: '+37060000000',
      dob: '2000-01-01',
      gender: ''
    });
    submitForm();
    cy.get(".result").should('be.visible').and('have.text', 'Please fill out all fields and select a gender');
  });
});
  
// Group for registred people table
describe('Table and data display', () => {
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

  it('Updates the table with submitted information', () => {
    const data = {
      name: 'Tom',
      email: 'tom@gmail.com',
      phone: '+37060000000',
      dob: '2000-01-01',
      gender: 'Male'
    };
    submitAndCheckRow(data, 1);
  });

  it('Allows multiple submissions with identical data except email', () => {
    const firstData = {
      name: 'Tom',
      email: 'tom1@gmail.com',
      phone: '+37060000000',
      dob: '2000-01-01',
      gender: 'Male'
    };
    submitAndCheckRow(firstData, 1);

    const secondData = {
      name: 'Tom',
      email: 'tom2@gmail.com',
      phone: '+37060000000',
      dob: '2000-01-01',
      gender: 'Male'
    };
    submitAndCheckRow(secondData, 2);
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


// Group for form reset and cleared state
describe('Form Reset and Cleared State', () => {
  beforeEach(() => {
    cy.visit(pageUrl); 
  });

  it('Clears the form fields after successful submission', () => {
    const data = {
      name: 'Tom',
      email: 'tom@gmail.com',
      phone: '+37060000001',
      dob: '2000-01-01',
      gender: 'Male'
    };
    fillForm(data);
    submitForm();
    cy.get("#name").should('have.value', '');
    cy.get("#email").should('have.value', '');
    cy.get("#phone").should('have.value', '');
    cy.get("#dob").should('have.value', '');
    cy.get("#gender").should('have.value', '');
  });
});


