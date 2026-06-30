import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity,
} from 'react-native';
import MeatImage from '../components/MeatImage';

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

  const getTotal = () => {
    return items.reduce((sum, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
      return sum + price * item.quantity;
    }, 0);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {items.map(item => (
          <View key={item.id} style={styles.cartItem}>
            {/* Product image */}
            <View style={styles.itemImageBox}>
              <MeatImage type={item.type} size={56} />
            </View>

            {/* Product info */}
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>

            {/* Quantity & Delete */}
            <View style={styles.itemActions}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => updateQty(item.id, -1)}
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{item.quantity}</Text>
              <TouchableOpacity
                style={[styles.qtyBtn, styles.qtyBtnGreen]}
                onPress={() => updateQty(item.id, 1)}
              >
                <Text style={[styles.qtyBtnText, { color: '#fff' }]}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => removeItem(item.id)}
              >
                <Text style={styles.deleteIcon}>🗑</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${getTotal()}</Text>
        </View>
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
  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },
  cartItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#ffffff', borderRadius: 16,
    padding: 12, marginBottom: 12, gap: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 1,
  },
  itemImageBox: {
    width: 64, height: 64, backgroundColor: '#2a2a2a',
    borderRadius: 12, justifyContent: 'center', alignItems: 'center',
  },
  itemInfo: { flex: 1 },
  itemName: { color: '#1a1a1a', fontSize: 13, fontWeight: '600', marginBottom: 4 },
  itemPrice: { color: '#2ecc71', fontSize: 12, fontWeight: '700' },
  itemActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: '#f0f1f5', justifyContent: 'center', alignItems: 'center',
  },
  qtyBtnGreen: { backgroundColor: '#2ecc71' },
  qtyBtnText: { color: '#1a1a1a', fontSize: 16, fontWeight: '700', lineHeight: 20 },
  qtyValue: { color: '#1a1a1a', fontSize: 14, fontWeight: '700', minWidth: 18, textAlign: 'center' },
  deleteBtn: {
    width: 32, height: 32, borderRadius: 8,
    backgroundColor: '#e74c3c', justifyContent: 'center', alignItems: 'center', marginLeft: 4,
  },
  deleteIcon: { fontSize: 15 },
  totalRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 16,
    borderTopWidth: 1, borderTopColor: '#e8e8e8', marginTop: 8,
  },
  totalLabel: { color: '#888', fontSize: 15, fontWeight: '600' },
  totalValue: { color: '#2ecc71', fontSize: 20, fontWeight: '800' },
  checkoutBtn: {
    position: 'absolute', bottom: 24, left: 20, right: 20,
    backgroundColor: '#2ecc71', paddingVertical: 16,
    borderRadius: 30, alignItems: 'center',
    shadowColor: '#2ecc71', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 8,
  },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
});

export default CartScreen;
