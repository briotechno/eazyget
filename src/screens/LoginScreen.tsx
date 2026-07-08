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
import { useFormik } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface LoginScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onContinue, onBack }) => {
  const [rememberMe, setRememberMe] = useState(false);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: () => {
      onContinue();
    },
  });

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

            {/* Description */}
            <Text style={styles.description}>
              If you have an account, sign {'\n'}in with your username or{'\n'} email address.
            </Text>

            {/* Email Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>EMAIL*</Text>
              <TextInput
                style={[
                  styles.input,
                  formik.touched.email && formik.errors.email ? styles.inputError : null
                ]}
                placeholder="eazyme@gmail.com"
                placeholderTextColor="#9ea0a5"
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {formik.touched.email && formik.errors.email && (
                <Text style={styles.errorText}>{formik.errors.email}</Text>
              )}
            </View>

            {/* Password Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>PASSWORD*</Text>
              <TextInput
                style={[
                  styles.input,
                  formik.touched.password && formik.errors.password ? styles.inputError : null
                ]}
                placeholder="••••••••••"
                placeholderTextColor="#9ea0a5"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                secureTextEntry
              />
              {formik.touched.password && formik.errors.password && (
                <Text style={styles.errorText}>{formik.errors.password}</Text>
              )}
            </View>

            {/* Remember Me & Forgot Password */}
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.rememberMeRow}
                onPress={() => setRememberMe(!rememberMe)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                  {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.rememberMeText}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.forgotText}>Forgot Password</Text>
              </TouchableOpacity>
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              style={[
                styles.continueButton,
                (!formik.values.email || !formik.values.password) && styles.continueButtonDisabled
              ]}
              onPress={() => formik.handleSubmit()}
              activeOpacity={0.85}
              disabled={!formik.values.email || !formik.values.password}
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
  description: {
    fontSize: 20,
    marginBottom: 32,
    textAlign: 'center',
    fontFamily: 'DMSans-Medium',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: "#32343E",
    marginBottom: 8,
    fontFamily: "DMSans-Regular",
  },
  input: {
    backgroundColor: '#f0f2f7',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#1a1a1a',
    height: 62,
    fontFamily: "DMSans-Regular",
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 4,
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#bbb',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#23AA49',
    borderColor: '#23AA49',
  },
  checkmark: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  rememberMeText: {
    fontSize: 13,
    color: '#7E8A97',
    fontFamily: "DMSans-Regular",
  },
  forgotText: {
    fontSize: 14,
    color: '#8E98A4',
    fontFamily: "DMSans-Regular",
  },
  continueButton: {
    backgroundColor: '#23AA49',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
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
    fontFamily: 'DMSans-Bold',
  },
  inputError: {
    borderColor: '#ff4d4f',
    borderWidth: 1,
  },
  errorText: {
    color: '#ff4d4f',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'DMSans-Regular',
  },
});

export default LoginScreen;
