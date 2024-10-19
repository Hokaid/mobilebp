import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

type SecondaryButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  buttonText: string;
};

const SecondaryButton: React.FC<SecondaryButtonProps> = React.memo(({ onPress, buttonText }) => {
  return (
    <TouchableOpacity style={styles.secondaryButton} onPress={onPress}>
      <Text style={styles.secondaryButtonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  secondaryButton: {
    backgroundColor: '#DDD',
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
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SecondaryButton;