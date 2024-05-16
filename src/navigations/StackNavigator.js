import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductScreen from '../screens/ProductScreen';
import OfferScreen from '../screens/OfferScreen';
import OfferDetails from '../screens/OfferDetails';
import ProductDetails from '../screens/ProductDetails';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import NewPlans from '../screens/NewPlans';
import MyPlans from '../screens/MyPlans';
import PayEMA from '../screens/PayEMA';
import TotalWeight from '../screens/TotalWeight';
import MyWallet from '../screens/MyWallet';
import NewArrivals from '../screens/NewArrivals';
import ClosedAccounts from '../screens/ClosedAccounts';
import AmountScheme from '../screens/AmountScheme';
import WishList from '../screens/WishList';
import Invite from '../screens/Invite';
import ContactUs from '../screens/ContactUs';
import TermConditions from '../screens/TermConditions';
import OurStore from '../screens/OurStore';
import NotificationScreen from '../screens/NotificationScreen';
import PaymentHistory from '../screens/PaymentHistory';
import NewArrivalsDetails from '../screens/NewArrivalsDetails';
import About from '../screens/About';
import BottomTabBar from './BottomTabBar';
import WishListDetails from '../screens/WishListDetails';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import PaymentFailureScreen from '../screens/PaymentFailureScreen';
import PaymentPendingScreen from '../screens/PaymentPendingScreen';
import JoinTerms from '../screens/JoinTerms';
import ExtendedScheme from '../screens/ExtendedScheme';
import RefundPolicy from '../screens/RefundPolicy';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Tab" component={BottomTabBar} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Offer" component={OfferScreen} />
        <Stack.Screen name="OfferDetails" component={OfferDetails} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="NewPlans" component={NewPlans} />
        <Stack.Screen name="MyPlans" component={MyPlans} />
        <Stack.Screen name="PayEMA" component={PayEMA} />
        <Stack.Screen name="TotalWeight" component={TotalWeight} />
        <Stack.Screen name="MyWallet" component={MyWallet} />
        <Stack.Screen name="NewArrivals" component={NewArrivals} />
        <Stack.Screen name="ClosedAccounts" component={ClosedAccounts} />
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
        <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
        <Stack.Screen name="NewArrivalsDetails" component={NewArrivalsDetails} />
        <Stack.Screen name="PaymentSuccessScreen" component={PaymentSuccessScreen} />
        <Stack.Screen name="PaymentFailureScreen" component={PaymentFailureScreen} />
        <Stack.Screen name="PaymentPendingScreen" component={PaymentPendingScreen} />
        <Stack.Screen name="ExtendedScheme" component={ExtendedScheme} />
        <Stack.Screen name="RefundPolicy" component={RefundPolicy} />

    </Stack.Navigator>
  );
};

export default StackNavigator;
