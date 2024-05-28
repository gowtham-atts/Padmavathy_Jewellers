import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigations/AppNavigator';
import { store } from './src/features/store';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import uuid from 'react-native-uuid';
import { getData, storeData } from './src/utils/storage';



function App() {


  const getCurrentUserId = async () => {
    try {
      // Retrieve the customer ID from AsyncStorage
      const customerId = await getData('customerId');
      return customerId;
    } catch (error) {
      console.error('Error retrieving customer ID:', error);
      return null;
    }
  };

  useEffect(() => {
    const initOneSignal = async () => {
      try {
        // Get the stored external ID
        let storedExternalId = await getData('external_id');

        // Get the current user ID (you need to replace this with your actual method of getting the user ID)
        const currentUserId = getCurrentUserId();

        if (!storedExternalId || storedExternalId !== currentUserId) {
          // No external ID stored or it doesn't match the current user ID, generate a new one
          const dateTimeValue = new Date().getTime().toString();
          storedExternalId = uuid.v4() + dateTimeValue;
          await storeData('external_id', storedExternalId);
        }
        // Initialize OneSignal
        OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        OneSignal.initialize("e101ebb1-0133-46f5-966b-c2b2f1228e40");
        OneSignal.Notifications.requestPermission(true);

        // Add a listener for notification clicks
        OneSignal.Notifications.addEventListener('opened', (event) => {
          console.log('OneSignal: notification clicked:', event);
        });
        
        // Log in with the external ID
        OneSignal.login(storedExternalId);
      } catch (error) {
        console.log('OneSignal initialization error:', error);
      }
    };

    initOneSignal();

  }, []);


  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}


export default App;
