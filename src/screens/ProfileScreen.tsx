import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image,
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
  { id: 'orders', label: 'My Orders', image: require('../assets/icons/my_orders.png') },
  { id: 'about', label: 'About me', image: require('../assets/icons/about_me.png') },
  { id: 'favs', label: 'My Favorites', image: require('../assets/icons/my_favorite.png') },
  { id: 'address', label: 'My Address', image: require('../assets/icons/my_address.png') },
  { id: 'cards', label: 'Credit Cards', image: require('../assets/icons/credit_cards.png') },
  { id: 'trans', label: 'Transactions', image: require('../assets/icons/transactions.png') },
  { id: 'notif', label: 'Notifications', image: require('../assets/icons/notifications.png') },
];

const OrdersIcon = () => (
  <View style={styles.iconWrapper}>
    <View style={{ width: 18, height: 16, borderWidth: 1.5, borderColor: '#23AA49', borderRadius: 2, padding: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '100%', height: 1.5, backgroundColor: '#23AA49', position: 'absolute', top: 5 }} />
      <View style={{ width: 1.5, height: '100%', backgroundColor: '#23AA49' }} />
    </View>
  </View>
);

const UserIcon = () => (
  <View style={styles.iconWrapper}>
    <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: '#23AA49', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 6, height: 6, borderRadius: 3, borderWidth: 1.5, borderColor: '#23AA49', marginBottom: 1 }} />
      <View style={{ width: 12, height: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderWidth: 1.5, borderColor: '#23AA49', borderBottomWidth: 0 }} />
    </View>
  </View>
);

const FavoritesIcon = () => (
  <View style={styles.iconWrapper}>
    <Text style={{ color: '#23AA49', fontSize: 20, fontWeight: '300' }}>♡</Text>
  </View>
);

