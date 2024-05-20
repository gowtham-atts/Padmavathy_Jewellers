import { useSelector } from 'react-redux';
import { selectCompanyDetails } from '../features/company/companySlice';
import { selectProfileDetails } from '../features/profile/profileSlice';
import { scaleFont } from './responsive';

    
export const getBgColor = () => {
    const companyDetails = useSelector(selectCompanyDetails);
    return companyDetails?.bgcolor;
  };

export const getCompanyName = () => {
    const companyDetails = useSelector(selectCompanyDetails);
    return companyDetails?.company_name;
  };

export const getLogo = () => {
    const companyDetails = useSelector(selectCompanyDetails);
    const getLogo = `${companyDetails?.s3display_url ?? ''}${companyDetails?.s3foldername ?? ''}${companyDetails?.logo ?? ''}`;
    return getLogo;
  };

export const getWhatsAppNo = () => {
    const companyDetails = useSelector(selectCompanyDetails);
    return companyDetails?.whatsapp_no;
  };


export const getEmail = () => {
    const companyDetails = useSelector(selectCompanyDetails);
    return companyDetails?.email;
};

export const getSmallLogo = () => {
    const companyDetails = useSelector(selectCompanyDetails);
    const getSmallLogo = `${companyDetails?.s3display_url ?? ''}${companyDetails?.s3foldername ?? ''}${companyDetails?.smalllogo ?? ''}`;
    return getSmallLogo;
};

export const getLogoBottom = () => {
    const companyDetails = useSelector(selectCompanyDetails);
    const getBottomLogo = `${companyDetails?.s3display_url ?? ''}${companyDetails?.s3foldername ?? ''}${companyDetails?.logobtm ?? ''}`;
    return getBottomLogo;
};

export const getMobile = () => {
    const companyDetails = useSelector(selectCompanyDetails);
    return companyDetails?.email;
};

export const getProfileImage = () => {
    const response = useSelector(selectProfileDetails);
    const getImage = `${response?.urlprofile ?? ''}${response?.cus_img ?? ''}`;
    return getImage;
  };

export const getTollFree = () => {
    const response = useSelector(selectCompanyDetails);
    const tollfree = response?.tollfree1;
    return tollfree;
  };

export const gradiantPrimary = () => {
    const companyDetails = useSelector(selectCompanyDetails);
    return companyDetails?.primarycolor;
  };


export const gradiantSecondary = () => {
    const companyDetails = useSelector(selectCompanyDetails);
    return companyDetails?.secondarycolor;
  };


export const getBgImage = () => {
    const companyDetails = useSelector(selectCompanyDetails);
    const getBgImage = `${companyDetails?.s3display_url ?? ''}${companyDetails?.s3foldername ?? ''}${companyDetails?.bgimage ?? ''}`;
    return getBgImage;
  };

export const getLoginLogo = () => {
    const companyDetails = useSelector(selectCompanyDetails);
    const getLoginLogo = `${companyDetails?.s3display_url ?? ''}${companyDetails?.s3foldername ?? ''}${companyDetails?.loginlogo ?? ''}`;
    return getLoginLogo;
  };


export const getMerchantKey = () => {
  const companyDetails = useSelector(selectCompanyDetails);
  return companyDetails?.merchant_key;
};


export const COLORS = {
    PRIMARY: '#1C243A',
    SECONDARY: '#797979',
    TEXT: '#34495e', 
    BACKGROUND: '#ecf0f1',  
    WHITE:'#FFFFFF', 
    BLACK:'#000000',
    ERROR : '#FF9494',
    GRADIANT_PRIMARY : '#2D355C', 
    GRADIANT_SECONDARY :'#101929',
    LIGHT_WHITE:'#F5F7FF',
    TITLE_TEXT:'#1B243D',
    CONTENT_TEXT:'#C1C2C5',
    BUTTON_PRIMARY:'#363E60',
    BUTTON_SECONDARY:'#101829',
    DARK_PRIMARY:"#151E32",
    PLACEHOLDER_TEXT:"#B5B5B5",
    GOLD:'#F4A42E',
    LIGHT_GRAY:'#ACACAC',
    GRAY_WHITE:'#E9C2D2',
    SPLASH_PRIMARY : '#7C360B',
    SPLASH_SECONDARY : '#481A00'
};

export const FONTS = {
    OUTFIT_BLACK: 'Outfit-Black',
    OUTFIT_BOLD: 'Outfit-Bold',
    OUTFIT_EXTRA_BOLD: 'Outfit-ExtraBold', 
    OUTFIT_EXTRA_LIGHT: 'Outfit-ExtraLight',  
    OUTFIT_LIGHT:'Outfit-Light', 
    OUTFIT_MEDIUM:'Outfit-Medium',
    OUTFIT_REGULAR : 'Outfit-Regular',
    OUTFIT_SEMI_BOLD : 'Outfit-SemiBold',
    OUTFIT_THIN :'Outfit-Thin',
};

export const FONTWEIGHT = {
  NORMAL: '500',
  BOLD: '700',
  REGULAR : '400'
};

export const FONT_SIZES = {
  EXTRA_LARGE: scaleFont(20),
  LARGE : scaleFont(18),
  MEDIUM: scaleFont(14),
  SMALL: scaleFont(12),
};

export const SCREENS = {
    HOME: 'HomeScreen',
    PROFILE: 'ProfileScreen',
    SETTINGS: 'SettingsScreen',
};

export const ERROR_MESSAGES = {
    NETWORK: 'Network error. Please check your internet connection.',
    AUTHENTICATION: 'Authentication failed. Please log in again.',
};

