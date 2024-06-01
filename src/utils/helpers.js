import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

// Function to capitalize the first letter of a string
export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
  
    const formattedDateTime = new Date(dateTimeString).toLocaleString('en-US', options);
  
    return formattedDateTime;
  };

// Function to format a date in a user-friendly way
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Function to format a time in a user-friendly way
export const formatTime = (timeString) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(timeString).toLocaleTimeString(undefined, options);
  };

// Function to truncate text to a specified length
export const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

// Function to generate a random color
export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// Function to format currency
export const formatCurrency = (amount, currencyCode = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
    }).format(amount);
};

// Function to generate a unique ID
export const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

// Function to check if a string is a valid email address
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Function to convert camelCase to kebab-case
export const camelToKebabCase = (str) => {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

// Function to shuffle an array
export const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

// Function to debounce a function
export const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

// Function to deep clone an object
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

// Function to check if a value is a number
export const isNumber = (value) => {
    return typeof value === 'number' && !isNaN(value);
};

// Function to generate a range of numbers
export const generateRange = (start, end, step = 1) => {
    const range = [];
    for (let i = start; i <= end; i += step) {
        range.push(i);
    }
    return range;
};

// Function to capitalize each word in a string
export const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Function to check if a value is an object
export const isObject = (value) => {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
};

// Function to generate a random integer within a range
export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const calculateAverage = (numbers) => {
    if (numbers.length === 0) {
        return 0;
    }
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
};

// Function to format a phone number
export const formatPhoneNumber = (phoneNumber) => {
    // Assuming the input is a plain number without any formatting
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
};

// Function to validate a URL
export const isValidURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

// Function to sort an array of objects by a specific key
export const sortByKey = (array, key) => {
    return array.slice().sort((a, b) => a[key] - b[key]);
};

// Function to check if a string contains only letters
export const containsOnlyLetters = (str) => {
    return /^[a-zA-Z]+$/.test(str);
};

// Function to format a duration in seconds to a human-readable format (hh:mm:ss)
export const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formatNumber = (num) => (num < 10 ? `0${num}` : num);

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(remainingSeconds)}`;
};

// Function to flatten an array of nested arrays
export const flattenArray = (arr) => {
    return arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten), []);
};

// Function to check if a year is a leap year
export const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

// Function to generate a slug from a string
export const generateSlug = (str) => {
    return str
        .toLowerCase()
        .replace(/[\s_]/g, '-')
        .replace(/[^\w-]+/g, '');
};

// Function to capitalize the first letter of each word in a sentence
export const capitalizeSentence = (sentence) => {
    return sentence
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

// Function to check if a value is undefined or null
export const isNullOrUndefined = (value) => {
    return value === null || value === undefined;
};

// Function to check if a value is an empty object
export const isEmptyObject = (obj) => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};


export const handleConfirmLogout = async () => {
    await AsyncStorage.removeItem('userToken');
};









