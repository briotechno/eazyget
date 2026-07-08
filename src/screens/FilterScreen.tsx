import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  PanResponder,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface FilterScreenProps {
  onBack: () => void;
  onApply: (filters: any) => void;
  onClear: () => void;
}

const SORT_OPTIONS = [
  { id: 'popularity', label: 'Sort by popularity' },
  { id: 'avg_rating', label: 'Sort by average\nrating' },
  { id: 'avg', label: 'Sort by average' },
  { id: 'price_low', label: 'Sort by price\nlow to high' },
  { id: 'price_high', label: 'Sort by price high to low' },
];

const CATEGORIES = [
  { id: 'beef', label: 'Beef' },
  { id: 'chicken', label: 'Chicken' },
  { id: 'goat', label: 'Goat' },
  { id: 'lamb', label: 'Lamb' },
];

const FilterScreen: React.FC<FilterScreenProps> = ({ onBack, onApply, onClear }) => {
  const insets = useSafeAreaInsets();

  // Selected values matching the screenshot defaults
  const [selectedSort, setSelectedSort] = useState<string>('avg_rating');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['chicken', 'goat']);

  // Slider state
  const minPrice = 20;
  const maxPrice = 80;
  const [price, setPrice] = useState<number>(60); // Matches $20 - $60 (thumb at 66.7%)
  const [trackWidth, setTrackWidth] = useState<number>(0);
  const startPrice = useRef<number>(60);

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleRightInputChange = (text: string) => {
    const num = parseInt(text.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(num)) {
      setPrice(Math.min(maxPrice, Math.max(minPrice, num)));
    } else if (text === '') {
      setPrice(minPrice);
    }
  };

  // PanResponder to implement the custom slider dragging behavior
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        startPrice.current = price;
      },
      onPanResponderMove: (evt, gestureState) => {
        const currentTrackWidth = trackWidth || (width - 72); // Safe fallback
        const delta = (gestureState.dx / currentTrackWidth) * (maxPrice - minPrice);
        const newPrice = Math.min(
          maxPrice,
          Math.max(minPrice, Math.round(startPrice.current + delta))
        );
        setPrice(newPrice);
      },
    })
  ).current;

  // Calculate position percentage
  const pct = (price - minPrice) / (maxPrice - minPrice);
  const currentTrackWidth = trackWidth || (width - 72);
  const thumbLeft = pct * (currentTrackWidth - 24);

  // Chevron left indicator
  const ChevronLeft = () => (
    <View style={styles.chevron} />
  );

  return (
    <View
      style={[
        styles.container,
        // {
        //   paddingTop: insets.top > 0 ? insets.top : 20,
        //   paddingBottom: insets.bottom > 0 ? insets.bottom : 20,
        // },
      ]}
    >
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <ChevronLeft />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Apply Filter</Text>
        </View>

        {/* Scrollable Content */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Price Range Section */}
          <Text style={styles.sectionTitle}>Price Range</Text>
          <View style={styles.sliderContainer}>
            {/* Custom Interactive Slider Track */}
            <View
              style={styles.sliderTrack}
              onLayout={e => setTrackWidth(e.nativeEvent.layout.width)}
            >
              <View style={[styles.sliderFill, { width: `${pct * 100}%` }]} />
              <View
                style={[styles.sliderThumb, { left: thumbLeft }]}
                {...panResponder.panHandlers}
              />
            </View>

            {/* Input boxes */}
            <View style={styles.inputsRow}>
              <View style={styles.inputBox}>
                <Text style={styles.inputText}>{minPrice}</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.inputText}
                  value={String(price)}
                  onChangeText={handleRightInputChange}
                  keyboardType="numeric"
                  maxLength={3}
                  returnKeyType="done"
                />
              </View>
            </View>

            {/* Range Label */}
            <Text style={styles.priceRangeLabel}>
              Price : ${minPrice} - ${price}
            </Text>
          </View>

          {/* Default Sorting Section */}
          <Text style={styles.sectionTitle}>Default Sorting</Text>
          <View style={styles.sortGrid}>
            {SORT_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt.id}
                style={[
                  styles.sortChip,
                  { width: opt.id === 'price_high' ? '100%' : '48.5%' },
                  selectedSort === opt.id && styles.sortChipActive,
                ]}
                onPress={() => setSelectedSort(selectedSort === opt.id ? '' : opt.id)}
              >
                <Text
                  style={[
                    styles.sortChipText,
                    selectedSort === opt.id && styles.sortChipTextActive,
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Categories Section */}
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryChip,
                  selectedCategories.includes(cat.id) && styles.categoryChipActive,
                ]}
                onPress={() => toggleCategory(cat.id)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategories.includes(cat.id) && styles.categoryChipTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Footer actions */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => onApply({ sort: selectedSort, categories: selectedCategories, maxPrice: price })}
            activeOpacity={0.85}
          >
            <Text style={styles.actionBtnText}>Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => {
              setSelectedSort('avg_rating');
              setSelectedCategories(['chicken', 'goat']);
              setPrice(60);
              onClear();
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.actionBtnText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    // paddingHorizontal: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 16,
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  chevron: {
    width: 10,
    height: 10,
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    borderColor: '#0f172a',
    transform: [{ rotate: '45deg' }],
    marginLeft: 3,
  },
  headerTitle: {
    fontSize: 20,
    color: '#0f172a',
    fontFamily: 'DMSans-Bold',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    color: '#000000',
    marginTop: 24,
    marginBottom: 12,
    fontFamily: 'Poppins-Bold',
  },

  // Slider styles
  sliderContainer: {
    marginVertical: 4,
  },
  sliderTrack: {
    height: 8,
    backgroundColor: '#eef0f3',
    borderRadius: 4,
    position: 'relative',
    justifyContent: 'center',
    marginVertical: 12,
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#1ea950',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
  },
  sliderThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1ea950',
    shadowColor: '#1ea950',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginVertical: 10,
  },
  inputBox: {
    flex: 1,
    height: 48,
    backgroundColor: '#F4F5F9',
    borderRadius: 12,
    justifyContent: 'center',
    padding: 13
    // alignItems: 'center',
  },
  inputText: {
    fontSize: 13,
    color: '#7a7a7a',
    fontFamily: 'Poppins-Medium',
    // textAlign: 'center',
    width: '100%',
    padding: 0,
  },
  priceRangeLabel: {
    fontSize: 14,
    color: '#7a7a7a',
    fontFamily: 'Poppins-Medium',
    marginTop: 8,
  },

  // Grid / chip styles
  sortGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  sortChip: {
    backgroundColor: '#f4f4f6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  sortChipActive: {
    backgroundColor: '#1ea950',
  },
  sortChipText: {
    color: '#868889',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    lineHeight: 18,
  },
  sortChipTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },

  // Categories styles
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  categoryChip: {
    width: '48.5%',
    backgroundColor: '#f4f4f6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  categoryChipActive: {
    backgroundColor: '#1ea950',
  },
  categoryChipText: {
    color: '#7a7a7a',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },

  // Footer styles
  footer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#1ea950',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1ea950',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  actionBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default FilterScreen;
