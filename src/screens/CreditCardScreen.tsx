import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';

interface CreditCardScreenProps {
  onBack: () => void;
  onAddCard: () => void;
  onSave: () => void;
}

interface CardType {
  id: string;
  type: 'master' | 'visa';
  label: string;
  name: string;
  number: string;
  expiry: string;
  cvv: string;
  isDefault: boolean;
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

const CreditCardScreen: React.FC<CreditCardScreenProps> = ({ onBack, onAddCard, onSave }) => {
  const [cards, setCards] = useState<CardType[]>([
    {
      id: '1',
      type: 'master',
      label: 'Master Card',
      name: 'Jen',
      number: 'XXXX XXXX XXXX 5678',
      expiry: '01/28',
      cvv: '908',
      isDefault: true,
    },
    {
      id: '2',
      type: 'visa',
      label: 'Visa Card',
      name: 'Jen',
      number: 'XXXX XXXX XXXX 5678',
      expiry: '01/28',
      cvv: '908',
      isDefault: false,
    },
    {
      id: '3',
      type: 'master',
      label: 'Master Card',
      name: 'Jen',
      number: 'XXXX XXXX XXXX 5678',
      expiry: '01/28',
      cvv: '908',
      isDefault: false,
    },
  ]);

  const [expandedCardId, setExpandedCardId] = useState<string | null>('1');

  const toggleExpand = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const handleFieldChange = (id: string, field: keyof CardType, value: any) => {
    setCards(prev => prev.map(card => card.id === id ? { ...card, [field]: value } : card));
  };

  const handleDefaultChange = (id: string, val: boolean) => {
    setCards(prev => prev.map(card => {
      if (card.id === id) {
        return { ...card, isDefault: val };
      }
      // If we are setting this card to default, unset all others
      return val ? { ...card, isDefault: false } : card;
    }));
  };

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
        <Text style={styles.headerTitle}>Card</Text>
        <TouchableOpacity style={styles.addBtn} onPress={onAddCard} activeOpacity={0.7}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {cards.map(card => {
          const isExpanded = expandedCardId === card.id;

          return (
            <View key={card.id} style={styles.cardItemWrapper}>
              {/* Default Badge (rendered above the specific card if default) */}
              {card.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>DEFAULT</Text>
                </View>
              )}

              {/* Card Summary Row */}
              <TouchableOpacity
                style={styles.cardSummaryRow}
                onPress={() => toggleExpand(card.id)}
                activeOpacity={0.7}
              >
                {/* Logo Container */}
                <View style={styles.logoContainer}>
                  {card.type === 'master' ? (
                    <View style={styles.mastercardLogo}>
                      <View style={[styles.masterCircle, { backgroundColor: '#EB001B' }]} />
                      <View style={[styles.masterCircle, { backgroundColor: '#F79E1B', marginLeft: -12 }]} />
                    </View>
                  ) : (
                    <Text style={styles.visaText}>VISA</Text>
                  )}
                </View>

                {/* Card Text Info */}
                <View style={styles.cardTextInfo}>
                  <Text style={styles.cardLabel}>{card.label}</Text>
                  <Text style={styles.cardNumber}>{card.number}</Text>
                  <Text style={styles.cardExpiryCvv}>
                    Expiry : <Text style={styles.cardBoldMeta}>{card.expiry}</Text>    CVV : <Text style={styles.cardBoldMeta}>{card.cvv}</Text>
                  </Text>
                </View>

                {/* Caret Toggle */}
                <View style={[styles.caretCircle, isExpanded && styles.caretCircleActive]}>
                  <Text style={[styles.caretArrow, isExpanded ? styles.caretArrowActive : styles.caretArrowInactive]}>
                    {isExpanded ? '▲' : '▼'}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Expanded Card Edit Form */}
              {isExpanded && (
                <View style={styles.editFormContainer}>
                  {/* Name on Card Input */}
                  <View style={styles.inputField}>
                    <UserFieldIcon />
                    <TextInput
                      style={styles.textInput}
                      value={card.name}
                      onChangeText={val => handleFieldChange(card.id, 'name', val)}
                      placeholder="Name on card"
                      placeholderTextColor="#A1A1A1"
                      selectionColor="#23AA49"
                    />
                  </View>

                  {/* Card Number Input */}
                  <View style={styles.inputField}>
                    <CardFieldIcon />
                    <TextInput
                      style={styles.textInput}
                      value={card.number}
                      onChangeText={val => handleFieldChange(card.id, 'number', val)}
                      placeholder="Card number"
                      placeholderTextColor="#A1A1A1"
                      selectionColor="#23AA49"
                    />
                  </View>

                  {/* Expiry & CVV inputs side-by-side */}
                  <View style={styles.rowFields}>
                    <View style={[styles.inputField, { flex: 1 }]}>
                      <CalendarFieldIcon />
                      <TextInput
                        style={styles.textInput}
                        value={card.expiry}
                        onChangeText={val => handleFieldChange(card.id, 'expiry', val)}
                        placeholder="Expiry"
                        placeholderTextColor="#A1A1A1"
                        selectionColor="#23AA49"
                      />
                    </View>

                    <View style={[styles.inputField, { flex: 1 }]}>
                      <LockFieldIcon />
                      <TextInput
                        style={styles.textInput}
                        value={card.cvv}
                        onChangeText={val => handleFieldChange(card.id, 'cvv', val)}
                        placeholder="CVV"
                        placeholderTextColor="#A1A1A1"
                        selectionColor="#23AA49"
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>

                  {/* Make Default Toggle */}
                  <View style={styles.toggleRow}>
                    <CustomSwitch
                      value={card.isDefault}
                      onValueChange={val => handleDefaultChange(card.id, val)}
                    />
                    <Text style={styles.toggleLabel}>Make default</Text>
                  </View>
                </View>
              )}

              {/* Under-card Separator Line */}
              <View style={styles.cardSeparator} />
            </View>
          );
        })}
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={onSave} activeOpacity={0.85}>
        <Text style={styles.saveText}>Save</Text>
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
  addBtn: {
    position: 'absolute',
    right: 24,
    top: Platform.OS === 'ios' ? 60 : 20,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'center',
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 100,
  },
  cardItemWrapper: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  defaultBadge: {
    backgroundColor: '#EBF8EE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  defaultBadgeText: {
    color: '#23AA49',
    fontSize: 10,
    fontFamily: 'DMSans-Bold',
  },
  cardSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F6FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  mastercardLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  masterCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  visaText: {
    color: '#0F509E',
    fontFamily: 'DMSans-Bold',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '900',
  },
  cardTextInfo: {
    flex: 1,
  },
  cardLabel: {
    color: '#000000',
    fontSize: 15,
    fontFamily: 'DMSans-Bold',
    marginBottom: 4,
  },
  cardNumber: {
    color: '#868889',
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    marginBottom: 4,
  },
  cardExpiryCvv: {
    color: '#868889',
    fontSize: 11,
    fontFamily: 'DMSans-Regular',
  },
  cardBoldMeta: {
    color: '#000000',
    fontFamily: 'DMSans-Bold',
  },
  caretCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#6CC51D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caretCircleActive: {
    borderColor: '#6CC51D',
  },
  caretArrow: {
    color: '#6CC51D',
    fontSize: 13,
    textAlign: 'center',
  },
  caretArrowActive: {
    marginTop: -2,
  },
  caretArrowInactive: {
    marginTop: 2,
  },
  editFormContainer: {
    marginTop: 16,
    paddingLeft: 8,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F5FA',
    borderRadius: 15,
    paddingHorizontal: 16,
    marginBottom: 14,
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
    marginTop: 8,
    marginBottom: 16,
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
  cardSeparator: {
    height: 1,
    backgroundColor: '#F0F3F7',
    marginTop: 20,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
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

export default CreditCardScreen;

