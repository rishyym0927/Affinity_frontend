export const validations = (name, value) => {
    const rules = {
      first_name: {
        regex: /^[a-zA-Z]{1,}$/, 
        message: 'First name is required and must be letters only',
      },
      last_name: {
        regex: /^[a-zA-Z]{1,}$/, 
        message: 'Last name is required and must be letters only',
      },
      email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Invalid email address',
      },
      password: {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,}).*$/,
        message: 'Password must be at least 6 characters long, include at least one uppercase letter, one lowercase letter, and one special character',
      },
      gender: {
        regex: /^(Male|Female)$/,
        message: 'Gender is required',
      },
      age: {
        regex: /^[1-9]\d*$/, 
        message: 'Age is required and must be a valid number',
      },
      username: {
        regex: /^[a-zA-Z0-9_]{3,}$/, 
        message: 'Username must be at least 3 characters long',
      },
      location: {
        regex: /^.{1,}$/, 
        message: 'Location is required',
      },
      interests: {
        regex: /^.{1,}$/, 
        message: 'Interests are required',
      },
      past_relationships: {
        regex: /^(Yes|No)$/, 
        message: 'Please select Yes or No for past relationships',
      },
    };
  
    if (rules[name]) {
      if (!value) {
        return `*${name.replace('_', ' ')} is required`;
      }
      return rules[name].regex.test(value) ? '' : rules[name].message;
    }
    return '';
  };
  