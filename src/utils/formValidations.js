export const validations = (name, value) => {
    const rules = {
      first_name: {
        regex: /^[a-zA-Z]{1,}$/, 
        message: '*Must be letters only',
      },
      last_name: {
        regex: /^[a-zA-Z]{1,}$/, 
        message: '*Must be letters only',
      },
      email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: '*Invalid email address',
      },
      password: {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,}).*$/,
        message: '*Must be at least 6 characters long, include at least one uppercase letter, one lowercase letter, and one special character',
      },
      gender: {
        regex: /^(Male|Female)$/,
        message: '*Required',
      },
      age: {
        regex: /^[1-9]\d*$/, 
        message: '*Must be a valid number',
      },
      username: {
        regex: /^[a-zA-Z0-9_]{3,}$/, 
        message: '*Must be at least 3 characters long',
      },
      location: {
        regex: /^.{1,}$/, 
        message: '*Required',
      },
      interests: {
        regex: /^.{1,}$/, 
        message: '*Required',
      },
      past_relationships: {
        regex: /^(Yes|No)$/, 
        message: '*Required',
      },
    };
  
    if (rules[name]) {
      if (!value) {
        return `*Required`;
      }
      return rules[name].regex.test(value) ? '' : rules[name].message;
    }
    return '';
  };
  