const AddressIcon = () => (
  <View style={styles.iconWrapper}>
    <View style={{ width: 16, height: 16, borderRadius: 8, borderWidth: 1.5, borderColor: '#23AA49', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#23AA49' }} />
      <View style={{ width: 4, height: 4, backgroundColor: '#23AA49', transform: [{ rotate: '45deg' }], position: 'absolute', bottom: -2 }} />
    </View>
  </View>
);

const CreditCardIcon = () => (
  <View style={styles.iconWrapper}>
    <View style={{ width: 20, height: 14, borderRadius: 2, borderWidth: 1.5, borderColor: '#23AA49', overflow: 'hidden', justifyContent: 'space-between', paddingBottom: 1 }}>
      <View style={{ width: '100%', height: 2.5, backgroundColor: '#23AA49', marginTop: 2 }} />
      <View style={{ width: 4, height: 2, backgroundColor: '#23AA49', marginLeft: 2 }} />
    </View>
  </View>
);

const TransactionsIcon = () => (
  <View style={styles.iconWrapper}>
    <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: '#23AA49', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      <Text style={{ color: '#23AA49', fontSize: 10, fontWeight: '800', lineHeight: 11 }}>$</Text>
      <View style={{ width: 16, height: 16, borderRadius: 8, borderWidth: 1, borderColor: '#23AA49', borderStyle: 'dashed', position: 'absolute', opacity: 0.3 }} />
    </View>
  </View>
);

const NotificationsIcon = () => (
  <View style={styles.iconWrapper}>
    <View style={{ width: 14, height: 14, borderTopLeftRadius: 7, borderTopRightRadius: 7, borderWidth: 1.5, borderColor: '#23AA49', alignItems: 'center', justifyContent: 'flex-end', position: 'relative' }}>
      <View style={{ width: 18, height: 1.5, backgroundColor: '#23AA49', position: 'absolute', bottom: -1 }} />
      <View style={{ width: 4, height: 2.5, backgroundColor: '#23AA49', borderBottomLeftRadius: 2, borderBottomRightRadius: 2, position: 'absolute', bottom: -3.5 }} />
    </View>
  </View>
);

const renderMenuIcon = (id: string, image: string) => {
  switch (id) {
    case 'orders':
      return <Image style={styles.iconWrapper} source={image} />
    // return <OrdersIcon />;
    case 'about':
      return <Image style={styles.iconWrapper} source={image} />
    // return <UserIcon />;
    case 'favs':
      return <Image style={styles.iconWrapper} source={image} />
    // return <FavoritesIcon />;
    case 'address':
      return <Image style={styles.iconWrapper} source={image} />
    case 'cards':
      return <Image style={styles.iconWrapper} source={image} />
    // return <CreditCardIcon />;
    case 'trans':
      return <Image style={styles.iconWrapper} source={image} />
    // return <TransactionsIcon />;
    case 'notif':
      return <Image style={styles.iconWrapper} source={image} />
    // return <NotificationsIcon />;
    default:
      return null;
  }
};

const AvatarIllustration = () => (
  <View style={styles.avatarContainer}>
    {/* Curly Hair Back */}
    <View style={[styles.hairCurl, { left: 10, top: 15, width: 40, height: 40 }]} />
    <View style={[styles.hairCurl, { right: 10, top: 15, width: 40, height: 40 }]} />
    <View style={[styles.hairCurl, { left: 0, top: 35, width: 44, height: 44 }]} />
    <View style={[styles.hairCurl, { right: 0, top: 35, width: 44, height: 44 }]} />
    <View style={[styles.hairCurl, { left: 5, top: 60, width: 42, height: 42 }]} />
    <View style={[styles.hairCurl, { right: 5, top: 60, width: 42, height: 42 }]} />
    <View style={[styles.hairCurl, { left: 18, top: 80, width: 38, height: 38 }]} />
    <View style={[styles.hairCurl, { right: 18, top: 80, width: 38, height: 38 }]} />

    {/* Neck */}
    <View style={styles.avatarNeck} />

    {/* Torso & Shirt */}
    <View style={styles.avatarShirt}>
      <View style={styles.avatarCollar} />
    </View>

    {/* Head/Face */}
    <View style={styles.avatarHead}>
      <View style={styles.eyesRow}>
        <View style={styles.eyeDot} />
        <View style={styles.eyeDot} />
      </View>
      <View style={styles.blushRow}>
        <View style={styles.blushDot} />
        <View style={styles.blushDot} />
      </View>
      <View style={styles.smile} />
    </View>

    {/* Hoop Earrings */}
    <View style={[styles.earring, { left: 14 }]} />
    <View style={[styles.earring, { right: 14 }]} />

    {/* Hair Front (Bangs/Top curls) */}
    <View style={styles.hairFront} />
    <View style={[styles.hairCurl, { left: 35, top: 8, width: 30, height: 30 }]} />
    <View style={[styles.hairCurl, { right: 35, top: 8, width: 30, height: 30 }]} />
  </View>
);

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onBack, onOrders, onAboutMe, onFavorites, onAddress, onCreditCards, onLogOut,
}) => {
  const handlePress = (id: string) => {
    if (id === 'orders') return onOrders();
    if (id === 'about') return onAboutMe();
    if (id === 'favs') return onFavorites();
    if (id === 'address') return onAddress();
    if (id === 'cards') return onCreditCards();
  };

  return (
    <View style={styles.container}>
      {/* Curved Background Arc */}
      <View style={styles.topArc} />

      {/* Header (Back button only) */}
      <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
        <Text style={styles.backArrow}>‹</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Image source={require('../assets/icons/profile_image.png')} style={styles.profileImage} />
            {/* <AvatarIllustration /> */}
            <TouchableOpacity style={styles.editBadge} activeOpacity={0.8}>
              {/* <Text style={styles.editBadgeText}>✏</Text> */}
              <Image source={require('../assets/icons/edit-icon.png')} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Jen</Text>
          <Text style={styles.userEmail}>eazyget@gmail.com</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handlePress(item.id)}
              activeOpacity={0.5}
            >
              {renderMenuIcon(item.id, item.image)}
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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topArc: {
    height: 190,
    backgroundColor: '#F4F6F8',
    borderBottomLeftRadius: 160,
    borderBottomRightRadius: 160,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    transform: [{ scaleX: 1.2 }],
  },
  backBtn: {
    width: 48,
    height: 48,
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
    elevation: 2,
    position: 'absolute',
    left: 20,
    top: 20,
    zIndex: 10,
  },
  backArrow: {
    color: '#06161C',
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 30,
    textAlign: 'center',
  },
  scrollContent: {
    paddingTop: 40,
    paddingBottom: 100,
  },
  avatarSection: {
    alignItems: 'center',
    paddingBottom: 28,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 1,
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#EBF2F7',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  hairCurl: {
    position: 'absolute',
    backgroundColor: '#331E3D',
    borderRadius: 25,
  },
  avatarNeck: {
    width: 20,
    height: 35,
    backgroundColor: '#FFC8A2',
    position: 'absolute',
    bottom: 30,
    zIndex: 2,
  },
  avatarShirt: {
    width: 84,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0088FF',
    position: 'absolute',
    bottom: -10,
    zIndex: 3,
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarCollar: {
    width: 32,
    height: 18,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: '#FFC8A2',
    position: 'absolute',
    top: 0,
  },
  avatarHead: {
    width: 58,
    height: 70,
    borderRadius: 29,
    backgroundColor: '#FFE0CC',
    position: 'absolute',
    bottom: 42,
    zIndex: 4,
    alignItems: 'center',
    paddingTop: 18,
  },
  eyesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 26,
    marginTop: 4,
  },
  eyeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#331E3D',
  },
  blushRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 44,
    position: 'absolute',
    top: 32,
  },
  blushDot: {
    width: 8,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF8B8B',
    opacity: 0.35,
  },
  smile: {
    width: 10,
    height: 5,
    borderBottomWidth: 1.5,
    borderColor: '#331E3D',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginTop: 8,
  },
  earring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5C060',
    position: 'absolute',
    bottom: 45,
    zIndex: 5,
  },
  hairFront: {
    width: 50,
    height: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#331E3D',
    position: 'absolute',
    top: 22,
    zIndex: 6,
  },
  editBadge: {
    position: 'absolute',
    top: 35,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#23AA49',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  editBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  userName: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'DMSans-Bold',
    // marginBottom: 1,
  },
  userEmail: {
    color: '#9E9E9E',
    fontSize: 12,
    fontFamily: "DMSans-Regular",

  },
  menuContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
  },
  iconWrapper: {
    width: 19,
    height: 19,
    resizeMode: 'contain',
    marginRight: 16,
  },
  menuLabel: {
    flex: 1,
    color: '#000000',
    fontSize: 12,
    fontFamily: 'DMSans-Bold',
  },
  menuArrow: {
    color: '#868889',
    fontSize: 30,
    fontWeight: '300',
  },
  logoutBtn: {
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
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
  },
  profileImage: {
    width: 146,
    height: 146,
    resizeMode: 'contain',
    borderRadius: 10,
    marginTop: 30
  },
  editIcon: {
    height: 16,
    width: 16,
    resizeMode: "contain"
  }
});

export default ProfileScreen;
