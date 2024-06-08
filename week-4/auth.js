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
        return false; // User already exists, registration failed
      }
      
      // Add the new user to the list
      this.users.push(userData);
      return true; // Registration successful
    }
  
    // Login user
    loginUser(email, password) {
      // Find the user with the given email
      const user = this.users.find(user => user.email === email);
  
      // Check if user exists
      if (!user) {
        return false; // User not found, login failed
      }
  
      // Check if the password matches
      if (user.password !== password) {
        return false; // Incorrect password, login failed
      }
  
      return true; // Login successful
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const authManager = new AuthManager();
    const form = document.getElementById('authForm');
    const message = document.getElementById('message');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = form.email.value;
      const password = form.password.value;
  
      // Validate email format
      if (!validateEmail(email)) {
        message.textContent = "Invalid email format.";
        message.classList.remove('hidden');
        return;
      }
  
      // Validate password format
      if (!validatePassword(password)) {
        message.textContent = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.";
        message.classList.remove('hidden');
        return;
      }
  
      // Perform login
      if (authManager.loginUser(email, password)) {
        message.textContent = "Login successful!";
        message.classList.remove('text-red-500');
        message.classList.add('text-green-500');
      } else {
        message.textContent = "Invalid email or password.";
        message.classList.remove('hidden');
      }
    });
  
    const registerBtn = document.getElementById('registerBtn');
    registerBtn.addEventListener('click', () => {
      const email = form.email.value;
      const password = form.password.value;
  
      // Validate email format
      if (!validateEmail(email)) {
        message.textContent = "Invalid email format.";
        message.classList.remove('hidden');
        return;
      }
  
      // Validate password format
      if (!validatePassword(password)) {
        message.textContent = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.";
        message.classList.remove('hidden');
        return;
      }
  
      // Perform registration
      if (authManager.registerUser({ email, password })) {
        message.textContent = "User registered successfully!";
        message.classList.remove('text-red-500');
        message.classList.add('text-green-500');
      } else {
        message.textContent = "User already exists with this email.";
        message.classList.remove('hidden');
      }
    });
  
    // Regular expression for email validation
    function validateEmail(email) {
      const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return emailPattern.test(email);
    }
  
    // Regular expression for password validation
    function validatePassword(password) {
      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return passwordPattern.test(password);
    }
  });
  