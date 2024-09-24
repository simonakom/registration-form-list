// Array to store existing emails
const existingEmails = [];

// Function to calculate age
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    
    // Birth month hasn't occurred yet in the current year
    if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
    }
    // Birthday hasn't occurred yet in the current month
    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0); // Get the number of days in the previous month
        days += lastMonth.getDate();
    }
    // If the person is less than 1 month old, return days
    if (years === 0 && months === 0) {
        return `${days} days`;
    } else if (years === 0) {
        return `${months} months`;
    } else {
        return `${years} years`;
    }
}


// Function to generate a random phone number
function generateRandomPhoneNumber() {
    let phoneNumber = '+370'; 
    for (let i = 0; i < 8; i++) {
        phoneNumber += Math.floor(Math.random() * 10);
    }
    return phoneNumber;
}

// Set the random phone number when the page loads
window.onload = function() {
    document.getElementById('phone').value = generateRandomPhoneNumber();
};

// Function to validate input fields
function validateFields(name, email, phone, dob, gender) {

    // Check for empty fields
    if (name === "" || email === "" || phone === "" || dob === "" || gender === "") {
        return 'Please fill out all fields and select a gender';
    }

    // Name validation
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(name) || name.length < 2 || name.length > 50) {
        return 'Name should only contain letters and spaces, and be between 2 and 50 characters';
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        return 'Please enter a valid email address';
    }
    if (existingEmails.includes(email)) {
        return 'A person with this email already exists';
    }

    // Check if email already exists
    if (existingEmails.includes(email)) {
        return 'A person with this email already exists';
    }

    // Phone validation
    const phonePattern = /^\+370\d{8}$/;
    if (!phonePattern.test(phone)) {
        return 'Phone number must contain +370 and 8 more digits';
    }

    // Date of birth validation
    const dobDate = new Date(dob);
    if (dobDate > new Date()) {
        return 'Date of birth cannot be in the future';
    }

    return null; // No errors
}

// Function to insert the values into the table
function insertRowIntoTable(name, email, phone, dob, age, gender) {
    const table = document.getElementById("infoTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).innerHTML = name;
    newRow.insertCell(1).innerHTML = email;
    newRow.insertCell(2).innerHTML = phone;
    newRow.insertCell(3).innerHTML = dob;
    newRow.insertCell(4).innerHTML = age; 
    newRow.insertCell(5).innerHTML = gender; 

    // Check if the person is under 18 and apply red background if true
    const years = age.includes('years') ? parseInt(age.split(' ')[0]) : 0;
    const months = age.includes('months') ? parseInt(age.split(' ')[0]) : 0;
    const days = age.includes('days') ? parseInt(age.split(' ')[0]) : 0;

    // Determine if the person is under 18
    if (years < 18 || (years === 18 && (months < 0 || (months === 0 && days < 0)))) {
        newRow.classList.add('table-row-under-18');
    }
}

// Function to handle form submission
function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const message = document.querySelector(".message");

    // Clear previous message message
    message.innerText = ''; 
    message.style.display = 'none'; 

    // Validate input fields
    const validationError = validateFields(name, email, phone, dob, gender);
    if (validationError) {
        message.innerText = validationError;
        message.style.display = 'block';
        return;
    }

    // Calculate age based on date of birth
    const age = calculateAge(dob);

    // Insert the values into the table
    insertRowIntoTable(name, email, phone, dob, age, gender);

    // Add the email to the list of existing emails
    existingEmails.push(email);
    
    // Clear input fields after submission
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('dob').value = "";
    document.getElementById('gender').value = "";
}