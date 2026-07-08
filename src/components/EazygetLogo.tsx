import React from 'react';
import { View, Text, StyleSheet, Image, StyleProp, ViewStyle } from 'react-native';

interface EazygetLogoProps {
  size?: 'small' | 'large';
  style?: StyleProp<ViewStyle>;
}

const EazygetLogo: React.FC<EazygetLogoProps> = ({ size = 'small', style, }) => {
  return (
    <View style={[styles.wrapper, style]}>
      <Image source={require('../assets/app-icon.jpg')} style={[size === "large" ? styles.iconImg : styles.iconImgSmall]} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: "center",
  },
  iconImg: {
    width: 225,
    resizeMode: "contain"
  },
  iconImgSmall: {
    width: 113,
    height: 31,
    resizeMode: "contain"
  }
});

export default EazygetLogo;
