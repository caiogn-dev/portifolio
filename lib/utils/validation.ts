/**
 * Validation utility functions for form inputs and data validation
 */

/**
 * Validate email format
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
}

/**
 * Validate phone number format
 */
export function validatePhone(phone: string): { isValid: boolean; error?: string } {
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }

  // Remove all non-digit characters for validation
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check for valid length (10-15 digits)
  if (cleanPhone.length < 10 || cleanPhone.length > 15) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }

  return { isValid: true };
}

/**
 * Validate required field
 */
export function validateRequired(value: string, fieldName: string = 'Field'): { isValid: boolean; error?: string } {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  return { isValid: true };
}

/**
 * Validate minimum length
 */
export function validateMinLength(value: string, minLength: number, fieldName: string = 'Field'): { isValid: boolean; error?: string } {
  if (value.length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters long` };
  }

  return { isValid: true };
}

/**
 * Validate maximum length
 */
export function validateMaxLength(value: string, maxLength: number, fieldName: string = 'Field'): { isValid: boolean; error?: string } {
  if (value.length > maxLength) {
    return { isValid: false, error: `${fieldName} must be no more than ${maxLength} characters long` };
  }

  return { isValid: true };
}

/**
 * Validate URL format
 */
export function validateUrl(url: string): { isValid: boolean; error?: string } {
  if (!url) {
    return { isValid: false, error: 'URL is required' };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Please enter a valid URL' };
  }
}

/**
 * Sanitize input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): { isValid: boolean; error?: string; strength: 'weak' | 'medium' | 'strong' } {
  if (!password) {
    return { isValid: false, error: 'Password is required', strength: 'weak' };
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long', strength: 'weak' };
  }

  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  let score = 0;

  // Check for lowercase letters
  if (/[a-z]/.test(password)) score++;
  
  // Check for uppercase letters
  if (/[A-Z]/.test(password)) score++;
  
  // Check for numbers
  if (/\d/.test(password)) score++;
  
  // Check for special characters
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  
  // Check for length
  if (password.length >= 12) score++;

  if (score >= 4) {
    strength = 'strong';
  } else if (score >= 2) {
    strength = 'medium';
  }

  if (score < 2) {
    return { 
      isValid: false, 
      error: 'Password must contain at least 2 of the following: lowercase letters, uppercase letters, numbers, special characters',
      strength 
    };
  }

  return { isValid: true, strength };
}

/**
 * Validate name format (letters, spaces, hyphens, apostrophes only)
 */
export function validateName(name: string, fieldName: string = 'Name'): { isValid: boolean; error?: string } {
  if (!name) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  const nameRegex = /^[a-zA-Z\s\-']+$/;
  
  if (!nameRegex.test(name)) {
    return { isValid: false, error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` };
  }

  if (name.length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters long` };
  }

  return { isValid: true };
}

/**
 * Validate numeric input
 */
export function validateNumber(value: string, min?: number, max?: number, fieldName: string = 'Number'): { isValid: boolean; error?: string } {
  if (!value) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return { isValid: false, error: `${fieldName} must be a valid number` };
  }

  if (min !== undefined && num < min) {
    return { isValid: false, error: `${fieldName} must be at least ${min}` };
  }

  if (max !== undefined && num > max) {
    return { isValid: false, error: `${fieldName} must be no more than ${max}` };
  }

  return { isValid: true };
}

/**
 * Validate date format and range
 */
export function validateDate(dateString: string, minDate?: Date, maxDate?: Date, fieldName: string = 'Date'): { isValid: boolean; error?: string } {
  if (!dateString) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return { isValid: false, error: `${fieldName} must be a valid date` };
  }

  if (minDate && date < minDate) {
    return { isValid: false, error: `${fieldName} must be after ${minDate.toLocaleDateString()}` };
  }

  if (maxDate && date > maxDate) {
    return { isValid: false, error: `${fieldName} must be before ${maxDate.toLocaleDateString()}` };
  }

  return { isValid: true };
}

/**
 * Validate file type
 */
export function validateFileType(file: File, allowedTypes: string[]): { isValid: boolean; error?: string } {
  if (!file) {
    return { isValid: false, error: 'File is required' };
  }

  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();
  
  const isValidType = allowedTypes.some(type => {
    if (type.startsWith('.')) {
      return fileName.endsWith(type);
    }
    return fileType.includes(type);
  });

  if (!isValidType) {
    return { isValid: false, error: `File must be one of the following types: ${allowedTypes.join(', ')}` };
  }

  return { isValid: true };
}

/**
 * Validate file size
 */
export function validateFileSize(file: File, maxSizeInMB: number): { isValid: boolean; error?: string } {
  if (!file) {
    return { isValid: false, error: 'File is required' };
  }

  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  
  if (file.size > maxSizeInBytes) {
    return { isValid: false, error: `File size must be less than ${maxSizeInMB}MB` };
  }

  return { isValid: true };
}

/**
 * Comprehensive form validation
 */
export function validateForm(data: Record<string, any>, rules: Record<string, any>): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = data[field];
    
    for (const rule of fieldRules) {
      const result = rule(value);
      if (!result.isValid) {
        errors[field] = result.error;
        break; // Stop at first error for this field
      }
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}