import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { FONTS, colors } from '../utils/constants';
import { rfpercentage } from '../utils/responsive';

const ImagePickerModal = ({ isVisible, onClose,handleOpenCamera,handleOpenGallery  }) => {


  return (
    <Modal transparent={true} visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.option} onPress={handleOpenCamera}>
            <Text style={styles.optionText}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleOpenGallery}>
            <Text style={styles.optionText}>Open Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  option: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize:rfpercentage(2.2),
    textAlign: 'center',
    fontFamily:FONTS.OUTFIT_MEDIUM,
    fontStyle:'normal',
    fontWeight:'500',
    color:colors.gray58
  },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  cancelButtonText: {
    fontSize:rfpercentage(2.2),
    color: 'red',
    textAlign: 'center',
    fontFamily:FONTS.OUTFIT_MEDIUM,
    fontStyle:'normal',
    fontWeight:'500'
  },
});

export default ImagePickerModal;
