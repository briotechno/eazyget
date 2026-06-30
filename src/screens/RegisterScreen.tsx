import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import EazygetLogo from '../components/EazygetLogo';

interface RegisterScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onContinue, onBack }) => {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Main white card */}
        <View style={styles.card}>
          {/* Circular Back Button inside the card */}
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <View style={styles.backCircle}>
              <View style={styles.chevron} />
            </View>
          </TouchableOpacity>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Logo */}
            <View style={styles.logoContainer}>
              <EazygetLogo size="small" style={styles.logoStyle} />
            </View>

            {/* Title */}
            <Text style={styles.title}>Enter your email{'\n'}address</Text>

            {/* Description */}
            <Text style={styles.description}>
              There are many advantages to creating an account: the payment
              process is faster, shipment tracking is possible and much more.
            </Text>

            {/* Email Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>EMAIL*</Text>
              <TextInput
                style={styles.input}
                placeholder="example@gmail.com"
                placeholderTextColor="#9ea0a5"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              style={[styles.continueButton, !email && styles.continueButtonDisabled]}
              onPress={onContinue}
              activeOpacity={0.85}
              disabled={!email}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8e8e93',
  },
  keyboardContainer: {
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  backCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    borderWidth: 1.2,
    borderColor: '#f2f2f7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  chevron: {
    width: 9,
    height: 9,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#1a1a1a',
    transform: [{ rotate: '45deg' }],
    marginLeft: 3,
  },
  scrollContent: {
    paddingTop: 56,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoStyle: {
    marginTop: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
    lineHeight: 36,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#979899',
    lineHeight: 22,
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 22,
    fontWeight: 500
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#32343E',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#f0f2f7',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#1a1a1a',
    height: 62,
    fontWeight: "400"
  },
  continueButton: {
    backgroundColor: '#23AA49',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#23AA49',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonDisabled: {
    backgroundColor: '#a8e6c1',
    elevation: 0,
    shadowOpacity: 0,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default RegisterScreen;
