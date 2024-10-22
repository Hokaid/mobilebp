import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const CustomSkeleton: React.FC = () => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnimation]);

  const backgroundColor = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e0e0e0', '#f0f0f0'],
  });

  return (
    <View style={styles.skeletonContainer}>
      <Animated.View testID="skeleton-title" style={[styles.skeletonTitle, { backgroundColor }]} />
      <Animated.View testID="skeleton-subtitle" style={[styles.skeletonSubtitle, { backgroundColor }]} />
      <Animated.View testID="skeleton-line-1" style={[styles.skeletonLine, { backgroundColor }]} />
      <Animated.View testID="skeleton-line-2" style={[styles.skeletonLine, { backgroundColor }]} />
      <Animated.View testID="skeleton-image" style={[styles.skeletonImage, { backgroundColor }]} />
      <Animated.View testID="skeleton-line-3" style={[styles.skeletonLine, { backgroundColor }]} />
      <Animated.View testID="skeleton-line-4" style={[styles.skeletonLine, { backgroundColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  skeletonTitle: {
    width: '60%',
    height: 20,
    borderRadius: 4,
    marginVertical: 10,
  },
  skeletonSubtitle: {
    width: '40%',
    height: 16,
    borderRadius: 4,
    marginVertical: 10,
  },
  skeletonLine: {
    width: '100%',
    height: 16,
    borderRadius: 4,
    marginVertical: 8,
  },
  skeletonImage: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginVertical: 20,
    alignSelf: 'center',
  },
});

export default CustomSkeleton;