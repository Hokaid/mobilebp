import React, { useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DangerButton from './buttons/DangerButton';
import SecondaryButton from './buttons/SecondaryButton';
import { X } from 'lucide-react-native';

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = React.memo(({ visible, onClose, onConfirm, itemName }) => {
  const memoizedOnClose = useCallback(onClose, [onClose]);
  const memoizedOnConfirm = useCallback(onConfirm, [onConfirm]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={memoizedOnClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={memoizedOnClose} style={styles.closeButton}>
            <X color="#666" size={24} />
          </TouchableOpacity>
          
          <Text style={styles.modalTitle}>
            ¿Estás seguro de eliminar el producto "{itemName}"?
          </Text>
          
          <View style={styles.modalButtonsContainer}>
            <DangerButton onPress={memoizedOnConfirm} buttonText={'Confirmar'} />
            <SecondaryButton onPress={memoizedOnClose} buttonText={'Cancelar'} />
          </View>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 60,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25,
    marginTop: 36,
    textAlign: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
});

export default ConfirmationModal;