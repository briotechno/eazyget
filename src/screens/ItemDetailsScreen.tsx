import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Dimensions,
  Image,
} from 'react-native';
import MeatImage from '../components/MeatImage';

const { width } = Dimensions.get('window');

interface Product {
  id: string;
  name: string;
  price: string;
  type: 'beef_cubes' | 'lamb' | 'chicken' | 'goat' | 'beef_boneless';
}

interface ItemDetailsScreenProps {
  product?: Product;
  onBack: () => void;
  onAddToCart: (product: Product, qty: number) => void;
}

const ItemDetailsScreen: React.FC<ItemDetailsScreenProps> = ({
  product = { id: '1', name: 'Beef Boneless', price: '1kg, 60$', type: 'beef_boneless' },
  onBack,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(4);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchBtn}>
          <Image source={require('../assets/icons/search-black.png')} style={styles.searchIcon} />
          {/* <Text style={styles.searchIcon}>🔍</Text> */}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.heartBtn}>
            <Image source={require('../assets/icons/heart-img.png')} style={styles.heart} />
            {/* <Text style={styles.heart}>♡</Text> */}
          </TouchableOpacity>
          <Image source={require('../assets/Beef-Boneless.png')} style={styles.productImage} />
          {/* <MeatImage type={product.type} size={200} /> */}
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <Text style={styles.productName}>{product.name}</Text>
            {/* Quantity selector */}
            <View style={styles.qtyRow}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{quantity}</Text>
              <TouchableOpacity
                style={[styles.qtyBtn, styles.qtyBtnGreen]}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Text style={[styles.qtyBtnText, { color: '#fff' }]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.productPrice}>{product.price}</Text>

          <Text style={styles.description}>
            Premium quality halal beef boneless cuts, carefully trimmed and packed for wholesale supply.
          </Text>

          {/* Quality badges */}
          <View style={styles.badgesGrid}>
            {[
              { icon: require('../assets/icons/Natural.png'), title: '100%', sub: 'natural' },
              { icon: require('../assets/icons/no-chemicals.png'), title: 'NO', sub: 'chemicals' },
              { icon: require('../assets/icons/payment.png'), title: 'Secure', sub: 'payment' },
              { icon: require('../assets/icons/support.png'), title: '24/7', sub: 'support' },
            ].map((badge, i) => (
              <View key={i} style={styles.badge}>
                <Image source={badge.icon} style={styles.badgeIcon} />
                {/* <Text style={styles.badgeIcon}>{badge.icon}</Text> */}
                <View>
                  <Text style={styles.badgeTitle}>{badge.title}</Text>
                  <Text style={styles.badgeSub}>{badge.sub}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Add to cart */}
      <TouchableOpacity
        style={styles.addToCartBtn}
        onPress={() => onAddToCart(product, quantity)}
        activeOpacity={0.85}
      >
        <Text style={styles.addToCartText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 16, paddingTop: 20, paddingBottom: 12,
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#f0f1f5', justifyContent: 'center', alignItems: 'center',
  },
  backArrow: { color: '#1a1a1a', fontSize: 22, fontWeight: '300', lineHeight: 24 },
  searchBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center',
  },
  searchIcon: {
    height: 13,
    resizeMode: "contain"
  },
  scrollContent: { paddingBottom: 100 },
  imageContainer: {
    height: 260, backgroundColor: '#f0f1f5',
    justifyContent: 'center', alignItems: 'center',
    marginHorizontal: 16, borderRadius: 20,
    marginBottom: 24, position: 'relative',
  },
  heartBtn: {
    position: 'absolute',
    top: 30,
    right: 10,
    zIndex: 2,
    backgroundColor: "#FFFFFF",
    width: 33,
    height: 33,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  heart: {
    height: 15,
    width: 13,
    resizeMode: "contain",
    tintColor: "#EEEEEE"
  },
  infoSection: { paddingHorizontal: 20 },
  titleRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 6,
  },
  productName: {
    color: '#1a1a1a',
    fontSize: 24,
    flex: 1,
    fontFamily: 'DMSans-Bold',
  },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyBtn: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#f0f1f5', justifyContent: 'center', alignItems: 'center',
  },
  qtyBtnGreen: { backgroundColor: '#23AA49' },
  qtyBtnText: { color: '#1a1a1a', fontSize: 18, fontWeight: '700', lineHeight: 22 },
  qtyValue: { color: '#1a1a1a', fontSize: 16, fontWeight: '700', minWidth: 20, textAlign: 'center' },
  productPrice: {
    color: '#FF324B',
    fontSize: 20,
    marginBottom: 14,
    fontFamily: 'DMSans-Bold',
  },
  description: {
    color: '#979899', fontSize: 16, lineHeight: 21, marginBottom: 24,
    fontFamily: 'DMSans-Medium',
  },
  badgesGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 12,
  },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#FFF', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 10,
    width: (width - 56) / 2,
  },
  badgeIcon: { width: 35, height: 35, resizeMode: 'contain' },
  badgeTitle: {
    color: '#23AA49', fontSize: 16,
    fontFamily: 'DMSans-Bold',

  },
  badgeSub: {
    color: '#888', fontSize: 14,
    fontFamily: 'DMSans-Medium',
  },
  addToCartBtn: {
    position: 'absolute', bottom: 24, left: 20, right: 20,
    backgroundColor: '#23AA49', paddingVertical: 16,
    borderRadius: 30, alignItems: 'center',
    shadowColor: '#23AA49', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 8,
  },
  addToCartText: {
    color: '#fff', fontSize: 16,
    fontFamily: 'DMSans-Bold',

  },
});

export default ItemDetailsScreen;
