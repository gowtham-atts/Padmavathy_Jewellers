const isEmailValid = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isPasswordValid = (password) => {
  return password.length >= 5;
};

const isValidReferralCode = (referralCode) => {
  const referralCodeRegex = /^[a-zA-Z0-9]{6}$/; 
  return referralCodeRegex.test(referralCode);
};

const isPhoneNumberValid = (phoneNumber) => {
  return /^\d{10}$/.test(phoneNumber);
};

const isUsernameValid = (username) => {
  return /^[a-zA-Z0-9_]+$/.test(username);
};

const isFirstNameValid = (firstName) => {
  return /^[a-zA-Z ]{2,30}$/.test(firstName);
};

const isLastNameValid = (lastName) => {
  return /^[a-z ,.'-]+$/i.test(lastName);
};


const isPinCodeValid = (pinCode) => {
  return /^\d{6}$/.test(pinCode);
};

const isAddressValid = (address, minLength) => {
  if (typeof address !== 'string' || address.trim() === '') {
    return false;
  }
  if (address.trim().length < minLength) {
    return false;
  }
  return true;
};

const isNotEmpty = (value) => {
  return value.trim() !== '';
};

const isValidDateOfBirth = (dob) => {
  const dateRegex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/;

  if (!dateRegex.test(dob)) {
    return false;
  }

  const [month, day, year] = dob.split('/').map(Number);

  const parsedDate = new Date(year, month - 1, day);

  return (
    !isNaN(parsedDate.getTime()) &&
    parsedDate.getDate() === day &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getFullYear() === year
  );
};

const isValidationNomineeName = (nomineeName) => {
  return /^[a-zA-Z\s]+$/.test(nomineeName);
};

const isValidationNomineeMobile = (nomineeMobile) => {
  return /^\d{10}$/.test(nomineeMobile);
};

const isValidationNomineeRelationship = (nomineeRelationship) => {
  return /^[a-zA-Z\s]+$/.test(nomineeRelationship);
};


export {
  isFirstNameValid,
  isLastNameValid,
  isEmailValid,
  isValidReferralCode,
  isPasswordValid,
  isPhoneNumberValid,
  isUsernameValid,
  isNotEmpty,
  isPinCodeValid,
  isValidDateOfBirth,
  isValidationNomineeMobile,
  isValidationNomineeRelationship,
  isValidationNomineeName,
  isAddressValid
};


export const validateFirstName = (fname) => {
  if (fname === '') {
    return 'FirstName is required';
  }
  return '';
};

export const validateAccName = (accname) => {
  if (accname === '') {
    return 'Name is required';
  }
  return '';
};

export const validateAmount = (payamt) => {
  if (payamt === '') {
    return 'Payable Amount is required';
  }
  return '';
};

export const validateLastName = (lname) => {
  if (lname === '') {
    return 'LastName is required';
  }
  return '';
};

export const validateEmail = (mail) => {
  if (mail === '') {
    return 'Email is required';
  }
  return '';
};

export const validateMobile = (mobile) => {
  if (mobile === '') {
    return 'Mobile Number is required';
  }
  return '';
};

export const validateGender = (gender) => {
  if (!gender) {
    return 'Gender is required';
  }
  return '';
};

export const validateDob = (dob) => {
  if (!dob) {
    return 'Date Of Birth is required';
  }
  return '';
};

export const validateWedDate = (wedDate) => {
  if (!wedDate) {
    return 'Wedding Date is required';
  }
  return '';
};

export const validateAddress = (address) => {
  if (address === '') {
    return 'Address is required';
  }
  return '';
};

export const validateCountry = (country) => {
  if (!country) {
    return 'Country is required';
  }
  return '';
};

export const validateState = (state) => {
  if (!state) {
    return 'State is required';
  }
  return '';
};

export const validateCity = (city) => {
  if (!city) {
    return 'City is required';
  }
  return '';
};

export const validatePincode = (pincode) => {
  if (pincode === '') {
    return 'Pincode is required';
  }
  return '';
};

export const validateBranch = (branch) => {
  if (!branch) {
    return 'Branch is required';
  }
  return '';
};


export const validatePassword = (password) => {
  if (password === '') {
    return 'Password is required';
  }
  return '';
};


export const validateConfirmPassword = (confirmPassword, password) => {
  if (confirmPassword === '') {
    return 'Confirm Password is required';
  }
  if (confirmPassword !== password) {
    return 'Passwords do not match';
  }
  return '';
};


export const validateNomineeeName = (nomineeName) => {
  if (nomineeName === '') {
    return 'Nomineee Name is required';
  }
  return '';
};

export const validateNomineeeMobile = (nomineeMobile) => {
  if (nomineeMobile === '') {
    return 'Nomineee Mobile is required';
  }
  return '';
};

export const validateNomineeRelationShip = (relationship) => {
  if (!relationship) {
    return 'Nomineee RelationShip is required';
  }
  return '';
};

// Contact us validate Subject
export const validateSubject = (subject) => {
  if (subject === '') {
    return 'Subject is required';
  }
  return '';
};

export const validateMessage = (message) => {
  if (message === '') {
    return 'Message is required';
  }
  return '';
};

export const validateReferralCode = (referralCode) => {
  if (!referralCode) {
      return 'Referral code is required.';
  }

  if (!isValidReferralCode(referralCode)) {
      return 'Invalid referral code format.';
  }

  return ''; // No error
};



