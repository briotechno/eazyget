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
import SplashScreen from './src/screens/SplashScreen';
import IntroScreen from './src/screens/IntroScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';

// ── Main App Screens ──
import HomeScreen from './src/screens/HomeScreen';
import ItemDetailsScreen from './src/screens/ItemDetailsScreen';
import AllProductScreen from './src/screens/AllProductScreen';
import CartScreen from './src/screens/CartScreen';
import FilterScreen from './src/screens/FilterScreen';

// ── Profile & Account Screens ──
import FavoritesScreen from './src/screens/FavoritesScreen';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AboutMeScreen from './src/screens/AboutMeScreen';
import AddAddressScreen from './src/screens/AddAddressScreen';
import CreditCardScreen from './src/screens/CreditCardScreen';
import AddCardScreen from './src/screens/AddCardScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

interface Product {
  id: string;
  name: string;
  price: string;
  type: 'beef_cubes' | 'lamb' | 'chicken' | 'goat' | 'beef_boneless';
}

export type RootStackParamList = {
  Splash: undefined;
  Intro: undefined;
  Register: undefined;
  Login: undefined;
  Home: undefined;
  ItemDetails: { product?: Product };
  AllProduct: undefined;
  Cart: undefined;
  Filter: undefined;
  Favorites: undefined;
  OrderHistory: undefined;
  Profile: undefined;
  AboutMe: undefined;
  AddAddress: undefined;
  CreditCard: undefined;
  AddCard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const handleAddToCart = (product: Product, qty: number) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          {/* ── Auth flow ── */}
          <Stack.Screen name="Splash">
            {({ navigation }) => (
              <SplashScreen onFinish={() => navigation.navigate('Intro')} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Intro">
            {({ navigation }) => (
              <IntroScreen onShopNow={() => navigation.navigate('Register')} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Register">
            {({ navigation }) => (
              <RegisterScreen
                onContinue={() => navigation.navigate('Login')}
                onBack={() => navigation.navigate('Intro')}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Login">
            {({ navigation }) => (
              <LoginScreen
                onContinue={() => navigation.navigate('Home')}
                onBack={() => navigation.navigate('Register')}
              />
            )}
          </Stack.Screen>

          {/* ── Main app flow ── */}
          <Stack.Screen name="Home">
            {({ navigation }) => (
              <HomeScreen
                onProductPress={(product) => navigation.navigate('ItemDetails', { product })}
                onAllProduct={() => navigation.navigate('AllProduct')}
                onCart={() => navigation.navigate('Cart')}
                onProfile={() => navigation.navigate('Profile')}
                onFavorites={() => navigation.navigate('Favorites')}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="ItemDetails">
            {({ route, navigation }) => (
              <ItemDetailsScreen
                product={route.params?.product}
                onBack={() => navigation.goBack()}
                onAddToCart={(product, qty) => {
                  handleAddToCart(product, qty);
                  navigation.navigate('Cart');
                }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="AllProduct">
            {({ navigation }) => (
              <AllProductScreen
                onBack={() => navigation.goBack()}
                onProductPress={(product) => navigation.navigate('ItemDetails', { product })}
                onFilter={() => navigation.navigate('Filter')}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Cart">
            {({ navigation }) => (
              <CartScreen
                onBack={() => navigation.goBack()}
                onCheckout={() => navigation.navigate('Home')}
                cartItems={cartItems.length > 0 ? cartItems : undefined}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Filter">
            {({ navigation }) => (
              <FilterScreen
                onBack={() => navigation.goBack()}
                onApply={() => navigation.navigate('AllProduct')}
                onClear={() => navigation.navigate('AllProduct')}
              />
            )}
          </Stack.Screen>

          {/* ── Profile & Account flow ── */}
          <Stack.Screen name="Favorites">
            {({ navigation }) => (
              <FavoritesScreen
                onBack={() => navigation.goBack()}
                onProductPress={(product) => navigation.navigate('ItemDetails', { product })}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="OrderHistory">
            {({ navigation }) => (
              <OrderHistoryScreen onBack={() => navigation.goBack()} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Profile">
            {({ navigation }) => (
              <ProfileScreen
                onBack={() => navigation.goBack()}
                onOrders={() => navigation.navigate('OrderHistory')}
                onAboutMe={() => navigation.navigate('AboutMe')}
                onFavorites={() => navigation.navigate('Favorites')}
                onAddress={() => navigation.navigate('AddAddress')}
                onCreditCards={() => navigation.navigate('CreditCard')}
                onLogOut={() => navigation.navigate('Login')}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="AboutMe">
            {({ navigation }) => (
              <AboutMeScreen
                onBack={() => navigation.goBack()}
                onUpdate={() => navigation.navigate('Profile')}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="AddAddress">
            {({ navigation }) => (
              <AddAddressScreen
                onBack={() => navigation.goBack()}
                onSave={() => navigation.navigate('Profile')}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="CreditCard">
            {({ navigation }) => (
              <CreditCardScreen
                onBack={() => navigation.goBack()}
                onAddCard={() => navigation.navigate('AddCard')}
                onSave={() => navigation.navigate('Profile')}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="AddCard">
            {({ navigation }) => (
              <AddCardScreen
                onBack={() => navigation.goBack()}
                onSave={() => navigation.navigate('CreditCard')}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
