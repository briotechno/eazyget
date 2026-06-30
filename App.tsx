/**
 * Eazyget - Get Easy. Live Easy.
 * 16 Screens: Full app flow
 *
 * @format
 */

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// ── Auth Screens ──
import SplashScreen      from './src/screens/SplashScreen';
import IntroScreen       from './src/screens/IntroScreen';
import RegisterScreen    from './src/screens/RegisterScreen';
import LoginScreen       from './src/screens/LoginScreen';

// ── Main App Screens ──
import HomeScreen        from './src/screens/HomeScreen';
import ItemDetailsScreen from './src/screens/ItemDetailsScreen';
import AllProductScreen  from './src/screens/AllProductScreen';
import CartScreen        from './src/screens/CartScreen';
import FilterScreen      from './src/screens/FilterScreen';

// ── Profile & Account Screens ──
import FavoritesScreen   from './src/screens/FavoritesScreen';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';
import ProfileScreen     from './src/screens/ProfileScreen';
import AboutMeScreen     from './src/screens/AboutMeScreen';
import AddAddressScreen  from './src/screens/AddAddressScreen';
import CreditCardScreen  from './src/screens/CreditCardScreen';
import AddCardScreen     from './src/screens/AddCardScreen';

type Screen =
  | 'Splash' | 'Intro' | 'Register' | 'Login'
  | 'Home' | 'ItemDetails' | 'AllProduct' | 'Cart' | 'Filter'
  | 'Favorites' | 'OrderHistory' | 'Profile' | 'AboutMe'
  | 'AddAddress' | 'CreditCard' | 'AddCard';

interface Product {
  id: string;
  name: string;
  price: string;
  type: 'beef_cubes' | 'lamb' | 'chicken' | 'goat' | 'beef_boneless';
}

function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Splash');
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [cartItems, setCartItems] = useState<any[]>([]);

  const navigate = (screen: Screen) => setCurrentScreen(screen);

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    navigate('ItemDetails');
  };

  const handleAddToCart = (product: Product, qty: number) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { ...product, quantity: qty }];
    });
    navigate('Cart');
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>

        {/* ── Auth flow ── */}
        {currentScreen === 'Splash' && (
          <SplashScreen onFinish={() => navigate('Intro')} />
        )}
        {currentScreen === 'Intro' && (
          <IntroScreen onShopNow={() => navigate('Register')} />
        )}
        {currentScreen === 'Register' && (
          <RegisterScreen
            onContinue={() => navigate('Login')}
            onBack={() => navigate('Intro')}
          />
        )}
        {currentScreen === 'Login' && (
          <LoginScreen
            onContinue={() => navigate('Home')}
            onBack={() => navigate('Register')}
          />
        )}

        {/* ── Main app flow ── */}
        {currentScreen === 'Home' && (
          <HomeScreen
            onProductPress={handleProductPress}
            onAllProduct={() => navigate('AllProduct')}
            onCart={() => navigate('Cart')}
            onProfile={() => navigate('Profile')}
            onFavorites={() => navigate('Favorites')}
          />
        )}
        {currentScreen === 'ItemDetails' && (
          <ItemDetailsScreen
            product={selectedProduct}
            onBack={() => navigate('Home')}
            onAddToCart={handleAddToCart}
          />
        )}
        {currentScreen === 'AllProduct' && (
          <AllProductScreen
            onBack={() => navigate('Home')}
            onProductPress={handleProductPress}
            onFilter={() => navigate('Filter')}
          />
        )}
        {currentScreen === 'Cart' && (
          <CartScreen
            onBack={() => navigate('Home')}
            onCheckout={() => navigate('Home')}
            cartItems={cartItems.length > 0 ? cartItems : undefined}
          />
        )}
        {currentScreen === 'Filter' && (
          <FilterScreen
            onBack={() => navigate('AllProduct')}
            onApply={() => navigate('AllProduct')}
            onClear={() => navigate('AllProduct')}
          />
        )}

        {/* ── Profile & Account flow ── */}
        {currentScreen === 'Favorites' && (
          <FavoritesScreen
            onBack={() => navigate('Home')}
            onProductPress={handleProductPress}
          />
        )}
        {currentScreen === 'OrderHistory' && (
          <OrderHistoryScreen
            onBack={() => navigate('Profile')}
          />
        )}
        {currentScreen === 'Profile' && (
          <ProfileScreen
            onBack={() => navigate('Home')}
            onOrders={() => navigate('OrderHistory')}
            onAboutMe={() => navigate('AboutMe')}
            onFavorites={() => navigate('Favorites')}
            onAddress={() => navigate('AddAddress')}
            onCreditCards={() => navigate('CreditCard')}
            onLogOut={() => navigate('Login')}
          />
        )}
        {currentScreen === 'AboutMe' && (
          <AboutMeScreen
            onBack={() => navigate('Profile')}
            onUpdate={() => navigate('Profile')}
          />
        )}
        {currentScreen === 'AddAddress' && (
          <AddAddressScreen
            onBack={() => navigate('Profile')}
            onSave={() => navigate('Profile')}
          />
        )}
        {currentScreen === 'CreditCard' && (
          <CreditCardScreen
            onBack={() => navigate('Profile')}
            onAddCard={() => navigate('AddCard')}
            onSave={() => navigate('Profile')}
          />
        )}
        {currentScreen === 'AddCard' && (
          <AddCardScreen
            onBack={() => navigate('CreditCard')}
            onSave={() => navigate('CreditCard')}
          />
        )}

      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
