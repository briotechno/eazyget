import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform, Dimensions,
  Image,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const cardSchema = Yup.object().shape({
  cardName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Cardholder name is required'),
  cardNumber: Yup.string()
    .test('len', 'Card number must be exactly 16 digits', val => {
      const cleanVal = (val || '').replace(/\s/g, '');
      return cleanVal.length === 16;
    })
    .required('Card number is required'),
  expiry: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'MM/YY format')
    .required('Expiry date is required'),
  cvv: Yup.string()
    .matches(/^\d{3}$/, 'Exactly 3 digits')
    .required('CVV is required'),
});

const { width } = Dimensions.get('window');

interface AddCardScreenProps {
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

// --- Custom Field Icons ---
const UserFieldIcon = () => (
  <View style={styles.fieldIconContainer}>
    <View style={styles.userHead} />
    <View style={styles.userBody} />
  </View>
);

const CardFieldIcon = () => (
  <View style={styles.fieldIconContainer}>
    <View style={styles.cardOutline}>
      <View style={styles.cardLine} />
    </View>
  </View>
);

const CalendarFieldIcon = () => (
  <View style={styles.fieldIconContainer}>
    <View style={styles.calendarOutline}>
      <View style={styles.calendarHeaderLine} />
    </View>
  </View>
);

const LockFieldIcon = () => (
  <View style={styles.fieldIconContainer}>
    <View style={styles.lockBody}>
      <View style={styles.lockShackle} />
    </View>
  </View>
);

const AddCardScreen: React.FC<AddCardScreenProps> = ({ onBack, onSave }) => {
  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const formik = useFormik({
    initialValues: {
      cardNumber: formatCardNumber('XXXX XXXX XXXX 5678'),
      cardName: 'Jen',
      expiry: '01/28',
      cvv: '908',
    },
    validationSchema: cardSchema,
    onSubmit: () => {
      onSave();
    },
  });

  const [saveCard, setSaveCard] = useState(true);

  const displayCardNumber = formik.values.cardNumber || 'XXXX XXXX XXXX 8790';
  const displayCardName = formik.values.cardName ? formik.values.cardName.toUpperCase() : 'RUSSELL AUSTIN';
  const displayExpiry = formik.values.expiry ? formik.values.expiry.replace('/', ' / ') : '01 / 22';

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
        <Text style={styles.headerTitle}>Add Card</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Card Preview */}
        <Image source={require('../assets/card-image.png')} style={styles.cardImage} />

        {/* Form Fields */}
        <View style={styles.formSection}>
          {/* Name on Card */}
          <View style={[
            styles.inputField,
            formik.touched.cardName && formik.errors.cardName ? styles.inputFieldError : null
          ]}>
            <UserFieldIcon />
            <TextInput
              style={styles.textInput}
              value={formik.values.cardName}
              onChangeText={formik.handleChange('cardName')}
              onBlur={formik.handleBlur('cardName')}
              placeholder="Name on card"
              placeholderTextColor="#A1A1A1"
              selectionColor="#23AA49"
            />
          </View>
          {formik.touched.cardName && formik.errors.cardName && (
            <Text style={styles.errorText}>{formik.errors.cardName}</Text>
          )}

          {/* Card Number */}
          <View style={[
            styles.inputField,
            formik.touched.cardNumber && formik.errors.cardNumber ? styles.inputFieldError : null
          ]}>
            <CardFieldIcon />
            <TextInput
              style={styles.textInput}
              value={formik.values.cardNumber}
              onChangeText={v => formik.setFieldValue('cardNumber', formatCardNumber(v))}
              onBlur={formik.handleBlur('cardNumber')}
              placeholder="Card number"
              placeholderTextColor="#A1A1A1"
              selectionColor="#23AA49"
              keyboardType="number-pad"
            />
          </View>
          {formik.touched.cardNumber && formik.errors.cardNumber && (
            <Text style={styles.errorText}>{formik.errors.cardNumber}</Text>
          )}

          {/* Expiry & CVV side-by-side */}
          <View style={styles.rowFields}>
            <View style={{ flex: 1 }}>
              <View style={[
                styles.inputField,
                formik.touched.expiry && formik.errors.expiry ? styles.inputFieldError : null
              ]}>
                <CalendarFieldIcon />
                <TextInput
                  style={styles.textInput}
                  value={formik.values.expiry}
                  onChangeText={v => formik.setFieldValue('expiry', formatExpiry(v))}
                  onBlur={formik.handleBlur('expiry')}
                  placeholder="Expiry"
                  placeholderTextColor="#A1A1A1"
                  selectionColor="#23AA49"
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>
              {formik.touched.expiry && formik.errors.expiry && (
                <Text style={styles.errorText}>{formik.errors.expiry}</Text>
              )}
            </View>

