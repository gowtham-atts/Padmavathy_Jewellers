// export const API_BASE_URL = 'https://sj.aupay.auss.co/auss'; 

export const API_BASE_URL = 'https://aupay.auss.co/auss'; 


export const LOGIN_ENDPOINT = '/api/user/login';
export const LOGOUT_ENDPOINT = '/api/logout';
export const SEND_OTP = '/api/user/sendotp';
export const VERIFY_OTP = '/api/user/verifyotp';
export const RESET_OTP = '/api/user/changepasswd';
export const SIGN_UP_OTP = '/api/user/signupsendotp'; 
export const DELETE_ACCOUNT = '/api/master/customer/delete'; 



export const REGISTER_ENDPOINT = '/api/master/customer/';
export const USER_PROFILE_ENDPOINT = '/user/profile';


export const GET_OFFER_BANNER = '/api/promotions/offers/getAlloffer';
export const GET_OUR_PRODUCTS = '/api/catalog/products/getourproducts';
export const GET_ALL_PRODUCTS = '/api/catalog/products/getallproduct';
export const GET_BY_ID_PRODUCT = '/api/catalog/products/getproductid';


export const GET_GOLD_RATE = '/api/metal/metalrates/currentgoldsilverrate';
export const GET_METAL_RATE = '/api/metal/metalrates/gettodaymetalrates/';

export const TERMS_CONDITION = '/api/common/getabouttermsconstition';
export const ABOUT = '/api/common/getabouttermsconstition';


export const GET_ALL_CATEGORIES = '/api/catalog/category/getAllcategory';


// Offer Screen
export const GET_TODAY_OFFER = '/api/promotions/offers/gettodayoffer';
export const GET_All_OFFER = '/api/promotions/offers/getAlloffer';
export const GET_BY_ID_OFFER = '/api/promotions/offers/getofferid';


// New Classifiction
export const GET_ALL_CLASSIFICATION = '/api/master/classification/getallclassification';

// New Plan
export const GET_NEWPLAN_DETAILS = '/api/scheme/newplan/getallscheme';
export const ADD_NEWPLAN = '/api/scheme/newplan/addjoinscheme';

// New Arrivals
export const GET_NEW_ARRIVALS = '/api/promotions/newarrivals/getAllnewarrival';
export const GET_PAY_EMA = '/api/scheme/payment/getcustomeremapaytable';
export const GET_BY_ID_ARRIVALS = '/api/promotions/newarrivals/getnewarrivalsid';


// My Plan
export const GET_MY_PLAN = '/api/scheme/myplan/getcustomerscheme';
export const DELETE_MY_PLAN = '/api/scheme/myplan/deleteschemeaccount';


// Cutomers Details
export const GET_CUSTOMER_BY_ID = '/api/master/customer/getcustomerid';
export const UPDATE_CUSTOMER = '/api/master/customer/update';
export const UPLOAD_IMAGE = '/api/master/customer/uploadprofile';
export const CHANGE_PASSWORD = '/api/user/changepasswd';

// Company Details
export const GET_COMPANY = '/api/common/getcompany';


// Country, State, City
export const GET_ALL_COUNTRY = '/api/common/getcountry';
export const GET_ALL_STATE = '/api/common/getstate';
export const GET_ALL_CITY= '/api/common/getcity';
export const GET_ALL_RELATION= '/api/common/getrelationship';


// Invite 
export const GET_INVITE = '/api/common/getuserinvite';

// Payment History
export const GET_PAYMENT_HISTORY = '/api/scheme/myplan/getpaymenthistory';
export const VIEW_PAYMENT_HISTORY = '/api/scheme/myplan/viewpaymenthistory';

// Total Weight
export const GET_TOTAL_WEIGHT = '/api/scheme/myplan/getweightscheme';
export const VIEW_TOTAL_WEIGHT = '/api/scheme/myplan/viewweightscheme';

// Wish List 
export const GET_WISH_LIST = '/api/catalog/products/getwishlist';
export const UPDATE_WISH_LIST = '/api/catalog/products/updatewishlist';

// Closed My Plans
export const GET_CLOSED_PLAN = '/api/scheme/myplan/getclosedmyplan';
export const VIEW_CLOSED_PLAN = '/api/scheme/myplan/viewclosedmyplan';


// Notification
export const GET_ALL_NOTIFICATION = '/api/settings/notification/getallnotification';
export const GET_NOTIFY_COUNT = '/api/settings/notification/notificationcount';
export const UPDATE_MARK_READ_ALL = '/api/settings/notification/notificationreadall';
export const UPDATE_SINGLE_READ = '/api/settings/notification/singlereadnotification';


// payment scheme 
export const CALCULATE_SCEHME = '/api/scheme/payment/calculatescheme';
export const SCHEME_PAYMENT = '/api/scheme/payment/webschemepayment';

// 
export const PAYMENT_API = '/api/scheme/schemepayment/payema';

export const PAYMENT_SUCCESS = '/api/scheme/payment/paymentsuccess';

export const PAYMENT_FAILED = '/api/scheme/payment/paymentfailed';

export const EXTEND_INSTALLMENT = '/api/scheme/payment/extendinstallment';


// get all branch
export const GET_ALL_BRANCH = '/api/master/branch/getallbranch';

export const CREATE_CUSTOMER_ENQUIRY = '/api/master/customer/cusenquiry';

// Notification ON OFF
export const NOTIFICATION_STATUS = '/api/master/customer/notificationonoff';













