import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, KeyboardAvoidingView, Platform,
  Image,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const aboutMeSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  phone: Yup.string()
    .min(10, 'Phone number must be at least 10 characters')
    .required('Phone number is required'),
});

interface AboutMeScreenProps {
  onBack: () => void;
  onUpdate: () => void;
}

const AboutMeScreen: React.FC<AboutMeScreenProps> = ({ onBack, onUpdate }) => {
  const formik = useFormik({
    initialValues: {
      name: 'Jen',
      email: 'eazyget@gmail.com',
      phone: '+01 (999) 999 9999',
    },
    validationSchema: aboutMeSchema,
    onSubmit: () => {
      onUpdate();
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      {/* White Card container */}
      <View style={styles.whiteCard}>
        {/* Curved Background Arc */}
        <View style={styles.topArc} />

        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <Image source={require('../assets/icons/profile_image.png')} style={styles.profileImage} />
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.formSection}>
            <View style={styles.field}>
              <Text style={styles.label}>NAME</Text>
              <TextInput
                style={[
                  styles.input,
                  formik.touched.name && formik.errors.name ? styles.inputError : null
                ]}
                value={formik.values.name}
                onChangeText={formik.handleChange('name')}
                onBlur={formik.handleBlur('name')}
                placeholderTextColor="#A1A1A1"
                selectionColor="#23AA49"
              />
              {formik.touched.name && formik.errors.name && (
                <Text style={styles.errorText}>{formik.errors.name}</Text>
              )}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>EMAIL ID</Text>
              <TextInput
                style={[
                  styles.input,
                  formik.touched.email && formik.errors.email ? styles.inputError : null
                ]}
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#A1A1A1"
                selectionColor="#23AA49"
              />
              {formik.touched.email && formik.errors.email && (
                <Text style={styles.errorText}>{formik.errors.email}</Text>
              )}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>PHONE NUMBER</Text>
              <TextInput
                style={[
                  styles.input,
                  formik.touched.phone && formik.errors.phone ? styles.inputError : null
                ]}
                value={formik.values.phone}
                onChangeText={formik.handleChange('phone')}
                onBlur={formik.handleBlur('phone')}
                keyboardType="phone-pad"
                placeholderTextColor="#A1A1A1"
                selectionColor="#23AA49"
              />
              {formik.touched.phone && formik.errors.phone && (
                <Text style={styles.errorText}>{formik.errors.phone}</Text>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Update Button */}
        <TouchableOpacity style={styles.updateBtn} onPress={() => formik.handleSubmit()} activeOpacity={0.85}>
          <Text style={styles.updateText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1F20', // Dark background for the screen
  },
  topHeader: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 16,
  },
  topHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
  },
  whiteCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    overflow: 'hidden',
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
    width: 44,
    height: 44,
    borderRadius: 22,
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
    color: '#000000',
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 30,
    textAlign: 'center',
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  avatarWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 146,
    height: 146,
    borderRadius: 73,
    resizeMode: 'contain',
    backgroundColor: '#EBF2F7',
    marginTop: 30
  },
  formSection: {
    paddingHorizontal: 24,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    color: '#32343E',
    fontSize: 13,
    fontFamily: "DMSans-Regular",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F0F5FA',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 16,
    color: '#1B1C1E',
    fontSize: 15,
    fontFamily: 'DMSans-Regular',
  },
  updateBtn: {
    backgroundColor: '#23AA49',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginBottom: Platform.OS === 'ios' ? 34 : 24,
    shadowColor: '#23AA49',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  updateText: {
    color: '#FFFFFF',
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

export default AboutMeScreen;

