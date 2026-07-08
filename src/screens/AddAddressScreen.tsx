import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const addressSchema = Yup.object().shape({
  address: Yup.string()
    .min(10, 'Address must be at least 10 characters')
    .required('Address is required'),
  zipCode: Yup.string()
    .matches(/^\d{5}$/, 'Zip code must be exactly 5 digits')
    .required('Zip code is required'),
  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .required('City is required'),
});

interface AddAddressScreenProps {
  onBack: () => void;
  onSave: () => void;
}

const CustomSwitch: React.FC<{ value: boolean; onValueChange: (val: boolean) => void }> = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onValueChange(!value)}
      style={[
        styles.switchTrack,
        value ? styles.switchTrackActive : styles.switchTrackInactive
      ]}
    >
      <View style={styles.switchThumb} />
    </TouchableOpacity>
  );
};

const AddAddressScreen: React.FC<AddAddressScreenProps> = ({ onBack, onSave }) => {
  const formik = useFormik({
    initialValues: {
      address: '4567 Oak Avenue, Suite 200, San Francisco, CA 94107',
      zipCode: '94107',
      city: 'Oak',
    },
    validationSchema: addressSchema,
    onSubmit: () => {
      onSave();
    },
  });
  const [saveAddr, setSaveAddr] = useState(true);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add address</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formSection}>
          {/* Address */}
          <View style={styles.field}>
            <Text style={styles.label}>ADDRESS</Text>
            <TextInput
              style={[
                styles.input,
                styles.inputMulti,
                formik.touched.address && formik.errors.address ? styles.inputError : null
              ]}
              value={formik.values.address}
              onChangeText={formik.handleChange('address')}
              onBlur={formik.handleBlur('address')}
              multiline
              numberOfLines={3}
              placeholderTextColor="#A1A1A1"
              selectionColor="#23AA49"
            />
            {formik.touched.address && formik.errors.address && (
              <Text style={styles.errorText}>{formik.errors.address}</Text>
            )}
          </View>

          {/* Zip Code */}
          <View style={styles.field}>
            <Text style={styles.label}>ZIP CODE</Text>
            <TextInput
              style={[
                styles.input,
                formik.touched.zipCode && formik.errors.zipCode ? styles.inputError : null
              ]}
              value={formik.values.zipCode}
              onChangeText={formik.handleChange('zipCode')}
              onBlur={formik.handleBlur('zipCode')}
              keyboardType="number-pad"
              placeholderTextColor="#A1A1A1"
              selectionColor="#23AA49"
            />
            {formik.touched.zipCode && formik.errors.zipCode && (
              <Text style={styles.errorText}>{formik.errors.zipCode}</Text>
            )}
          </View>

          {/* City */}
          <View style={styles.field}>
            <Text style={styles.label}>CITY</Text>
            <TextInput
              style={[
                styles.input,
                formik.touched.city && formik.errors.city ? styles.inputError : null
              ]}
              value={formik.values.city}
              onChangeText={formik.handleChange('city')}
              onBlur={formik.handleBlur('city')}
              placeholderTextColor="#A1A1A1"
              selectionColor="#23AA49"
            />
            {formik.touched.city && formik.errors.city && (
              <Text style={styles.errorText}>{formik.errors.city}</Text>
            )}
          </View>

          {/* Save toggle */}
          <View style={styles.toggleRow}>
            <CustomSwitch value={saveAddr} onValueChange={setSaveAddr} />
            <Text style={styles.toggleLabel}>Save this address</Text>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={() => formik.handleSubmit()} activeOpacity={0.85}>
        <Text style={styles.saveText}>Save address</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 16,
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    left: 24,
    top: Platform.OS === 'ios' ? 60 : 20,
    height: 40,
    justifyContent: 'center',
  },
  backArrow: {
    color: '#000000',
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 30,
  },
  headerTitle: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 40,
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
  inputMulti: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  switchTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
    flexDirection: 'row',
    marginRight: 12,
  },
  switchTrackActive: {
    backgroundColor: '#6CC51D', // Or brand green
    justifyContent: 'flex-end',
  },
  switchTrackInactive: {
    backgroundColor: '#CCD3DF',
    justifyContent: 'flex-start',
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    // Shadow for thumb
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleLabel: {
    color: '#1B1C1E',
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
  },
  saveBtn: {
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
  saveText: {
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

export default AddAddressScreen;


