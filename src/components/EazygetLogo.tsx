import React from 'react';
import { View, Text, StyleSheet, Image, StyleProp, ViewStyle } from 'react-native';

interface EazygetLogoProps {
  size?: 'small' | 'large';
  style?: StyleProp<ViewStyle>;
}

const EazygetLogo: React.FC<EazygetLogoProps> = ({ size = 'large', style }) => {
  return (
    <View style={[styles.wrapper, style]}>
      <Image source={require('../assets/app-icon.jpg')} style={styles.iconImg} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: "center",
    display: "flex",
    marginTop: 79
  },
  iconImg: {
    height: 32,
    resizeMode: "contain"
  }
});

export default EazygetLogo;
