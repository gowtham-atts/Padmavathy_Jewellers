import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabBar from './BottomTabBar';
import ContactUs from '../screens/ContactUs';
import OurStore from '../screens/OurStore';
import About from '../screens/About';
import TermConditions from '../screens/TermConditions';
import DrawerItems from './DrawerItems';
import { Platform } from 'react-native';
import { wp } from '../utils/responsive';


const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {

  const isTablet = Platform.isPad;

  return (
    <Drawer.Navigator 
      screenOptions={{ 
        headerShown: false, 
        drawerStatusBarAnimation:'slide' ,
        drawerStyle:{width: isTablet ? wp('60%') : wp('80%')},
        drawerType:'front'      
      }}
      drawerContent={(props) => <DrawerItems {...props} />}
    >
      <Drawer.Screen name="HomeDrawer" component={BottomTabBar} />
      <Drawer.Screen name="ContactUs" component={ContactUs} />
      <Drawer.Screen name="OurStore" component={OurStore} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="TermConditions" component={TermConditions} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
