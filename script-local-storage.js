
// function calculateAge(dob) {
//     const birthDate = new Date(dob);
//     const today = new Date();
    
//     let years = today.getFullYear() - birthDate.getFullYear();
//     let months = today.getMonth() - birthDate.getMonth();
//     let days = today.getDate() - birthDate.getDate();
    
//     if (months < 0 || (months === 0 && days < 0)) {
//         years--;
//         months += 12;
//     }

//     if (days < 0) {
//         months--;
//         const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
//         days += lastMonth.getDate();
//     }

//     if (years === 0 && months === 0) {
//         return `${days} days`;
//     } else if (years === 0) {
//         return `${months} months`;
//     } else {
//         return `${years} years`;
//     }
// }

// function generateRandomPhoneNumber() {
//     let phoneNumber = '+370'; 
//     for (let i = 0; i < 8; i++) {
//         phoneNumber += Math.floor(Math.random() * 10);
//     }
//     return phoneNumber;
// }

// // Function to retrieve stored data from localStorage
// function getStoredData() {
//     const storedData = localStorage.getItem('registeredPeople');
//     return storedData ? JSON.parse(storedData) : [];
// }

// // Function to save data to localStorage
// function saveDataToLocalStorage(data) {
//     const storedData = getStoredData();
//     storedData.push(data);
//     localStorage.setItem('registeredPeople', JSON.stringify(storedData));
// }

// // Function to populate the table with data from localStorage
// function populateTable() {
//     const storedData = getStoredData();
//     const table = document.getElementById("infoTable").getElementsByTagName('tbody')[0];

//     // Clear current table rows
//     table.innerHTML = "";

//     // Populate table rows with stored data
//     storedData.forEach((person) => {
//         const newRow = table.insertRow();

//         newRow.insertCell(0).innerHTML = person.name;
//         newRow.insertCell(1).innerHTML = person.email;
//         newRow.insertCell(2).innerHTML = person.phone;
//         newRow.insertCell(3).innerHTML = person.dob;
//         newRow.insertCell(4).innerHTML = person.age;
//         newRow.insertCell(5).innerHTML = person.gender;

//         // Apply red background for people under 18 years old
//         if (person.age.includes('years')) {
//             const years = parseInt(person.age.split(' ')[0]); // Extract the numeric part of the age
//             if (years < 18) {
//                 newRow.classList.add('table-row-under-18');
//             }
//         } else if (person.age.includes('months')) {
//             const months = parseInt(person.age.split(' ')[0]); // Extract the numeric part of the age
//             if (months < 12 * 18) { // Less than 18 years in months
//                 newRow.classList.add('table-row-under-18');
//             }
//         } else if (person.age.includes('days')) {
//             const days = parseInt(person.age.split(' ')[0]); // Extract the numeric part of the age
//             if (days < 365 * 18) { // Less than 18 years in days
//                 newRow.classList.add('table-row-under-18');
//             }
//         }
//     });
// }

// function submitForm() {
//     // Get values from input fields
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const phone = document.getElementById('phone').value;
//     const dob = document.getElementById('dob').value;
//     const gender = document.getElementById('gender').value;
//     const result = document.querySelector(".result");
    
//     // Validation to ensure no empty fields
//     if (name === "" || email === "" || phone === "" || dob === "" || gender === "") {
//         result.innerText = 'Please fill out all fields and select a gender';
//         result.style.display = 'block';
//         return;
//     }

//     // Name validation 
//     const namePattern = /^[A-Za-z\s]+$/;
//     if (!namePattern.test(name) || name.length > 50) {
//         result.innerText = 'Name should only contain letters and spaces, and be a maximum of 50 characters';
//         result.style.display = 'block';
//         return;
//     }

//     // Email validation
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(email)) {
//         result.innerText = 'Please enter a valid email address';
//         result.style.display = 'block';
//         return;
//     }

//     // Phone validation
//     const phonePattern = /^\+370\d{8}$/;
//     if (!phonePattern.test(phone)) {
//         result.innerText = 'Phone number must contain +370 and 8 more digits';
//         result.style.display = 'block';
//         return;
//     }

//     // Validate date of birth to ensure it is not in the future
//     const dobDate = new Date(dob);
//     const today = new Date();
    
//     if (dobDate > today) {
//         result.innerText = 'Date of birth cannot be in the future';
//         result.style.display = 'block';
//         return;
//     }

//     // Calculate age based on date of birth
//     const age = calculateAge(dob);

//     // Create a person object
//     const person = {
//         name: name,
//         email: email,
//         phone: phone,
//         dob: dob,
//         age: age,
//         gender: gender
//     };

//     // Save the person to localStorage
//     saveDataToLocalStorage(person);

//     // Re-populate the table with updated data
//     populateTable();

//     // Clear input fields after submission
//     document.getElementById('name').value = "";
//     document.getElementById('email').value = "";
//     document.getElementById('phone').value = "";
//     document.getElementById('dob').value = "";
//     document.getElementById('gender').value = "";
// }

// // Populate the table when the page loads
// window.onload = function() {
//     populateTable();
//     document.getElementById('phone').value = generateRandomPhoneNumber();
// };
