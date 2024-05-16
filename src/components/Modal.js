import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { hp, rfpercentage } from '../utils/responsive';
import { COLORS, FONTS, colors } from '../utils/constants';

const CustomModal = ({ isVisible, onClose, onConfirm  }) => {

  const dynamicStyles = StyleSheet.create({
    confirmButton: {
      backgroundColor:colors.gradientBg,
      padding: 10,
      borderRadius: 5,
    },
    closeButton: {
      backgroundColor:colors.gradientBg,
      padding: 10,
      borderRadius: 5,
    },
  })


  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Are you sure you want to logout?</Text>
          <View style={styles.btnCtr}>
            <TouchableOpacity style={dynamicStyles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={dynamicStyles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize:rfpercentage(2.2),
    fontFamily:FONTS.OUTFIT_MEDIUM,
    fontWeight:'500',
    color:COLORS.BLACK,
    marginBottom: 20,
  },
  closeButtonText: {
    fontSize:rfpercentage(2.2),
    fontFamily:FONTS.OUTFIT_MEDIUM,
    fontWeight:'500',
    color:COLORS.WHITE,
  },
  btnCtr:{
   flexDirection:'row',
   justifyContent:'space-evenly',
   alignItems:'center',
   marginTop:hp(3)
  },
  confirmButtonText: {
    color:COLORS.WHITE,
    fontSize:rfpercentage(2.2),
    fontFamily:FONTS.OUTFIT_MEDIUM,
    fontWeight:'500',
  },
});

export default CustomModal;
