import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform, Switch,
} from 'react-native';

interface AddAddressScreenProps {
  onBack: () => void;
  onSave: () => void;
}

const AddAddressScreen: React.FC<AddAddressScreenProps> = ({ onBack, onSave }) => {
  const [address, setAddress] = useState('2467 S Alameda Street, Suite 100, San Francisco, CA 34007');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity]       = useState('');
  const [email, setEmail]     = useState('eazyme@gmail.com');
  const [phone, setPhone]     = useState('+1 (562) 444-9999');
  const [saveAddr, setSaveAddr] = useState(true);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add address</Text>
        <View style={{ width: 36 }} />
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
              style={[styles.input, styles.inputMulti]}
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
              placeholderTextColor="#555"
              selectionColor="#2ecc71"
            />
          </View>

          {/* Zip & City row */}
          <View style={styles.rowFields}>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>ZIP CODE</Text>
              <TextInput
                style={styles.input}
                value={zipCode}
                onChangeText={setZipCode}
                placeholder="94107"
                placeholderTextColor="#555"
                keyboardType="number-pad"
                selectionColor="#2ecc71"
              />
            </View>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>CITY</Text>
              <TextInput
                style={styles.input}
                value={city}
                onChangeText={setCity}
                placeholder="San Francisco"
                placeholderTextColor="#555"
                selectionColor="#2ecc71"
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.field}>
            <Text style={styles.label}>EMAIL ID</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#555"
              selectionColor="#2ecc71"
            />
          </View>

          {/* Phone */}
          <View style={styles.field}>
            <Text style={styles.label}>PHONE NUMBER</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#555"
              selectionColor="#2ecc71"
            />
          </View>

          {/* Save toggle */}
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Save this address</Text>
            <Switch
              value={saveAddr}
              onValueChange={setSaveAddr}
              trackColor={{ false: '#333', true: '#2ecc71' }}
              thumbColor={saveAddr ? '#fff' : '#888'}
            />
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={onSave} activeOpacity={0.85}>
        <Text style={styles.saveText}>Save address</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
  formSection: { paddingHorizontal: 20, paddingTop: 8 },
  field: { marginBottom: 18 },
  rowFields: { flexDirection: 'row', gap: 12 },
  label: {
    color: '#666', fontSize: 11, fontWeight: '700',
    letterSpacing: 0.8, marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff', borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    color: '#1a1a1a', fontSize: 14,
    borderWidth: 1, borderColor: '#e8e8e8',
  },
  inputMulti: {
    minHeight: 80, textAlignVertical: 'top',
  },
  toggleRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 6,
    borderTopWidth: 1, borderTopColor: '#e8e8e8', marginTop: 4,
  },
  toggleLabel: { color: '#1a1a1a', fontSize: 14, fontWeight: '500' },
  saveBtn: {
    position: 'absolute', bottom: 24, left: 20, right: 20,
    backgroundColor: '#2ecc71', paddingVertical: 16,
    borderRadius: 30, alignItems: 'center',
    shadowColor: '#2ecc71', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 8,
  },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
});

export default AddAddressScreen;
