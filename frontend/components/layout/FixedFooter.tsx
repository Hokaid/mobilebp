import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type FixedFooterProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const FixedFooter: React.FC<FixedFooterProps> = React.memo(({ children, style }) => {
  const memoizedStyle = useMemo(() => {
    return [styles.footer, style];
  }, [style]);

  return <View testID="footer-container" style={memoizedStyle}>{children}</View>;
});

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
  },
});

export default FixedFooter;