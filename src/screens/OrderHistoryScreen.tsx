import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image,
} from 'react-native';
import MeatImage from '../components/MeatImage';

const ORDERS = [
  { id: '1', name: 'Beef Boneless', desc: 'Premium quality fresh beef boneless cuts, carefully trimmed.', weight: '2kg, 90$', type: 'beef_boneless' as const, image: require('../assets/Beef-Boneless.png') },
  { id: '2', name: 'Beef Boneless', desc: 'Premium quality fresh beef boneless cuts, carefully trimmed.', weight: '1kg, 45$', type: 'beef_cubes' as const, image: require('../assets/Beef-Boneless.png') },
  { id: '3', name: 'Beef Boneless', desc: 'Boneless cuts, carefully, tastefully trimmed.', weight: '3kg, 90$', type: 'beef_boneless' as const, image: require('../assets/Beef-Boneless.png') },
  { id: '4', name: 'Beef Boneless', desc: 'Premium quality fresh beef boneless cuts, carefully trimmed.', weight: '1kg, 45$', type: 'lamb' as const, image: require('../assets/Beef-Boneless.png') },
  { id: '5', name: 'Beef Boneless', desc: 'Premium quality fresh beef boneless cuts, carefully trimmed.', weight: '1kg, 45$', type: 'beef_cubes' as const, image: require('../assets/Beef-Boneless.png') },
];

interface OrderHistoryScreenProps {
  onBack: () => void;
}

const OrderHistoryScreen: React.FC<OrderHistoryScreenProps> = ({ onBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {ORDERS.map(order => (
          <View key={order.id} style={styles.orderCard}>
            {/* <View style={styles.orderImageBox}> */}
            <Image source={order.image} style={styles.orderImage} />
            {/* </View> */}
            <View style={styles.orderInfo}>
              <Text style={styles.orderName}>{order.name}</Text>
              <Text style={styles.orderDesc} numberOfLines={2}>{order.desc}</Text>
            </View>
            <Text style={styles.orderWeight}>{order.weight}</Text>
          </View>
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
  headerTitle: { color: '#1a1a1a', fontSize: 20, fontFamily: 'DMSans-Bold', },
  scrollContent: { paddingBottom: 30 },
  orderCard: {
    flexDirection: 'row', alignItems: 'center',
    // backgroundColor: '#ffffff', 
    borderRadius: 16,
    padding: 12, marginBottom: 12, gap: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4,
    //  elevation: 1,
  },
  orderImageBox: {
    width: 68, height: 68, backgroundColor: '#f0f1f5',
    borderRadius: 12, justifyContent: 'center', alignItems: 'center',
  },
  orderInfo: { flex: 1 },
  orderName: { color: '#1a1a1a', fontSize: 14, fontFamily: 'DMSans-Bold', },
  orderDesc: { color: '#777', fontSize: 14, lineHeight: 16, fontFamily: 'DMSans-Regular', },
  orderWeight: { color: '#FF324B', fontSize: 16, fontFamily: 'DMSans-Bold', },
  orderImage: {
    width: 68,
    height: 68,
    resizeMode: "contain"
  }
});

export default OrderHistoryScreen;
