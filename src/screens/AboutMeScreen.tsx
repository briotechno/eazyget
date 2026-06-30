import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';

interface AboutMeScreenProps {
  onBack: () => void;
  onUpdate: () => void;
}

const AboutMeScreen: React.FC<AboutMeScreenProps> = ({ onBack, onUpdate }) => {
  const [name, setName]   = useState('Jen');
  const [email, setEmail] = useState('eazyme@gmail.com');
  const [phone, setPhone] = useState('+1 (562) 444-9999');

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
        <Text style={styles.headerTitle}>About me</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarEmoji}>👩‍🦱</Text>
            </View>
            <TouchableOpacity style={styles.editBadge}>
              <Text style={styles.editIcon}>✎</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.field}>
            <Text style={styles.label}>NAME</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholderTextColor="#555"
              selectionColor="#2ecc71"
            />
          </View>

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
        </View>
      </ScrollView>

      {/* Update Button */}
      <TouchableOpacity style={styles.updateBtn} onPress={onUpdate} activeOpacity={0.85}>
        <Text style={styles.updateText}>Update Profile</Text>
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
  avatarSection: { alignItems: 'center', paddingVertical: 24 },
  avatarWrapper: { position: 'relative' },
  avatarCircle: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#f0f1f5', justifyContent: 'center', alignItems: 'center',
    borderWidth: 3, borderColor: '#2ecc71',
  },
  avatarEmoji: { fontSize: 50 },
  editBadge: {
    position: 'absolute', bottom: 2, right: 2,
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: '#2ecc71', justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#141414',
  },
  editIcon: { color: '#fff', fontSize: 13, fontWeight: '700' },
  formSection: { paddingHorizontal: 20 },
  field: { marginBottom: 22 },
  label: {
    color: '#666', fontSize: 11, fontWeight: '700',
    letterSpacing: 0.8, marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff', borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    color: '#1a1a1a', fontSize: 15,
    borderWidth: 1, borderColor: '#e8e8e8',
  },
  updateBtn: {
    position: 'absolute', bottom: 24, left: 20, right: 20,
    backgroundColor: '#2ecc71', paddingVertical: 16,
    borderRadius: 30, alignItems: 'center',
    shadowColor: '#2ecc71', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 8,
  },
  updateText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
});

export default AboutMeScreen;
