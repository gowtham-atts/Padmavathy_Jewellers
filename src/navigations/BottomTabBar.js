import React from 'react';
import { View, Platform, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS, FONTS } from '../utils/constants';
import { Iconify } from 'react-native-iconify';
import { hp, rfpercentage, wp } from '../utils/responsive';
import OfferScreen from '../screens/OfferScreen';
import HomeScreen from '../screens/HomeScreen';


const size = Platform.OS === "ios" ? wp(4) : wp(4) ;

const width = Platform.isPad ? 180 : (Platform.OS === 'ios' ? 100 : 100);

const height = Platform.isPad ? 60 :  (Platform.OS === 'ios' ? 40 : 40);

const borderRadius = Platform.isPad ? 60 : (Platform.OS === 'ios' ? 30 : 20);

const paddingBottom = Platform.isPad ? 30 : (Platform.OS === 'ios' ? 30 : 10);

const paddingTop = Platform.isPad ? 30 : (Platform.OS === 'ios' ? 30 : 10)

const tabBarHeight =  Platform.isPad ? 120 : (Platform.OS === 'ios' ? 100 : 70);


const Tab = createBottomTabNavigator();


const BottomTabBar = ({ route }) => {


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: [styles.tabBarStyle],
        tabBarShowLabel: false,
        headerShown: false,
        tabBarVisible: false,
        tabBarButton: (props) => <TouchableOpacity {...props} />
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[styles.tabItem,{backgroundColor: focused ? '#B76E00' : '#FFFFFF'}]}>
              <Iconify icon="iconoir:home" size={size}  color={focused ? '#FFFFFF' : '#B76E00'} />
              <Text style={[styles.text, { color: focused ? '#FFFFFF' : '#B76E00' }]}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Offers"
        component={OfferScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabItem,{backgroundColor: focused ? '#B76E00' : '#FFFFFF'}]}>
              <Iconify icon="bxs:offer" size={size}  color={focused ? '#FFFFFF' : '#B76E00'} />
              <Text style={[styles.text, { color: focused ? '#FFFFFF' : '#B76E00' }]}>Offers</Text>
            </View>
          ),
          tabBarIconStyle: {},
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabItem,{backgroundColor: focused ? '#B76E00' : '#FFFFFF'}]}>
              <Iconify icon="iconamoon:profile-circle" size={size} color={focused ? '#FFFFFF' : '#B76E00'} />
              <Text style={[styles.text, { color: focused ? '#FFFFFF' : '#B76E00' }]}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({

  tabBarStyle: {
    paddingBottom: paddingBottom,
    paddingTop: paddingTop,
    height: tabBarHeight,
    alignSelf: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.WHITE,
    elevation: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  tabItem: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius:borderRadius,
    width:width,
    height:height,
    justifyContent:'center'
  },
  text: {
    textAlign: 'center',
    fontSize: rfpercentage(2),
    fontWeight: '500',
    fontFamily: FONTS.OUTFIT_MEDIUM,
    paddingHorizontal: hp(1)
  }
})

export default BottomTabBar;
