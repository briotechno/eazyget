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
      {/* Top header */}
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

      <Image source={require('../assets/chiken-image.jpg')} style={styles.chikenImage} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: "center",
  },
  textSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
    fontWeight: "500",
    marginTop: 24
  },
  shopButton: {
    backgroundColor: '#23AA49',
    marginTop: 40,
    width: 190,
    height: 53,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  chikenImage: {
    height: 420,
    resizeMode: "contain"
  }
});

export default IntroScreen;