            <View style={{ flex: 1 }}>
              <View style={[
                styles.inputField,
                formik.touched.cvv && formik.errors.cvv ? styles.inputFieldError : null
              ]}>
                <LockFieldIcon />
                <TextInput
                  style={styles.textInput}
                  value={formik.values.cvv}
                  onChangeText={v => formik.setFieldValue('cvv', v.replace(/\D/g, '').slice(0, 3))}
                  onBlur={formik.handleBlur('cvv')}
                  placeholder="CVV"
                  placeholderTextColor="#A1A1A1"
                  selectionColor="#23AA49"
                  keyboardType="number-pad"
                  maxLength={3}
                  secureTextEntry
                />
              </View>
              {formik.touched.cvv && formik.errors.cvv && (
                <Text style={styles.errorText}>{formik.errors.cvv}</Text>
              )}
            </View>
          </View>

          {/* Save toggle */}
          <View style={styles.toggleRow}>
            <CustomSwitch value={saveCard} onValueChange={setSaveCard} />
            <Text style={styles.toggleLabel}>Save this card</Text>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={() => formik.handleSubmit()} activeOpacity={0.85}>
        <Text style={styles.saveText}>Save Card</Text>
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
    // top: Platform.OS === 'ios' ? 60 : 20,
    // height: 40,
    // justifyContent: 'center',
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
    paddingBottom: 100,
    paddingHorizontal: 5
  },
  cardImage: {
    height: 189,
    width: "99.5%",
    resizeMode: "contain",
    marginBottom: 28
  },
  cardPreview: {
    marginHorizontal: 5,
    marginBottom: 28,
    height: 189,
    borderRadius: 20,
    backgroundColor: '#23AA49', // Grass Green base
    padding: 24,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'space-between',
    shadowColor: '#23AA49',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  cardCircle1: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#6CC51D', // Lighter lime green decoration
    top: -30,
    right: -30,
    opacity: 0.9,
  },
  cardCircle2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#6CC51D',
    top: 20,
    right: -55,
    opacity: 0.9,
  },
  cardCircle3: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6CC51D',
    bottom: -40,
    right: -10,
    opacity: 0.9,
  },
  redDiamond: {
    position: 'absolute',
    width: 14,
    height: 14,
    backgroundColor: '#FF6B6B',
    transform: [{ rotate: '45deg' }],
    top: 60,
    right: 90,
  },
  orangeDiamond: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: '#FFAA44',
    transform: [{ rotate: '45deg' }],
    bottom: 48,
    right: 90,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mastercardLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  masterCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  moreIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardNumberDisplay: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'DMSans-Bold',
    letterSpacing: 2,
    marginTop: 10,
  },
  cardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardMetaLabel: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 9,
    fontFamily: 'DMSans-Regular',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  cardMetaValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
  },
  expiryCol: {
    alignItems: 'flex-end',
  },
  formSection: {
    paddingHorizontal: 15,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F5F9',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 5,
    height: 45
  },
  textInput: {
    flex: 1,
    height: 52,
    color: '#1B1C1E',
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
  },
  rowFields: {
    flexDirection: 'row',
    gap: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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
    backgroundColor: '#6CC51D',
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
  inputFieldError: {
    borderColor: '#ff4d4f',
    borderWidth: 1,
  },
  errorText: {
    color: '#ff4d4f',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 12,
    marginLeft: 4,
    fontFamily: 'DMSans-Regular',
  },
  fieldIconContainer: {
    marginRight: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userHead: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    borderWidth: 1.5,
    borderColor: '#868889',
  },
  userBody: {
    width: 15,
    height: 7,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderWidth: 1.5,
    borderColor: '#868889',
    marginTop: 2,
    borderBottomWidth: 0,
  },
  cardOutline: {
    width: 18,
    height: 12,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: '#868889',
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  cardLine: {
    width: '100%',
    height: 1.5,
    backgroundColor: '#868889',
  },
  calendarOutline: {
    width: 16,
    height: 16,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: '#868889',
    position: 'relative',
    overflow: 'hidden',
  },
  calendarHeaderLine: {
    width: '100%',
    height: 2.5,
    backgroundColor: '#868889',
    position: 'absolute',
    top: 2,
  },
  lockBody: {
    width: 14,
    height: 11,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: '#868889',
    position: 'relative',
    marginTop: 5,
  },
  lockShackle: {
    width: 10,
    height: 7,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 1.5,
    borderColor: '#868889',
    borderBottomWidth: 0,
    position: 'absolute',
    top: -7,
    left: 0.5,
  },
});

export default AddCardScreen;

