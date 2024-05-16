import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, Image } from 'react-native';
import { Iconify } from 'react-native-iconify';
import { COLORS, FONTS, colors, images } from '../utils/constants';
import { hp, scaleFont, wp } from '../utils/responsive';
import notificationService from '../services/notificationService';
import { getData } from '../utils/storage';
import { formatDateTime } from '../utils/helpers';

const CONFIRMATION_MESSAGE = 'Are you sure you want to mark all notifications as read?';

const NotificationCard = ({ notification, onMarkAsRead }) => {

  const unreadBackgroundColor = '#F1F6FC';

  return (
    <View
      key={notification.id_notification}
      style={[
        styles.cardContainer,
        { backgroundColor: notification.read ? 'white' : unreadBackgroundColor },
      ]}
    >
      <TouchableOpacity style={styles.copyContainer}>
        <Text
          style={[
            styles.copytxt,
            { color: notification.read ? COLORS.DARK_PRIMARY : '#1A1F36' },
          ]}
        >
          {notification.noti_name}
        </Text>
        <Text
          style={[
            styles.contenttxt,
            { color: notification.read ? COLORS.DARK_PRIMARY : '#404046' },
          ]}
        >
          {notification.noti_desc}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.copyContainer]}>
        <Text style={[styles.copytxt, { color: COLORS.DARK_PRIMARY }]}>
          {formatDateTime(notification.create_date)}
        </Text>
      </TouchableOpacity>
      {!notification.read && (
        <TouchableOpacity
          onPress={() => onMarkAsRead(notification.id_notification)}
          style={styles.markAsReadButton}
        >
          <Iconify
            icon="material-symbols:circle-outline"
            size={24}
            color={COLORS.DARK_PRIMARY}
            style={{ marginLeft: 8 }}
          />
          <Text style={styles.markAsReadText}>Mark as Read</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const NotificationScreen = ({ navigation }) => {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const customerId = await getData('customerId');
      const payload = { id_customer: customerId };
      const response = await notificationService.getAllNotification(payload);
      const notificationData = response?.list || [];
      setNotifications(notificationData);
    } catch (error) {
      setError('An error occurred while fetching notifications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const markAsReadApi = async (id) => {
    try {
      const customerId = await getData('customerId');
      const payload = { id_customer: customerId, id_notification: id };
      const response = await notificationService.updateSingleRead(payload);
      return response.status;
    } catch (error) {
      setError('An error occurred while marking as read. Please try again.');
      return false;
    }
  };

  const markAllAsReadApi = async () => {
    try {
      const customerId = await getData('customerId');
      const payload = { id_customer: customerId };
      const response = await notificationService.updateMarkReadAll(payload);
      return response.status;
    } catch (error) {
      setError('An error occurred while marking all as read. Please try again.');
      return false;
    }
  };

  const markAsRead = async (id) => {
    const success = await markAsReadApi(id);
    if (success) {
      setNotifications((prevNotifications) => (
        prevNotifications.map((notification) => (
          notification.id_notification === id ? { ...notification, read: true } : notification
        ))
      ));
    }
  };

  const markAllAsRead = async () => {
    Alert.alert('Confirmation', CONFIRMATION_MESSAGE, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: async () => {
          const success = await markAllAsReadApi();
          if (success) {
            setNotifications((prevNotifications) => (
              prevNotifications.map((notification) => ({ ...notification, read: true }))
            ));
          }
        },
      },
    ], { cancelable: false });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const areAnyUnread = notifications.some((notification) => !notification.read);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>

        <TouchableOpacity style={styles.backButton}>
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Image source={images.back} style={styles.iconImg} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Notification</Text>
        </TouchableOpacity>

        <View style={styles.iconRow}>
          <TouchableOpacity onPress={markAllAsRead} style={styles.notifyButton}>
            <Text style={styles.marklist}>Mark all as read</Text>
            {areAnyUnread ? (
              <Iconify icon="mdi:tick-circle-outline" size={24} color="black" style={{ marginLeft: 8 }} />
            ) : (
              <Iconify icon="material-symbols:circle-outline" size={24} color="black" style={{ marginLeft: 8 }} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : loading ? (
        <ActivityIndicator size="large" color={COLORS.DARK_PRIMARY} style={styles.loader} />
      ) : (
        notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationCard key={notification.id_notification} notification={notification} onMarkAsRead={markAsRead} />
          ))
        ) : (
          <View style={{justifyContent:'center',flex:1}}> 
             <Text style={styles.noNotificationText}>No notifications</Text>
          </View>
        )
      )}
    </SafeAreaView>
  );
};

const commonStyles = {
  copyContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 6,
  },
  copytxt: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: scaleFont(12),
    fontWeight: '500',
    marginBottom: 8,
  },
  contenttxt: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: scaleFont(12),
    fontWeight: '500',
    textTransform: 'uppercase',
  },
};

const styles = StyleSheet.create({
  ...commonStyles,
  container: {
    flex: 1,
    backgroundColor:COLORS.WHITE
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImg:{
    width:wp(8),
    height:hp(4),
    resizeMode:'contain',
    tintColor:colors.black_clr
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backCtnr: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor:'#9FA2AB',
    borderWidth:0.5,
    borderRadius:8
  },
  headerText: {
    fontSize: scaleFont(18),
    fontWeight: '600',
    fontFamily: FONTS.OUTFIT_BOLD,
    color: COLORS.DARK_PRIMARY,
    marginLeft: 8,
  },
  marklist: {
    fontSize: scaleFont(14),
    fontWeight: '400',
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.DARK_PRIMARY,
  },
  notifyButton: {
    padding: 8,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center'
  },
  cardContainer: {
    borderRadius: 8,
    elevation: 3,
    margin: 16,
    padding: 10,
  },
  markAsReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  markAsReadText: {
    fontSize: scaleFont(14),
    fontWeight: '400',
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.DARK_PRIMARY,
    marginLeft: 8,
  },
  noNotificationText: {
    fontSize: scaleFont(16),
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.DARK_PRIMARY,
    textAlign: 'center',
    marginTop: 20
  },
  errorText: {
    fontSize: scaleFont(16),
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationScreen;
