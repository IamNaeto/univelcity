/**
 * Project: Refining Interactivity with OOP
 * Deliverable: Refactor your code to use JavaScript classes, handle data using JSON, and implement basic form
 * validation with regular expressions.
 **/


// Define a class for handling form validation
class FormValidator {
    constructor() {
      // Define regular expressions for validation
      this.emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      this.passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    }
  
    // Validate email input
    validateEmail(email) {
      return this.emailPattern.test(email);
    }
  
    // Validate password input
    validatePassword(password) {
      return this.passwordPattern.test(password);
    }
  }
  
  // Example usage:
  const validator = new FormValidator();
  console.log(validator.validateEmail('example@example.com')); // true
  console.log(validator.validatePassword('Abcdef1@')); // true
  
  // Define a class to handle user authentication
  class AuthManager {
    constructor() {
      // Initialize with empty user data
      this.users = [];
    }
  
    // Register a new user
    registerUser(userData) {
      // Check if the email is already registered
      const existingUser = this.users.find(user => user.email === userData.email);
      if (existingUser) {
        console.error("User already exists with this email.");
        return false; // User already exists, registration failed
      }
      
      // Add the new user to the list
      this.users.push(userData);
      console.log("User registered successfully.");
      return true; // Registration successful
    }
  
    // Login user
    loginUser(email, password) {
      // Find the user with the given email
      const user = this.users.find(user => user.email === email);
  
      // Check if user exists
      if (!user) {
        console.error("User not found.");
        return false; // User not found, login failed
      }
  
      // Check if the password matches
      if (user.password !== password) {
        console.error("Incorrect password.");
        return false; // Incorrect password, login failed
      }
  
      console.log("User logged in successfully.");
      return true; // Login successful
    }
  }
  
  // Example usage:
  const authManager = new AuthManager();
  
  // Register a new user
  authManager.registerUser({ email: 'example@example.com', password: 'Abcdef1@' });
  
  // Login user
  authManager.loginUser('example@example.com', 'Abcdef1@');
  
  // Handling data using JSON:
  const userData = {
    "username": "user123",
    "email": "user123@example.com",
    "password": "Passw0rd!",
  };
  
  // Store user data in JSON format
  const jsonUserData = JSON.stringify(userData);
  console.log(jsonUserData);
  
  // Parse JSON data back into JavaScript object
  const parsedUserData = JSON.parse(jsonUserData);
  console.log(parsedUserData);
  