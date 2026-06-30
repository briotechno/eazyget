import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import MeatImage from '../components/MeatImage';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: 'beef', label: 'Beef', type: 'beef_cubes' as const, image: require('../assets/cat-1.png') },
  { id: 'chicken', label: 'Chicken', type: 'chicken' as const, image: require('../assets/cat-2.png') },
  { id: 'goat', label: 'Goat', type: 'goat' as const, image: require('../assets/cat-3.png') },
  { id: 'lamb', label: 'Lamb', type: 'lamb' as const, image: require('../assets/cat-4.png') },
];

const BEST_SELLING = [
  { id: '1', name: 'Beef Boneless Cubes', price: '1kg, 40$', type: 'beef_cubes' as const, image: require('../assets/buy-1.png') },
  { id: '2', name: 'Lamb Meat', price: '1kg, 45$', type: 'lamb' as const, image: require('../assets/buy-2.png') },
];

interface HomeScreenProps {
  onProductPress: (product: any) => void;
  onAllProduct: () => void;
  onCart: () => void;
  onProfile?: () => void;
  onFavorites?: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  onProductPress,
  onAllProduct,
  onCart,
  onProfile,
  onFavorites,
}) => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  return (
    <SafeAreaView style={styles.container}>
      {/* Main card */}
      <View style={styles.card}>
        {/* Header inside card */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>👧🏻</Text>
            </View>
            <View>
              <Text style={styles.greeting}>Good morning</Text>
              <Text style={styles.userName}>Jen</Text>
            </View>
          </View>
          <View style={styles.locationChip}>
            <Image source={require('../assets/icons/map-pin.png')} style={styles.searchIcon} />
            <Text style={styles.locationText}>My Address</Text>
            <Text style={styles.chevron}> ∨</Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Image source={require('../assets/icons/search.png')} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search category"
            placeholderTextColor="#979899"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Split Ramadan Offers Promo Banner */}
          <View style={styles.promoBanner}>
            <Image source={require('../assets/slider-1.png')} style={styles.promoBannerImage} />
            {/* <View style={styles.promoLeftCardboard}>
              <MeatImage type="beef_boneless" size={85} />
              <Text style={styles.promoLabel}>Beef Boneless</Text>
            </View>
            <View style={styles.promoRightPanel}>
              <Text style={styles.promoSubtitle}>Ramadan Offers</Text>
              <Text style={styles.promoTitleText}>Get 25%</Text>
              <TouchableOpacity style={styles.promoPillBtn}>
                <Text style={styles.promoPillText}>Grab Offer ⧁</Text>
              </TouchableOpacity>
            </View> */}
          </View>

          {/* Categories */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories 😋</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity key={cat.id} style={styles.categoryItem} onPress={onAllProduct}>
                <View style={styles.categoryCircle}>
                  <Image source={cat.image} style={styles.categoryImage} />
                </View>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Best Selling */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best selling 🔥</Text>
            <TouchableOpacity onPress={onAllProduct}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productRow}>
            {BEST_SELLING.map(product => {
              const isLamb = product.name.includes('Lamb');
              return (
                <TouchableOpacity
                  key={product.id}
                  style={styles.productCard}
                  onPress={() => onProductPress(product)}
                >
                  <View style={styles.productImageBox}>
                    {/* <MeatImage type={product.type} size={85} /> */}
                    <Image source={product.image} style={styles.productImage} />
                    <TouchableOpacity style={styles.heartCircle}>
                      <Text style={[styles.heartIcon, isLamb && styles.heartIconActive]}>
                        {isLamb ? '♥' : '♡'}
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
              );
            })}
          </ScrollView>
        </ScrollView>

        {/* Curved Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => {
              setActiveTab('home');
            }}
          >
            <Image source={require('../assets/icons/tab-1.png')} style={styles.navIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navTab}
            onPress={() => {
              setActiveTab('products');
              onAllProduct();
            }}
          >
            <Image source={require('../assets/icons/tab-2.png')} style={styles.navIcon} />
          </TouchableOpacity>

          {/* Center Floating Cart Tab with Red Badge */}
          <View style={styles.cartTabContainer}>
            <TouchableOpacity
              style={styles.floatingCart}
              onPress={() => {
                setActiveTab('cart');
                onCart();
              }}
            >
              <Image source={require('../assets/icons/tab-3.png')} style={styles.navIcon} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>4</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.navTab}
            onPress={() => {
              setActiveTab('history');
              onAllProduct();
            }}
          >
            <Image source={require('../assets/icons/tab-4.png')} style={styles.navIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navTab}
            onPress={() => {
              setActiveTab('profile');
              if (onProfile) onProfile();
            }}
          >
            <Image source={require('../assets/icons/tab-5.png')} style={styles.navIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  promoBannerImage: {
    width: "100%",
    height: 134,
    resizeMode: 'contain',
  },
  productImage: {
    width: 134,
    height: 134,
    resizeMode: 'contain',
  },
  categoryImage: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
  },
  navIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  screenHeader: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  screenHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8e8e93',
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // borderTopLeftRadius: 36,
    // borderTopRightRadius: 36,
    overflow: 'hidden',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E5E9F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  greeting: {
    color: '#979899',
    fontSize: 12,
    fontWeight: '500',
  },
  userName: {
    color: '#1a1a1a',
    fontWeight: '700',
    fontSize: 16,
    marginTop: 2,
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e8ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  locationPin: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#23AA49',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  locationPinInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
  },
  locationText: {
    color: '#1a1a1a',
    fontSize: 13,
    fontWeight: '600',
  },
  chevron: {
    color: '#979899',
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  searchIcon: {
    height: 15,
    width: 15,
    resizeMode: "contain",
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#1a1a1a',
    fontSize: 14,
    paddingVertical: 10,
  },
  scrollContent: {
    paddingBottom: 90,
  },
  promoBanner: {
    marginHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    height: 145,
    overflow: 'hidden',
    marginBottom: 24,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.05,
    // shadowRadius: 6,
    // elevation: 2,
  },
  promoLeftCardboard: {
    flex: 1.1,
    backgroundColor: '#EAE6DF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  promoLabel: {
    fontSize: 11,
    color: '#32343E',
    fontWeight: '700',
    marginTop: 6,
  },
  promoRightPanel: {
    flex: 0.9,
    backgroundColor: '#23AA49',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  promoSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  promoTitleText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  promoPillBtn: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  promoPillText: {
    color: '#23AA49',
    fontSize: 11,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#1a1a1a',
    fontSize: 17,
    fontWeight: '700',
  },
  seeAll: {
    color: '#23AA49',
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesRow: {
    paddingLeft: 16,
    marginBottom: 24,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#f0f2f5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryLabel: {
    color: '#32343E',
    fontSize: 13,
    fontWeight: '600',
  },
  productRow: {
    paddingLeft: 16,
    marginBottom: 24,
  },
  productCard: {
    width: 165,
    backgroundColor: '#F3F5F7',
    borderRadius: 10,
    padding: 12,
    marginRight: 16,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    // elevation: 2,
  },
  productImageBox: {
    width: '100%',
    height: 110,
    backgroundColor: '#F3F5F7',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  heartCircle: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  heartIcon: {
    fontSize: 16,
    color: '#cbd5e1',
  },
  heartIconActive: {
    color: 'green',
  },
  productName: {
    color: '#1a1a1a',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    color: '#FF4B4B',
    fontSize: 14,
    fontWeight: '700',
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#23AA49',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 22,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    height: 75,
    paddingBottom: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 10,
  },
  navTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconActive: {
    color: '#1a1a1a',
  },
  cartTabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  floatingCart: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#23AA49',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -24,
    shadowColor: '#23AA49',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  cartIcon: {
    fontSize: 24,
    color: '#ffffff',
  },
  badge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FF4B4B',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
