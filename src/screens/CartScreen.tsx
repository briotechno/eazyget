import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  PanResponder,
} from 'react-native';

interface CartItem {
  id: string;
  name: string;
  price: string;
  type: 'beef_cubes' | 'lamb' | 'chicken' | 'goat' | 'beef_boneless';
  quantity: number;
}

interface CartScreenProps {
  onBack: () => void;
  onCheckout: () => void;
  cartItems?: CartItem[];
}

const DEFAULT_ITEMS: CartItem[] = [
  { id: '1', name: 'Lamb Meat', price: '1kg, 45$', type: 'lamb', quantity: 2 },
  { id: '2', name: 'Beef Boneless Cubes', price: '1kg, 40$', type: 'beef_cubes', quantity: 4 },
  { id: '3', name: 'Lamb Meat', price: '1kg, 45$', type: 'lamb', quantity: 2 },
  { id: '4', name: 'Beef Boneless Cubes', price: '1kg, 40$', type: 'beef_cubes', quantity: 4 },
];

const getItemImage = (type: string) => {
  if (type === 'lamb') {
    return require('../assets/buy-2.png');
  }
  if (type === 'beef_cubes' || type === 'beef_boneless') {
    return require('../assets/buy-1.png');
  }
  return require('../assets/Beef-Boneless.png');
};

interface SwipeableRowProps {
  children: React.ReactNode;
  onDelete: () => void;
  initialOpen?: boolean;
}

const SwipeableRow: React.FC<SwipeableRowProps> = ({ children, onDelete, initialOpen = false }) => {
  const deleteBtnWidth = 80;
  const translateX = useRef(new Animated.Value(initialOpen ? -deleteBtnWidth : 0)).current;
  const isOpen = useRef(initialOpen);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dy) < 8;
      },
      onPanResponderMove: (_, gestureState) => {
        let newX = (isOpen.current ? -deleteBtnWidth : 0) + gestureState.dx;
        if (newX > 0) newX = 0;
        if (newX < -deleteBtnWidth - 15) {
          const excess = newX + deleteBtnWidth + 15;
          newX = -deleteBtnWidth - 15 + excess * 0.2;
        }
        translateX.setValue(newX);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -25) {
          Animated.spring(translateX, {
            toValue: -deleteBtnWidth,
            useNativeDriver: true,
            friction: 6,
            tension: 40,
          }).start();
          isOpen.current = true;
        } else if (gestureState.dx > 25) {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            friction: 6,
            tension: 40,
          }).start();
          isOpen.current = false;
        } else {
          Animated.spring(translateX, {
            toValue: isOpen.current ? -deleteBtnWidth : 0,
            useNativeDriver: true,
            friction: 6,
            tension: 40,
          }).start();
        }
      },
    })
  ).current;

  const closeRow = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      friction: 6,
      tension: 40,
    }).start();
    isOpen.current = false;
  };

  return (
    <View style={styles.rowContainer}>
      <View style={styles.deleteButtonContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            closeRow();
            onDelete();
          }}
          activeOpacity={0.8}
        >
          <View style={styles.trashContainer}>
            <View style={styles.trashCap} />
            <View style={styles.trashLid} />
            <View style={styles.trashBody}>
              <View style={styles.trashLine} />
              <View style={styles.trashLine} />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.rowContent,
          {
            transform: [{ translateX }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
};

const CartScreen: React.FC<CartScreenProps> = ({ onBack, onCheckout, cartItems }) => {
  const [items, setItems] = useState<CartItem[]>(cartItems || DEFAULT_ITEMS);

  const updateQty = (id: string, delta: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cart</Text>
          <View style={{ width: 48 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <SwipeableRow
                onDelete={() => removeItem(item.id)}
                initialOpen={item.id === '2'}
              >
                <View style={styles.cartItem}>
                  {/* Product image */}
                  <View style={styles.itemImageBox}>
                    <Image source={getItemImage(item.type)} style={styles.productImg} />
                  </View>

                  {/* Product info */}
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                  </View>

                  {/* Quantity & Controls */}
                  <View style={styles.itemActions}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQty(item.id, -1)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.qtyBtnText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyValue}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={[styles.qtyBtn, styles.qtyBtnGreen]}
                      onPress={() => updateQty(item.id, 1)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.qtyBtnText, { color: '#fff' }]}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </SwipeableRow>
              {index < items.length - 1 && <View style={styles.separator} />}
            </React.Fragment>
          ))}
        </ScrollView>

        {/* Checkout Button */}
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={onCheckout}
          activeOpacity={0.85}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1E1E1E',
    // paddingTop: 30,
    // paddingBottom: 15,
    // paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // borderRadius: 36,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    // elevation: 2,
  },
  backArrow: {
    color: '#000000',
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 20,
    textAlign: 'center',
  },
  headerTitle: {
    color: '#1a1a1a',
    fontSize: 22,
    fontWeight: '700',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  rowContainer: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  rowContent: {
    backgroundColor: '#FFFFFF',
  },
  deleteButtonContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: '#FF4B4B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trashContainer: {
    width: 24,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trashCap: {
    width: 8,
    height: 2.5,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 1.5,
    borderTopRightRadius: 1.5,
    marginBottom: 1,
  },
  trashLid: {
    width: 18,
    height: 2.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  trashBody: {
    width: 14,
    height: 15,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderTopWidth: 0,
    borderBottomLeftRadius: 2.5,
    borderBottomRightRadius: 2.5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 2.5,
    paddingBottom: 1.5,
    marginTop: 1,
  },
  trashLine: {
    width: 1.5,
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 0.75,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 16,
  },
  itemImageBox: {
    width: 72,
    height: 72,
    // backgroundColor: '#F8F9FA',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImg: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    marginBottom: 6,
  },
  itemPrice: {
    color: '#FF324B',
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F5F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnGreen: {
    backgroundColor: '#23AA49',
  },
  qtyBtnText: {
    color: '#1a1a1a',
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
  },
  qtyValue: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: '700',
    minWidth: 24,
    textAlign: 'center',
    marginHorizontal: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
  },
  checkoutBtn: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: '#23AA49',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#23AA49',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'DMSans-Bold',

  },
});

export default CartScreen;
