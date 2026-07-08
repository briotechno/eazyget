import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Dimensions,
  Image,
} from 'react-native';
import MeatImage from '../components/MeatImage';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const ALL_PRODUCTS = [
  { id: '1', name: 'Beef Boneless Cubes', price: '1kg, 40$', type: 'beef_cubes' as const, image: require('../assets/Beef-Boneless.png') },
  { id: '2', name: 'Lamb Meat', price: '1kg, 45$', type: 'lamb' as const, image: require('../assets/Beef-Boneless.png') },
  { id: '3', name: 'Beef Boneless Cubes', price: '1kg, 40$', type: 'beef_cubes' as const, image: require('../assets/Beef-Boneless.png') },
  { id: '4', name: 'Lamb Meat', price: '1kg, 45$', type: 'lamb' as const, image: require('../assets/Beef-Boneless.png') },
  { id: '5', name: 'Beef Boneless Cubes', price: '1kg, 40$', type: 'beef_cubes' as const, image: require('../assets/Beef-Boneless.png') },
  { id: '6', name: 'Beef Boneless Cubes', price: '1kg, 40$', type: 'beef_boneless' as const, image: require('../assets/Beef-Boneless.png') },
];

interface AllProductScreenProps {
  onBack: () => void;
  onProductPress: (product: any) => void;
  onFilter: () => void;
}

const AllProductScreen: React.FC<AllProductScreenProps> = ({ onBack, onProductPress, onFilter }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Product</Text>
        <TouchableOpacity style={styles.filterBtn} onPress={onFilter}>
          {/* <Text style={styles.filterIcon}>⚙</Text>
          filter.png */}
          <Image source={require('../assets/icons/filter.png')} style={{ height: 18, width: 16 }} />

        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {ALL_PRODUCTS.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={() => onProductPress(product)}
            activeOpacity={0.85}
          >
            <View style={styles.imageBox}>
              <Image source={product.image} style={styles.productImg} />
              {/* <MeatImage type={product.type} size={90} /> */}
              <TouchableOpacity
                style={styles.heartBtn}
                onPress={() => toggleWishlist(product.id)}
              >
                <Image source={require('../assets/icons/heart-img.png')} style={{ tintColor: wishlist.includes(product.id) ? "#23AA49" : "#EEEEEE", height: 13, width: 15 }} />
                {/* <Text style={[styles.heart, wishlist.includes(product.id) && styles.heartActive]}>
                  {wishlist.includes(product.id) ? '♥' : '♡'}
                </Text> */}
              </TouchableOpacity>
            </View>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.productFooter}>
              <Text style={styles.productPrice}>{product.price}</Text>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => onProductPress(product)}
              >
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
  filterBtn: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center',
  },
  filterIcon: { fontSize: 18, color: '#1a1a1a' },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 16, gap: 16, paddingBottom: 24,
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: '#F3F5F7', borderRadius: 16, padding: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  imageBox: {
    width: '100%', height: 110, backgroundColor: '#F3F5F7',
    borderRadius: 12, justifyContent: 'center', alignItems: 'center',
    marginBottom: 10, position: 'relative',
  },
  heartBtn: { position: 'absolute', top: 0, right: -5, backgroundColor: "#FFFFFF", height: 33, width: 33, borderRadius: 100, alignItems: "center", justifyContent: "center" },
  heart: { fontSize: 18, color: '#bbb' },
  heartActive: { color: '#e74c3c' },
  productName: { color: '#1a1a1a', fontSize: 12, fontFamily: 'DMSans-Bold', marginBottom: 2 },
  productFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productPrice: { color: '#FF324B', fontSize: 12, fontFamily: 'DMSans-Bold', },
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

export default AllProductScreen;
