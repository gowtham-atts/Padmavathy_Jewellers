import { Dimensions, Platform } from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const wp = widthPercentageToDP;
export const hp = heightPercentageToDP;


export const rfpercentage = RFPercentage;
export const rfvalue = RFValue;


const { width, height } = Dimensions.get('window');


const scalefont = width / 375;
const responsiveFontSize = (fontSize) => Math.round(fontSize * scalefont);

// Standard dimensions for design
const baseWidth = 375;
const baseHeight = 667;

// Calculate scale factors
const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;

// Function to scale a value based on the screen dimensions
export const scale = (value) => {
    return value * Math.min(scaleWidth, scaleHeight);
};

// Define responsive dimensions based on screen width
export const responsiveWidth = (percentage) => {
    const screenWidth = width < height ? width : height;
    return (percentage / 100) * screenWidth;
};

// Define responsive dimensions based on screen height
export const responsiveHeight = (percentage) => {
    const screenHeight = width < height ? height : width;
    return (percentage / 100) * screenHeight;
};


// Function to scale font size
export const scaleFont = (fontSize) => {
    return Math.round(fontSize * Math.min(scaleWidth, scaleHeight));
};

// Function to get responsive image dimensions
export const responsiveImageSize = (width, height) => {
    return {
        width: scale(width),
        height: scale(height),
    };
};

export const responsivePadding = (percentage) => ({
    padding: responsiveWidth(percentage),
});

export const responsiveMargin = (percentage) => ({
    margin: responsiveWidth(percentage),
});

export const responsiveBorderRadius = (percentage) => ({
    borderRadius: responsiveWidth(percentage),
});

// Function to calculate responsive border width
export const responsiveBorderWidth = (borderWidth) => {
    return Math.round(borderWidth * scale);
};



export const responsiveStyles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: responsiveFontSize(24),
        marginBottom: 20,
    },
    box: {
        width: width - 32,
        height: 100,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    boxText: {
        fontSize: responsiveFontSize(16),
        color: 'white',
    },
    responsiveImage: {
        width: width - 32,
        height: height / 3,
        marginBottom: 20,
    },
    responsiveButton: {
        width: width - 32,
        height: 50,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    responsiveTextInput: {
        width: width - 32,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    responsiveList: {
        flex: 1,
        width: width - 32,
        marginBottom: 20,
    },
};


const screenHeight = Dimensions.get('window').height;

export const imageWidth = Platform.OS === 'ios' ? screenHeight * 0.20 : screenHeight * 0.20;
export const imageHeight = screenHeight * 0.20;
export const imageBorderRadius = Math.min(imageWidth, imageHeight) / 1; 




