import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform, Switch, Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface AddCardScreenProps {
  onBack: () => void;
  onSave: () => void;
}

const AddCardScreen: React.FC<AddCardScreenProps> = ({ onBack, onSave }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName]     = useState('');
  const [expiry, setExpiry]         = useState('');
  const [cvv, setCvv]               = useState('');
  const [saveCard, setSaveCard]     = useState(true);

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const displayNumber = cardNumber || 'XXXX XXXX XXXX 8790';
  const displayName   = cardName   || 'Jon';
  const displayExpiry = expiry     || '02/30';
  const displayCvv    = cvv        || '826';

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
        <Text style={styles.headerTitle}>Add Card</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Card Preview */}
        <View style={styles.cardPreview}>
          {/* Background circles */}
          <View style={styles.cardCircle1} />
          <View style={styles.cardCircle2} />

          {/* Card logo top-right */}
          <View style={styles.cardLogoRow}>
            <View style={styles.masterLogoWrap}>
              <View style={[styles.masterCircle, { backgroundColor: '#f39c12' }]} />
              <View style={[styles.masterCircle, { backgroundColor: '#e74c3c', marginLeft: -10 }]} />
            </View>
          </View>

          {/* Card number */}
          <Text style={styles.cardNumberDisplay}>{displayNumber}</Text>

          {/* Card meta */}
          <View style={styles.cardMetaRow}>
            <View>
              <Text style={styles.cardMetaLabel}>CARD HOLDER</Text>
              <Text style={styles.cardMetaValue}>{displayName}</Text>
            </View>
            <View>
              <Text style={styles.cardMetaLabel}>EXPIRES</Text>
              <Text style={styles.cardMetaValue}>{displayExpiry}</Text>
            </View>
            <View>
              <Text style={styles.cardMetaLabel}>CVV</Text>
              <Text style={styles.cardMetaValue}>{displayCvv}</Text>
            </View>
          </View>
        </View>

        {/* Saved Cards Row */}
        <View style={styles.savedCardsRow}>
          {[
            { color: '#e74c3c', color2: '#c0392b', number: '...5476' },
            { color: '#1a6bb5', color2: '#154e87', number: '...5476', isVisa: true },
          ].map((c, i) => (
            <View key={i} style={[styles.savedCard, { backgroundColor: c.color }]}>
              <View style={[styles.savedCardCircle, { backgroundColor: c.color2 }]} />
              <Text style={styles.savedCardNum}>{c.number}</Text>
              {c.isVisa
                ? <Text style={styles.savedCardVisa}>VISA</Text>
                : (
                  <View style={styles.miniMasterRow}>
                    <View style={[styles.miniMasterCircle, { backgroundColor: '#f39c12' }]} />
                    <View style={[styles.miniMasterCircle, { backgroundColor: '#e74c3c', marginLeft: -6 }]} />
                  </View>
                )}
            </View>
          ))}
        </View>

        {/* Form */}
        <View style={styles.formSection}>
          <View style={styles.field}>
            <Text style={styles.label}>CARD NUMBER</Text>
            <TextInput
              style={styles.input}
              value={cardNumber}
              onChangeText={v => setCardNumber(formatCardNumber(v))}
              placeholder="XXXX XXXX XXXX XXXX"
              placeholderTextColor="#555"
              keyboardType="number-pad"
              selectionColor="#2ecc71"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>CARD HOLDER NAME</Text>
            <TextInput
              style={styles.input}
              value={cardName}
              onChangeText={setCardName}
              placeholder="Jon"
              placeholderTextColor="#555"
              selectionColor="#2ecc71"
            />
          </View>

          <View style={styles.rowFields}>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>EXPIRY DATE</Text>
              <TextInput
                style={styles.input}
                value={expiry}
                onChangeText={v => setExpiry(formatExpiry(v))}
                placeholder="MM/YY"
                placeholderTextColor="#555"
                keyboardType="number-pad"
                maxLength={5}
                selectionColor="#2ecc71"
              />
            </View>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                value={cvv}
                onChangeText={v => setCvv(v.replace(/\D/g, '').slice(0, 3))}
                placeholder="000"
                placeholderTextColor="#555"
                keyboardType="number-pad"
                maxLength={3}
                secureTextEntry
                selectionColor="#2ecc71"
              />
            </View>
          </View>

          {/* Save toggle */}
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Save this card</Text>
            <Switch
              value={saveCard}
              onValueChange={setSaveCard}
              trackColor={{ false: '#333', true: '#2ecc71' }}
              thumbColor={saveCard ? '#fff' : '#888'}
            />
          </View>
        </View>
      </ScrollView>

      {/* Save Card Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={onSave} activeOpacity={0.85}>
        <Text style={styles.saveText}>Save Card</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const CARD_W = width - 40;

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

  // Card preview
  cardPreview: {
    marginHorizontal: 20, marginBottom: 20,
    height: 180, borderRadius: 20,
    backgroundColor: '#2ecc71',
    padding: 20, overflow: 'hidden',
    justifyContent: 'space-between',
  },
  cardCircle1: {
    position: 'absolute', width: 160, height: 160,
    borderRadius: 80, backgroundColor: 'rgba(255,255,255,0.12)',
    top: -40, right: -30,
  },
  cardCircle2: {
    position: 'absolute', width: 120, height: 120,
    borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.08)',
    bottom: -20, left: 20,
  },
  cardLogoRow: { flexDirection: 'row', justifyContent: 'flex-end' },
  masterLogoWrap: { flexDirection: 'row' },
  masterCircle: { width: 28, height: 28, borderRadius: 14, opacity: 0.9 },
  cardNumberDisplay: {
    color: '#fff', fontSize: 18, fontWeight: '700',
    letterSpacing: 2, marginTop: 14,
  },
  cardMetaRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
  },
  cardMetaLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 9, letterSpacing: 0.5, marginBottom: 3 },
  cardMetaValue: { color: '#fff', fontSize: 13, fontWeight: '700' },

  // Saved cards mini row
  savedCardsRow: {
    flexDirection: 'row', paddingHorizontal: 20, gap: 12, marginBottom: 20,
  },
  savedCard: {
    flex: 1, height: 56, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    overflow: 'hidden', position: 'relative',
  },
  savedCardCircle: {
    position: 'absolute', width: 40, height: 40,
    borderRadius: 20, right: -8, opacity: 0.5,
  },
  savedCardNum: { color: '#fff', fontSize: 11, fontWeight: '600' },
  savedCardVisa: { color: '#fff', fontSize: 13, fontWeight: '900', fontStyle: 'italic', letterSpacing: 1 },
  miniMasterRow: { flexDirection: 'row' },
  miniMasterCircle: { width: 16, height: 16, borderRadius: 8, opacity: 0.9 },

  // Form
  formSection: { paddingHorizontal: 20 },
  field: { marginBottom: 16 },
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
  toggleRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 8,
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

export default AddCardScreen;
