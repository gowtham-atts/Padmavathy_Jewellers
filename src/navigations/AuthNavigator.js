import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import ForgotScreen from '../screens/ForgotScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import NewPlans from '../screens/NewPlans';
import MyPlans from '../screens/MyPlans';
import PayEMA from '../screens/PayEMA';
import TotalWeight from '../screens/TotalWeight';
import MyWallet from '../screens/MyWallet';
import NewArrivals from '../screens/NewArrivals';
import ClosedAccounts from '../screens/ClosedAccounts';
import PaymentHistory from '../screens/PaymentHistory';
import ProductDetails from '../screens/ProductDetails';
import OfferDetails from '../screens/OfferDetails';
import AmountScheme from '../screens/AmountScheme';
import WishList from '../screens/WishList';
import WishListDetails from '../screens/WishListDetails';
import Invite from '../screens/Invite';
import ContactUs from '../screens/ContactUs';
import TermConditions from '../screens/TermConditions';
import JoinTerms from '../screens/JoinTerms';
import About from '../screens/About';
import OurStore from '../screens/OurStore';
import NotificationScreen from '../screens/NotificationScreen';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import NewArrivalsDetails from '../screens/NewArrivalsDetails';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import PaymentFailureScreen from '../screens/PaymentFailureScreen';
import PaymentPendingScreen from '../screens/PaymentPendingScreen';
import ExtendedScheme from '../screens/ExtendedScheme';
import SplashScreen from '../screens/SplashScreen';
import OnGoingScreen from '../screens/OnGoingScreen';
import VerifyForgotOtp from '../screens/VerifyForgotOtp';
import VerifyOtpScreen from '../screens/VerifyOtpScreen';
import ResetPassword from '../screens/ResetPassword';
import JoinScheme from '../screens/JoinScheme';
import RefundPolicy from '../screens/RefundPolicy';


const Stack = createStackNavigator();


function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName={'Splash'} screenOptions={{headerShown:false}} >
     
      <Stack.Screen name="Splash" component={SplashScreen} />

      <Stack.Screen name='Login' component={LoginScreen} />

      <Stack.Screen name='Register' component={RegisterScreen} />

      <Stack.Screen name='Forgot' component={ForgotScreen} />

      <Stack.Screen name="OnGoing" component={OnGoingScreen} />
    
      <Stack.Screen name="VerifyForgot" component={VerifyForgotOtp} />

      <Stack.Screen name="VerifyRegister" component={VerifyOtpScreen} />

      <Stack.Screen name="ResetPassword" component={ResetPassword} />

      <Stack.Screen name='Home' component={DrawerNavigator} />

      <Stack.Screen name="NewPlans" component={NewPlans} />

      <Stack.Screen name="MyPlans" component={MyPlans} />

      <Stack.Screen name="PayEMA" component={PayEMA} />

      <Stack.Screen name="TotalWeight" component={TotalWeight} />

      <Stack.Screen name="MyWallet" component={MyWallet} />

      <Stack.Screen name="NewArrivals" component={NewArrivals} />

      <Stack.Screen name="ClosedAccounts" component={ClosedAccounts} />

      <Stack.Screen name="PaymentHistory" component={PaymentHistory} />

      <Stack.Screen name="ProductDetails" component={ProductDetails} />

      <Stack.Screen name="OfferDetails" component={OfferDetails} />

      <Stack.Screen name="AmountScheme" component={AmountScheme} />

      <Stack.Screen name="WishList" component={WishList} />

      <Stack.Screen name="WishListDetails" component={WishListDetails} />

      <Stack.Screen name="Invite" component={Invite} />

      <Stack.Screen name="ContactUs" component={ContactUs} />

      <Stack.Screen name="TermConditions" component={TermConditions} />

      <Stack.Screen name="JoinTerms" component={JoinTerms} />

      <Stack.Screen name="About" component={About} />

      <Stack.Screen name="OurStore" component={OurStore} />

      <Stack.Screen name="Notification" component={NotificationScreen} />

      <Stack.Screen name="EditProfile" component={EditProfile} />

      <Stack.Screen name="ChangePassword" component={ChangePassword} />

      <Stack.Screen name="NewArrivalsDetails" component={NewArrivalsDetails} />

      <Stack.Screen name="PaymentSuccessScreen" component={PaymentSuccessScreen} />

      <Stack.Screen name="PaymentFailureScreen" component={PaymentFailureScreen} />

      <Stack.Screen name="PaymentPendingScreen" component={PaymentPendingScreen} />

      <Stack.Screen name="ExtendedScheme" component={ExtendedScheme} />

      <Stack.Screen name="JoinScheme" component={JoinScheme} />

      <Stack.Screen name="RefundPolicy" component={RefundPolicy} />

    </Stack.Navigator>
  );
}

export default AuthNavigator;