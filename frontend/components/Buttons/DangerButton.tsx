import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

type DangerButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  buttonText: string;
};

const DangerButton: React.FC<DangerButtonProps> = React.memo(({ onPress, buttonText }) => {
  return (
    <TouchableOpacity style={styles.dangerButton} onPress={onPress}>
      <Text style={styles.dangerButtonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  dangerButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginBottom: 10,
  },
  dangerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DangerButton;