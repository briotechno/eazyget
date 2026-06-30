import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';

interface ProfileScreenProps {
  onBack: () => void;
  onOrders: () => void;
  onAboutMe: () => void;
  onFavorites: () => void;
  onAddress: () => void;
  onCreditCards: () => void;
  onLogOut: () => void;
}

const MENU_ITEMS = [
  { id: 'orders',   icon: '📦', label: 'My Orders',    hasArrow: true },
  { id: 'about',    icon: '👤', label: 'About me',     hasArrow: true },
  { id: 'favs',     icon: '♡',  label: 'My Favorites', hasArrow: true },
  { id: 'address',  icon: '📍', label: 'My Address',   hasArrow: true },
  { id: 'cards',    icon: '💳', label: 'Credit cards', hasArrow: true },
  { id: 'trans',    icon: '↔️', label: 'Transactions', hasArrow: true },
  { id: 'notif',    icon: '🔔', label: 'Notifications',hasArrow: true },
];

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onBack, onOrders, onAboutMe, onFavorites, onAddress, onCreditCards, onLogOut,
}) => {
  const handlePress = (id: string) => {
    if (id === 'orders')  return onOrders();
    if (id === 'about')   return onAboutMe();
    if (id === 'favs')    return onFavorites();
    if (id === 'address') return onAddress();
    if (id === 'cards')   return onCreditCards();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarEmoji}>👩‍🦱</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedCheck}>✓</Text>
            </View>
          </View>
          <Text style={styles.userName}>Jen</Text>
          <Text style={styles.userEmail}>eazyme@gmail.com</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handlePress(item.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Log Out */}
      <TouchableOpacity style={styles.logoutBtn} onPress={onLogOut} activeOpacity={0.85}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 16,
    paddingTop: 20, paddingBottom: 12,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#f0f1f5', justifyContent: 'center', alignItems: 'center',
  },
  backArrow: { color: '#1a1a1a', fontSize: 22, fontWeight: '300', lineHeight: 24 },
  headerTitle: { color: '#1a1a1a', fontSize: 17, fontWeight: '700' },
  scrollContent: { paddingBottom: 100 },
  avatarSection: { alignItems: 'center', paddingTop: 16, paddingBottom: 28 },
  avatarWrapper: { position: 'relative', marginBottom: 12 },
  avatarCircle: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#f0f1f5', justifyContent: 'center', alignItems: 'center',
    borderWidth: 3, borderColor: '#2ecc71',
  },
  avatarEmoji: { fontSize: 50 },
  verifiedBadge: {
    position: 'absolute', bottom: 2, right: 2,
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: '#2ecc71', justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#141414',
  },
  verifiedCheck: { color: '#fff', fontSize: 12, fontWeight: '900' },
  userName: { color: '#1a1a1a', fontSize: 20, fontWeight: '800', marginBottom: 4 },
  userEmail: { color: '#888', fontSize: 13 },
  menuContainer: { paddingHorizontal: 16 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#ffffff', borderRadius: 14,
    paddingHorizontal: 16, paddingVertical: 15,
    marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
  },
  menuIcon: { fontSize: 20, marginRight: 14, width: 26, textAlign: 'center' },
  menuLabel: { flex: 1, color: '#1a1a1a', fontSize: 14, fontWeight: '500' },
  menuArrow: { color: '#bbb', fontSize: 20, fontWeight: '300' },
  logoutBtn: {
    position: 'absolute', bottom: 24, left: 20, right: 20,
    backgroundColor: '#2ecc71', paddingVertical: 16,
    borderRadius: 30, alignItems: 'center',
    shadowColor: '#2ecc71', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 8,
  },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
});

export default ProfileScreen;
