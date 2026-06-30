import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Dimensions,
} from 'react-native';
import MeatImage from '../components/MeatImage';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const FAVORITES = [
  { id: '1', name: 'Beef Boneless Cubes', price: '1kg, 40$', type: 'beef_cubes' as const },
  { id: '2', name: 'Lamb Meat', price: '1kg, 45$', type: 'lamb' as const },
  { id: '3', name: 'Beef Boneless Cubes', price: '1kg, 40$', type: 'beef_cubes' as const },
  { id: '4', name: 'Lamb Meat', price: '1kg, 45$', type: 'lamb' as const },
  { id: '5', name: 'Beef Boneless Cubes', price: '1kg, 40$', type: 'beef_cubes' as const },
  { id: '6', name: 'Lamb Meat', price: '1kg, 45$', type: 'lamb' as const },
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
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
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
              <MeatImage type={product.type} size={90} />
              <TouchableOpacity
                style={styles.heartBtn}
                onPress={() => toggleFavorite(product.id)}
              >
                <Text style={[
                  styles.heart,
                  favorites.includes(product.id) && styles.heartActive,
                ]}>
                  {favorites.includes(product.id) ? '♥' : '♡'}
                </Text>
              </TouchableOpacity>
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
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 16,
    paddingTop: 20, paddingBottom: 16,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#f0f1f5', justifyContent: 'center', alignItems: 'center',
  },
  backArrow: { color: '#1a1a1a', fontSize: 22, fontWeight: '300', lineHeight: 24 },
  headerTitle: { color: '#1a1a1a', fontSize: 17, fontWeight: '700' },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 16, gap: 16, paddingBottom: 24,
  },
  productCard: {
    width: CARD_WIDTH,    backgroundColor: '#ffffff', borderRadius: 16, padding: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  imageBox: {
    width: '100%', height: 110, backgroundColor: '#f0f1f5',
    borderRadius: 12, justifyContent: 'center', alignItems: 'center',
    marginBottom: 10, position: 'relative',
  },
  heartBtn: { position: 'absolute', top: 6, right: 8 },
  heart: { fontSize: 18, color: '#bbb' },
  heartActive: { color: '#e74c3c' },
  productName: { color: '#1a1a1a', fontSize: 12, fontWeight: '600', marginBottom: 8 },
  productFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productPrice: { color: '#2ecc71', fontSize: 12, fontWeight: '700' },
  addBtn: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: '#2ecc71', justifyContent: 'center', alignItems: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 18, fontWeight: '700', lineHeight: 22 },
});

export default FavoritesScreen;
