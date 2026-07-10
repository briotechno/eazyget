import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Dimensions,
  Image,
  Platform,
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
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Top Curved Section */}
        <View style={styles.topSection}>
          <View style={styles.innerContent}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.backBtn} onPress={onBack}>
                <Image source={require('../assets/icons/rounded-back.png')} style={styles.backIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.searchBtn}>
                <Image source={require('../assets/icons/search-black.png')} style={styles.searchIcon} />
              </TouchableOpacity>
            </View>

            {/* Product Image Wrapper */}
            <View style={styles.imageWrapper}>
              <Image source={require('../assets/Beef-Boneless.png')} style={styles.productImage} />

              <TouchableOpacity style={styles.heartBtn}>
                <Image source={require('../assets/icons/heart-img.png')} style={styles.heart} />
              </TouchableOpacity>
            </View>
          </View>
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
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  topSection: {
    width: width * 1.5,
    height: 300,
    backgroundColor: '#F5F6FA',
    borderBottomLeftRadius: width * 0.75,
    borderBottomRightRadius: width * 0.75,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  innerContent: {
    width: width,
    height: '100%',
    alignSelf: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 50,
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  searchBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 20,
  },
  productImage: {
    width: 240,
    height: 240,
    resizeMode: 'contain',
  },
  heartBtn: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: '#FFFFFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  heart: {
    width: 14,
    height: 12,
    resizeMode: 'contain',
    tintColor: '#EEEEEE',
  },
  scrollContent: { paddingBottom: 110 },
  infoSection: { paddingHorizontal: 20, marginTop: 24 },
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
    width: (width - 52) / 2,
    borderWidth: 1,
    borderColor: '#F1F1F5',
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
