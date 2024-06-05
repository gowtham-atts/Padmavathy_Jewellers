import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    SafeAreaView,
    Platform,
    ImageBackground
} from 'react-native';
import ImagePickerModal from '../components/ImagePickerModal';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import customerService from '../services/customerService';
import {
    hp,
    wp,
    rfpercentage,
    imageWidth,
    imageHeight,
    imageBorderRadius,
} from '../utils/responsive';
import { COLORS, FONTS, colors, images } from '../utils/constants';
import DetailsHeader from '../components/DetailsHeader';
import ScrollContainer from '../components/ScrollContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../utils/storage';
import ImagePicker from 'react-native-image-crop-picker';
import { selectProfileDetails, setProfileDetails, setSelectedBase64Image } from '../features/profile/profileSlice';
import {
    isEmailValid,
    isFirstNameValid,
    isLastNameValid,
    isPhoneNumberValid,
    validateAddress,
    validateEmail,
    validateFirstName,
    validateLastName,
    validateMobile,
} from '../utils/validations';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-simple-toast';

const image = require('../assets/shanthi_jellewery/blank-avator.png');

const EditProfile = ({ navigation }) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        mobile: '',
        address: ''
    });
    const [errors, setErrors] = useState({
        fnameError: '',
        lnameError: '',
        emailError: '',
        mobileError: '',
        addressError: '',
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageSet, setImage] = useState(null);
    const [base64, setBase64] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [customerDetails, setCustomerDetails] = useState({});
    const [fnameError, setfNameError] = useState('');
    const [lnameError, setlNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [addressError, setAddressError] = useState('');

    useEffect(() => {
        getCustomerDetails();
    }, []);

    const handleInputChange = (value, text) => {
        setForm((prevForm) => ({ ...prevForm, [value]: text }));
        setErrors((prevErrors) => ({ ...prevErrors, [`${value}Error`]: '' }));
        setfNameError('');
        setlNameError('');
        setEmailError('');
        setMobileError('');
        setAddressError('');
    };


    const handleValidation = () => {
        let isValid = true;

        const fnameError = validateFirstName(form.name);
        setfNameError(fnameError);
        if (fnameError) {
            isValid = false;
        } else {
            if (!isFirstNameValid(form.name)) {
                setfNameError('Invalid first name');
                isValid = false;
            }
        }

        const lnameError = validateLastName(form.lastname);
        setlNameError(lnameError);
        if (lnameError) {
            isValid = false;
        } else {
            if (!isLastNameValid(form.lastname)) {
                setlNameError('Invalid last name');
                isValid = false;
            }
        }

        const emailError = validateEmail(form.email);
        setEmailError(emailError);
        if (emailError) {
            isValid = false;
        } else {
            if (!isEmailValid(form.email)) {
                setEmailError('Invalid email format');
                isValid = false;
            }
        }

        const mobileError = validateMobile(form.mobile);
        setMobileError(mobileError);
        if (mobileError) {
            isValid = false;
        } else {
            if (!isPhoneNumberValid(form.mobile)) {
                setMobileError('Invalid mobile format');
                isValid = false;
            }
        }

        const addressError = validateAddress(form.address);
        setAddressError(addressError);
        if (addressError) isValid = false;


        if (isValid) {
            updateCustomerDetails()
        }
    };


    const openImageCropper = async (launchMethod) => {
        try {
            const cropOptions = {
                mediaType: 'photo',
                compressImageQuality: 1,
                cropping: true,
                cropperActiveWidgetColor: COLORS.GRADIANT_PRIMARY,
                cropperStatusBarColor: COLORS.DARK_PRIMARY,
                cropperToolbarColor: colors.gradientBg,
                cropperToolbarWidgetColor: COLORS.WHITE,
                freeStyleCropEnabled: true,
                useFrontCamera: true,
                showCropFrame: true,
                hideBottomControls: false,
                enableRotationGesture: true,
                includeBase64: true,
            };

            const image = await launchMethod(cropOptions);

            if (image) {
                const binaryDataImage = `data:image/jpeg;base64,${image.data}`;
                handleImageSelection(binaryDataImage);
                setSelectedImage(image.path);
            }
        } catch (error) {
            Toast.show('Failed to pick image. Please try again.', Toast.BOTTOM);
        }
    };

    const handleImageSelection = async (base_img) => {
        try {
            setModalVisible(false);
            setBase64(base_img);
            await updateImage(base_img);
            dispatch(setSelectedBase64Image(base_img));
        } catch (error) {
            Toast.show('Failed to handle image selection. Please try again.', Toast.BOTTOM);
        }
    };

    const updateImage = async (base64) => {
        try {
            const customer_id = await getData('customerId');

            if (!customer_id) {
                throw new Error('Customer ID not available');
            }

            const payload = {
                id_customer: customer_id,
                profile_image: base64,
            };

            const response = await customerService.uploadImage(payload);
            if (response?.status === 'success') {
                const imgUrl = response?.imgurl;
                setImage(imgUrl)
                Toast.show(response.message, Toast.BOTTOM);
            } else {
                throw new Error('Failed to upload image. Please try again.');
            }
        } catch (error) {
            Toast.show('Failed to update image. Please try again.', Toast.BOTTOM);
        }
    };

    const updateStateWithCustomerDetails = (details) => {
        const {
            firstname,
            lastname,
            mobile,
            email,
            address,
            pincode,
            urlprofile,
            cus_img
        } = details;

        setForm((prevForm) => ({
            ...prevForm,
            firstname: firstname || '',
            lastname: lastname || '',
            mobile: mobile || '',
            email: email || '',
            address: address || '',
            pincode: pincode || '',
        }));

        const getImage = `${urlprofile ?? ''}${cus_img ?? ''}`;
        setSelectedImage(getImage);
    };

    const getCustomerDetails = async () => {
        try {
            setLoading(true);
            const custome_id = await getData('customerId');
            const payload = {
                id_customer: custome_id,
            };
            const response = await customerService.getCustomerByID(payload);
            setCustomerDetails(response);
            dispatch(setProfileDetails(response));
            const getImage = `${response?.urlprofile ?? ''}${response?.cus_img ?? ''}`;
            dispatch(setSelectedBase64Image(getImage));
            updateStateWithCustomerDetails(response);
        } catch (err) {
            Toast.show('Error fetching customer details', Toast.BOTTOM);
        } finally {
            setLoading(false);
        }
    };

    const updateCustomerDetails = async () => {
        try {
            setLoading(true);

            const { id_customer, cus_img, ...customerDetailsToUpdate } = customerDetails;

            const payload = {
                id_customer,
                ...customerDetailsToUpdate,
                ...form,
                // cus_img: selectedImage || cus_img,
            };
            const response = await customerService.updateCustomer(payload);
            if (response?.status === 'success') {
                Toast.show(response.message, Toast.BOTTOM);
                setCustomerDetails((prevDetails) => ({ ...prevDetails, ...form }));
                navigation.goBack();
            } else {
                Toast.show(response.message, Toast.BOTTOM);
            }
        } catch (err) {
            Toast.show('Failed to update customer details. Please try again.', Toast.BOTTOM);
        } finally {
            setLoading(false);
        }
    };



    const renderBase64Image = () => {
        const customerDetails = useSelector(selectProfileDetails);

        if (!customerDetails) {
            return <FastImage source={image}
                style={styles.avatar} resizeMode={FastImage.resizeMode.contain} />;
        } else {
            const { urlprofile, cus_img } = customerDetails;
            const getImage = `${urlprofile ?? ''}${cus_img ?? ''}`;
            // Check if base64 image is available
            if (base64) {
                return <FastImage
                    source={{ uri: base64, priority: FastImage.priority.normal }}
                    style={styles.avatar} />;
            }
            // Check if profile image is available
            if (urlprofile && cus_img) {
                return <FastImage source={{ uri: getImage, priority: FastImage.priority.normal }}
                    style={styles.avatar} />;
            }
            // Fallback to default image if no image is available
            return <FastImage source={image} style={styles.avatar} resizeMode={FastImage.resizeMode.contain} />;
        }

    };


    const renderTextInput = ({ placeholder, fieldName, value, error, editable = true, onPress = null, keyboardType = 'default' }) => (
        <>
            <TouchableOpacity style={styles.iconCntr} onPress={onPress}>
                <View style={styles.iconRow}>
                    <Text style={styles.profileHeaderTxt}>{placeholder}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress}>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.PLACEHOLDER_TEXT}
                    value={value}
                    onChangeText={(text) => handleInputChange(fieldName, text)}
                    style={[styles.input, styles.inputText, error ? styles.errorBorder : null]}
                    editable={editable}
                    keyboardType={keyboardType}
                />
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </>
    );



    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={images.login_bg} style={styles.login_bg} resizeMode='cover'>
              <KeyboardAvoidingWrapper>
                  <ScrollContainer>
                    <DetailsHeader
                        title="Edit Profile"
                        onBackPress={() => navigation.goBack()}
                        onNotifyPress={() => navigation.navigate('Notification')}
                        onWishlistPress={() => navigation.navigate('WishList')}
                    />

                    <View style={styles.avatarContainer}>
                        <TouchableOpacity
                            style={styles.avatarContainer}
                            onPress={() => setModalVisible(true)}>
                            {renderBase64Image()}
                            <Text style={styles.avatarText}>{customerDetails?.firstname && customerDetails?.lastname ? `${customerDetails.firstname} ${customerDetails.lastname}` : 'Welcome'}</Text>
                            <Text style={styles.descStyle}>{customerDetails?.mobile || ''}</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
                        <Text style={styles.profileText}>Upload Image</Text>
                    </TouchableOpacity>

                    <ImagePickerModal
                        isVisible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        handleOpenCamera={() => openImageCropper(ImagePicker.openCamera)}
                        handleOpenGallery={() => openImageCropper(ImagePicker.openPicker)}
                    />

                    <View style={styles.centeredContainer}>
                        {loading && <ActivityIndicator size="large" color={COLORS.WHITE} style={styles.loadingIndicator} />}
                        <View>
                            {renderTextInput({ placeholder: 'First Name', fieldName: 'firstname', value: form.firstname, error: fnameError, })}
                            {renderTextInput({ placeholder: 'Last Name', fieldName: 'lastname', value: form.lastname, error: lnameError })}
                            {renderTextInput({ placeholder: 'Email', fieldName: 'email', value: form.email, error: emailError, keyboardType: 'email-address' })}
                            {renderTextInput({ placeholder: 'Mobile', fieldName: 'mobile', value: form.mobile, error: mobileError, keyboardType: 'numeric', editable:false })}
                            {renderTextInput({ placeholder: 'Address', fieldName: 'address', value: form.address, error: addressError })}
                        </View>
                    </View>

                    <TouchableOpacity onPress={handleValidation} style={styles.submitButton}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>

                </ScrollContainer>
              </KeyboardAvoidingWrapper>
            </ImageBackground>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS.WHITE
    },
    login_bg:{
     width:"100%",
     height:"100%"
    },
    profileHeaderTxt: {
        ...fontStyle(FONTS.OUTFIT_MEDIUM, rfpercentage(2.2), '500', '#666666'),
    },
    descStyle: {
        ...fontStyle(FONTS.OUTFIT_MEDIUM, rfpercentage(2), '500', COLORS.DARK_PRIMARY),
    },
    iconCntr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    contentCard: {
        ...spacing(15, 6, 'white', 8, 3, 10),
    },
    avatarContainer: {
        alignItems: 'center',
    },
    avatar: {
        width:imageWidth,
        height:imageHeight,
        borderRadius:imageBorderRadius,
    },
    addButton: {
        ...spacing(hp(1), 0, colors.gradientBg, 30, 0, 0),
        width: wp(40),
        height: hp(5),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButton: {
        ...spacing(2, 8, colors.gradientBg, 30, 0, 15),
        width: wp(30),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(15),
        marginTop: hp(6)
    },
    submitText: {
        ...fontStyle(FONTS.OUTFIT_MEDIUM, rfpercentage(2), '500', COLORS.WHITE),
    },
    profileText: {
        ...fontStyle(FONTS.OUTFIT_MEDIUM, rfpercentage(2), '500', COLORS.WHITE),
    },
    input: {
        ...spacing(0, Platform.OS === 'ios' ? 16 : 12, 8),
        width: wp(90),
        paddingHorizontal: 10,
        borderColor:'#E2E2E2',
        borderWidth:1,
        borderRadius:8
    },
    inputText: {
        ...fontStyle(FONTS.OUTFIT_MEDIUM, rfpercentage(1.8), '500', COLORS.TEXT),
    },
    avatarText: {
        ...fontStyle(FONTS.OUTFIT_MEDIUM, rfpercentage(2), '500', COLORS.DARK_PRIMARY, 'center', hp(2)),
    },
    errorText: {
        fontSize: rfpercentage(2),
        fontFamily: FONTS.OUTFIT_MEDIUM,
        color: 'red',
        textAlign: 'left',
        marginTop: hp(2),
    },
    loadingIndicator: {
        ...spacing(hp(2), 15, colors.gradientBg, 15, 0),
    },
    errorBorder: {
        borderColor: 'red',
    },
    goldRateHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    centeredContainer: {
        alignItems: 'center',
    },
    disabledInput: {
        backgroundColor: COLORS.BACKGROUND,
    },

});

function fontStyle(fontFamily, fontSize, fontWeight, color, textAlign = 'left', marginTop = 0) {
    return {
        fontFamily,
        fontSize,
        fontWeight,
        color,
        textAlign,
        marginTop,
    };
}

function spacing(margin, padding, backgroundColor, borderRadius, elevation = 0, gap = 0) {
    return {
        margin,
        padding,
        backgroundColor,
        borderRadius,
        elevation,
        gap,
    };
}


export default EditProfile;
