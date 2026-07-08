import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import EazygetLogo from '../components/EazygetLogo';

const { width } = Dimensions.get('window');

interface IntroScreenProps {
  onShopNow: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onShopNow }) => {
  return (
    <View style={styles.container}>
      <EazygetLogo />

      {/* Hero text */}
      <View style={styles.textSection}>
        <Text style={styles.heroTitle}>Order now and get it{'\n'}within 15 min.!</Text>
        <Text style={styles.heroSubtitle}>
          Receive your order anywhere in the world
        </Text>
      </View>

      {/* Shop Now Button */}
      <TouchableOpacity style={styles.shopButton} onPress={onShopNow} activeOpacity={0.85}>
        <Text style={styles.shopButtonText}>Shop now</Text>
      </TouchableOpacity>

      <Image source={require('../assets/chiken-image.png')} style={styles.chikenImage} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: "center",
    paddingTop: 79
  },
  textSection: {
    marginVertical: 24,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    paddingHorizontal: 30
  },
  heroTitle: {
    fontSize: 28,
    fontFamily: 'DMSans-Bold',
    color: '#06161C',
    textAlign: "center"
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#979899',
    fontFamily: "DMSans-Medium",
    lineHeight: 20,
    marginTop: 24,
    textAlign: "center"
  },
  shopButton: {
    backgroundColor: '#23AA49',
    marginTop: 30,
    width: 190,
    height: 53,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
  },
  chikenImage: {
    height: 355,
    width: "100%",
    resizeMode: "contain",
    marginTop: 20
  }
});

export default IntroScreen;
