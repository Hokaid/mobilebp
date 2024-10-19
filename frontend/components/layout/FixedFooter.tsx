import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type FixedFooterProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const FixedFooter: React.FC<FixedFooterProps> = ({ children, style }) => {
  return <View style={[styles.footer, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
  },
});

export default FixedFooter;