import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Switch,
} from 'react-native';

interface CreditCardScreenProps {
  onBack: () => void;
  onAddCard: () => void;
  onSave: () => void;
}

const CARDS = [
  {
    id: '1',
    type: 'master',
    label: 'Master Card',
    number: 'XXXX XXXX XXXX 1375',
    expiry: '01/26',
    cvv: '190',
    isDefault: true,
    color: '#e74c3c',
    color2: '#c0392b',
  },
  {
    id: '2',
    type: 'visa',
    label: 'Visa Card',
    number: 'XXXX XXXX XXXX 4036',
    expiry: '12/25',
    cvv: '456',
    isDefault: false,
    color: '#1a6bb5',
    color2: '#154e87',
  },
  {
    id: '3',
    type: 'master',
    label: 'Master Card',
    number: 'XXXX XXXX XXXX 6026',
    expiry: '09/27',
    cvv: '321',
    isDefault: false,
    color: '#e74c3c',
    color2: '#c0392b',
  },
];

const CreditCardScreen: React.FC<CreditCardScreenProps> = ({ onBack, onAddCard, onSave }) => {
  const [defaultCard, setDefaultCard] = useState('1');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Card</Text>
        <TouchableOpacity style={styles.addBtn} onPress={onAddCard}>
          <Text style={styles.addIcon}>⊕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {CARDS.map(card => (
          <View key={card.id} style={styles.cardItem}>
            {/* Mini card visual */}
            <View style={[styles.miniCard, { backgroundColor: card.color }]}>
              <View style={[styles.miniCardCircle, { backgroundColor: card.color2, right: -8 }]} />
              <View style={[styles.miniCardCircle, { backgroundColor: card.color, right: 10 }]} />
              {card.type === 'visa' ? (
                <Text style={styles.miniCardLogo}>VISA</Text>
              ) : (
                <View style={styles.masterLogoMini}>
                  <View style={[styles.masterCircle, { backgroundColor: '#f39c12' }]} />
                  <View style={[styles.masterCircle, { backgroundColor: '#e74c3c', marginLeft: -8 }]} />
                </View>
              )}
            </View>

            {/* Card info */}
            <View style={styles.cardInfo}>
              <Text style={styles.cardLabel}>{card.label}</Text>
              <Text style={styles.cardNumber}>{card.number}</Text>
              <View style={styles.cardMeta}>
                <Text style={styles.cardMetaText}>Expiry {card.expiry}</Text>
                <Text style={styles.cardMetaText}>  CVV {card.cvv}</Text>
              </View>
            </View>

            {/* Default toggle */}
            <View style={styles.defaultCol}>
              <Switch
                value={defaultCard === card.id}
                onValueChange={() => setDefaultCard(card.id)}
                trackColor={{ false: '#333', true: '#2ecc71' }}
                thumbColor={defaultCard === card.id ? '#fff' : '#888'}
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              />
              {defaultCard === card.id && (
                <Text style={styles.defaultLabel}>Make{'\n'}default</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Save */}
      <TouchableOpacity style={styles.saveBtn} onPress={onSave} activeOpacity={0.85}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 16,
    paddingTop: 20, paddingBottom: 16,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#f0f1f5', justifyContent: 'center', alignItems: 'center',
  },
  backArrow: { color: '#1a1a1a', fontSize: 22, fontWeight: '300', lineHeight: 24 },
  headerTitle: { color: '#1a1a1a', fontSize: 17, fontWeight: '700' },
  addBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#f0f1f5', justifyContent: 'center', alignItems: 'center',
  },
  addIcon: { color: '#2ecc71', fontSize: 22 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },
  cardItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#ffffff', borderRadius: 16,
    padding: 12, marginBottom: 12, gap: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 1,
  },
  miniCard: {
    width: 64, height: 42, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
    overflow: 'hidden', position: 'relative',
  },
  miniCardCircle: {
    position: 'absolute', width: 30, height: 30,
    borderRadius: 15, opacity: 0.5, top: 6,
  },
  miniCardLogo: {
    color: '#fff', fontSize: 13, fontWeight: '900',
    fontStyle: 'italic', letterSpacing: 1,
  },
  masterLogoMini: { flexDirection: 'row' },
  masterCircle: {
    width: 18, height: 18, borderRadius: 9, opacity: 0.9,
  },
  cardInfo: { flex: 1 },
  cardLabel: { color: '#1a1a1a', fontSize: 13, fontWeight: '700', marginBottom: 3 },
  cardNumber: { color: '#888', fontSize: 11, marginBottom: 3, letterSpacing: 0.5 },
  cardMeta: { flexDirection: 'row' },
  cardMetaText: { color: '#666', fontSize: 10 },
  defaultCol: { alignItems: 'center', minWidth: 52 },
  defaultLabel: { color: '#2ecc71', fontSize: 9, textAlign: 'center', marginTop: 2 },
  saveBtn: {
    position: 'absolute', bottom: 24, left: 20, right: 20,
    backgroundColor: '#2ecc71', paddingVertical: 16,
    borderRadius: 30, alignItems: 'center',
    shadowColor: '#2ecc71', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 8,
  },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
});

export default CreditCardScreen;