export const STORAGE_KEYS = {
    USER_DATA: 'userData',
    PREFERENCES: 'userPreferences',
};

export const PLACEHOLDER_IMAGES = {
    PROFILE: 'https://example.com/default-profile-image.jpg',
    PRODUCT: 'https://example.com/default-product-image.jpg',
};



export const images = {
 
  pad_splash:require('../assets/shanthi_jellewery/pad_splash.png'),
  logo: require('../assets/shanthi_jellewery/shanthi-logo.png'),
  login_bg:require('../assets/shanthi_jellewery/login-bg.png'),
  dark_logo : require('../assets/shanthi_jellewery/pad-logo.png'),
  powered_aurum : require('../assets/shanthi_jellewery/powered_aurum.png'),
  poweredLogo: require('../assets/shanthi_jellewery/powered_by_logo.png'),
  logo_dark: require('../assets/shanthi_jellewery/logo-dark.png'),
  bg_splash: require('../assets/shanthi_jellewery/bg_splash.png'),
  notify: require('../assets/shanthi_jellewery/notify.png'),
  menu: require('../assets/shanthi_jellewery/menu.png'),
  mail: require('../assets/shanthi_jellewery/email.png'),
  pass: require('../assets/shanthi_jellewery/unlock.png'),
  eye_off: require('../assets/shanthi_jellewery/eye-off.png'),
  eye_slash: require('../assets/shanthi_jellewery/eye-slash.png'),
  hide:require('../assets/shanthi_jellewery/hide.png'),
  expand:require('../assets/shanthi_jellewery/expand.png'),
  arrow:require('../assets/shanthi_jellewery/arr-right.png'),
  oval_arrow:require('../assets/shanthi_jellewery/oval-arrow.png'),
  header_logo: require('../assets/shanthi_jellewery/header-logo.png'),
  refund:require('../assets/shanthi_jellewery/refund.png'),
  ourstore:require('../assets/shanthi_jellewery/out-store.png'),
  padtext_logo:require('../assets/shanthi_jellewery/padtext-logo.png'),
  atts_logo_light:require('../assets/shanthi_jellewery/atts-logo-light.png'),
  atts_logo_dark:require('../assets/shanthi_jellewery/atts-logo-dark.png'),

  // side bar icon
  empty_avator:require('../assets/shanthi_jellewery/empty-avator.png'),
  about:require('../assets/shanthi_jellewery/about.png'),
  wishlist:require('../assets/shanthi_jellewery/wishlist.png'),
  terms:require('../assets/shanthi_jellewery/terms.png'),
  contact:require('../assets/shanthi_jellewery/contact.png'),
  logout:require('../assets/shanthi_jellewery/logout.png'),
  back:require('../assets/shanthi_jellewery/back-icon.png'),
  notify_dark:require('../assets/shanthi_jellewery/notify-icon.png'),
  fillHeart : require('../assets/shanthi_jellewery/fill-heart.png'),
  default_branch:require('../assets/shanthi_jellewery/default-branch.jpg'),


  // profile screen
  notify_bell : require('../assets/shanthi_jellewery/notify-bell.png'),
  offers: require('../assets/shanthi_jellewery/offers.png'),
  history: require('../assets/shanthi_jellewery/history.png'),
  invite: require('../assets/shanthi_jellewery/invite.png'),
  headerBg: require('../assets/shanthi_jellewery/headerbg.png'),
  editPro: require('../assets/shanthi_jellewery/edit-pro.png'),
  changePass: require('../assets/shanthi_jellewery/change-pass.png'),
  header_effect : require('../assets/shanthi_jellewery/header-effect.png'),
  delete : require('../assets/shanthi_jellewery/delete_acc.png'),

  // shanthi_jellewery plans
  round_arrow:require('../assets/shanthi_jellewery/round-arr-white.png'),
  side_right_icon : require('../assets/shanthi_jellewery/side-arr.png'),
  round_shape : require('../assets/shanthi_jellewery/round-shape.png'),
  check_circle : require('../assets/shanthi_jellewery/check-circle.png'),
  check_uncircle : require('../assets/shanthi_jellewery/check-uncheck.png'),

  //onGoing
  onGoingFirst : require('../assets/shanthi_jellewery/pana.png'),
  onGoingSecond : require('../assets/shanthi_jellewery/bro.png'),
  onGoingThird : require('../assets/shanthi_jellewery/ongoing3.png'),

  radio_checked : require('../assets/shanthi_jellewery/radio_button_checked.png'),
  radio_unchecked : require('../assets/shanthi_jellewery/radio_button_unchecked.png'),
  rafiki : require('../assets/shanthi_jellewery/rafiki.png'),
  close : require('../assets/shanthi_jellewery/close_icon.png')

};


export const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500,
  };


// kandhan jellwery color codes
export const colors = {
  gradientBg: '#E27C00',
  gradientBg2: '#E27C00',
  primaryBtn:'#294279',
  white:'#FFFFFF',
  gray58:'#8D8D8D',
  headerclr:'#3A3A3A',
  inputheader:'#242424',
  placeholder:'#F1F1F1',
  black_clr:'#2D2B2E',
  forgottxt_clr:'#706FE5',
  borderclr:"#E2E2E2"
};


export const payEmaTextInputListByAmount = [4, 5];

export const payEmaTotalAmountByShow = [0, 1 , 2, 4, 5, 6];

export const payEmaTextInputListByWeight = [3];

export const payEmaTotalWeightByShow = [2, 5, 6];





