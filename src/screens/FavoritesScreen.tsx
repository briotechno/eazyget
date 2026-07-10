import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Dimensions,
  Image,
} from 'react-native';
import MeatImage from '../components/MeatImage';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const FAVORITES = [
  { id: '1', name: 'Beef Boneless Cubes', price: '1kg, 40$', type: 'beef_cubes' as const, image: require('../assets/Beef-Boneless.png') },
  { id: '2', name: 'Lamb Meat', price: '1kg, 45$', type: 'lamb' as const, image: require('../assets/Beef-Boneless.png') },
  { id: '3', name: 'Beef Boneless Cubes', price: '1kg, 40$', type: 'beef_cubes' as const, image: require('../assets/Beef-Boneless.png') },
  { id: '4', name: 'Lamb Meat', price: '1kg, 45$', type: 'lamb' as const, image: require('../assets/Beef-Boneless.png') },
  { id: '5', name: 'Beef Boneless Cubes', price: '1kg, 40$', type: 'beef_cubes' as const, image: require('../assets/Beef-Boneless.png') },
  { id: '6', name: 'Beef Boneless Cubes', price: '1kg, 40$', type: 'beef_boneless' as const, image: require('../assets/Beef-Boneless.png') },
];

interface FavoritesScreenProps {
  onBack: () => void;
  onProductPress: (product: any) => void;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ onBack, onProductPress }) => {
  const [favorites, setFavorites] = useState<string[]>(FAVORITES.map(f => f.id));

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/icons/rounded-back.png')} style={{ height: 44, width: 44, resizeMode: "contain" }} />
        {/* <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {FAVORITES.map(product => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={() => onProductPress(product)}
            activeOpacity={0.85}
          >
            <View style={styles.imageBox}>
              <Image source={product.image} style={styles.productImg} />
              {/* <TouchableOpacity
                style={styles.heartBtn}
                onPress={() => toggleFavorite(product.id)}
              >
                <Text style={[
                  styles.heart,
                  favorites.includes(product.id) && styles.heartActive,
                ]}>
                  {favorites.includes(product.id) ? '♥' : '♡'}
                </Text>
              </TouchableOpacity> */}
            </View>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.productFooter}>
              <Text style={styles.productPrice}>{product.price}</Text>
              <TouchableOpacity style={styles.addBtn} onPress={() => onProductPress(product)}>
                <Text style={styles.addBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 16,
    paddingTop: 20, paddingBottom: 16,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#f0f1f5', justifyContent: 'center', alignItems: 'center',
  },
  backArrow: { color: '#06161C', fontSize: 22, fontWeight: '300', lineHeight: 24 },
  headerTitle: { color: '#1a1a1a', fontSize: 20, fontFamily: 'DMSans-Bold', },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 16, gap: 16, paddingBottom: 24,
  },
  productCard: {
    width: CARD_WIDTH, backgroundColor: '#f3f5f7', borderRadius: 16, padding: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6,
    // elevation: 2,
  },
  imageBox: {
    width: '100%', height: 110, backgroundColor: '#F3F5F7',
    borderRadius: 12, justifyContent: 'center', alignItems: 'center',
    marginBottom: 10, position: 'relative',
  },
  heartBtn: { position: 'absolute', top: 6, right: 8 },
  heart: { fontSize: 18, color: '#bbb' },
  heartActive: { color: '#e74c3c' },
  productName: {
    color: '#1a1a1a', fontSize: 12,
    marginBottom: 8,
    fontFamily: 'DMSans-Bold',
  },
  productFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productPrice: {
    color: '#FF324B', fontSize: 13,

    fontFamily: 'DMSans-Bold',

  },
  addBtn: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: '#23AA49', justifyContent: 'center', alignItems: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 18, fontWeight: '700', lineHeight: 22 },
  productImg: {
    height: 134,
    resizeMode: "contain"
  }
});

export default FavoritesScreen;
