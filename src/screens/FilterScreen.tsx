import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface FilterScreenProps {
  onBack: () => void;
  onApply: (filters: any) => void;
  onClear: () => void;
}

const SORT_OPTIONS = [
  { id: 'popularity', label: 'Sort by popularity' },
  { id: 'avg_rating', label: 'Sort by average rating' },
  { id: 'price_low', label: 'Sort by price low to high' },
  { id: 'price_high', label: 'Sort by price high to low' },
];

const CATEGORIES = [
  { id: 'beef', label: 'Beef' },
  { id: 'chicken', label: 'Chicken' },
  { id: 'goat', label: 'Goat' },
  { id: 'lamb', label: 'Lamb' },
];

const FilterScreen: React.FC<FilterScreenProps> = ({ onBack, onApply, onClear }) => {
  const [priceMin] = useState(20);
  const [priceMax] = useState(80);
  const [sliderValue, setSliderValue] = useState(0.7); // 0-1 representing position
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['chicken']);

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const currentPrice = Math.round(priceMin + sliderValue * (priceMax - priceMin));

  const TRACK_WIDTH = width - 64;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Apply Filter</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Price Range */}
        <Text style={styles.sectionTitle}>Price Range</Text>
        <View style={styles.sliderContainer}>
          {/* Track background */}
          <View style={styles.sliderTrack}>
            {/* Filled portion */}
            <View style={[styles.sliderFill, { width: `${sliderValue * 100}%` }]} />
          </View>
          {/* Thumb row - interactive buttons simulating a slider */}
          <View style={styles.thumbRow}>
            <TouchableOpacity
              onPress={() => setSliderValue(Math.max(0, sliderValue - 0.1))}
              style={styles.sliderArrow}
            >
              <Text style={styles.sliderArrowText}>‹</Text>
            </TouchableOpacity>
            {/* Thumb indicator */}
            <View style={[styles.sliderThumb, { left: sliderValue * (TRACK_WIDTH - 24) }]} />
            <TouchableOpacity
              onPress={() => setSliderValue(Math.min(1, sliderValue + 0.1))}
              style={styles.sliderArrow}
            >
              <Text style={styles.sliderArrowText}>›</Text>
            </TouchableOpacity>
          </View>
          {/* Price labels */}
          <View style={styles.priceLabels}>
            <Text style={styles.priceLabel}>{priceMin}</Text>
            <Text style={styles.priceLabel}>{priceMax}</Text>
          </View>
          <Text style={styles.priceRange}>
            Price : ${priceMin} - ${currentPrice}
          </Text>
        </View>

        {/* Default Sorting */}
        <Text style={styles.sectionTitle}>Default Sorting</Text>
        <View style={styles.sortGrid}>
          {SORT_OPTIONS.map(opt => (
            <TouchableOpacity
              key={opt.id}
              style={[
                styles.sortChip,
                selectedSort === opt.id && styles.sortChipActive,
              ]}
              onPress={() => setSelectedSort(selectedSort === opt.id ? '' : opt.id)}
            >
              <Text style={[
                styles.sortChipText,
                selectedSort === opt.id && styles.sortChipTextActive,
              ]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Categories */}
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
              <Text style={[
                styles.categoryChipText,
                selectedCategories.includes(cat.id) && styles.categoryChipTextActive,
              ]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Apply / Clear Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.applyBtn}
          onPress={() => onApply({ sort: selectedSort, categories: selectedCategories, maxPrice: currentPrice })}
          activeOpacity={0.85}
        >
          <Text style={styles.applyBtnText}>Apply</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => {
            setSelectedSort('');
            setSelectedCategories([]);
            setSliderValue(1);
            onClear();
          }}
          activeOpacity={0.85}
        >
          <Text style={styles.clearBtnText}>Clear</Text>
        </TouchableOpacity>
      </View>
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
  scrollContent: { paddingHorizontal: 20, paddingBottom: 110 },
  sectionTitle: {
    color: '#1a1a1a', fontSize: 15, fontWeight: '700',
    marginTop: 24, marginBottom: 14,
  },

  // Slider
  sliderContainer: { gap: 10 },
  sliderTrack: {
    height: 6, backgroundColor: '#e8e8e8', borderRadius: 3,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%', backgroundColor: '#2ecc71', borderRadius: 3,
  },
  thumbRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginTop: -2,
  },
  sliderArrow: {
    width: 32, height: 32, justifyContent: 'center', alignItems: 'center',
  },
  sliderArrowText: { color: '#2ecc71', fontSize: 22, fontWeight: '700' },
  sliderThumb: {
    position: 'absolute',
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: '#2ecc71',
    borderWidth: 3, borderColor: '#141414',
    top: -7,
    shadowColor: '#2ecc71', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5, shadowRadius: 4, elevation: 4,
  },
  priceLabels: {
    flexDirection: 'row', justifyContent: 'space-between',
  },
  priceLabel: { color: '#999', fontSize: 12 },
  priceRange: { color: '#555', fontSize: 13, fontWeight: '600' },

  // Sort
  sortGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10,
  },
  sortChip: {
    paddingHorizontal: 14, paddingVertical: 10,
    backgroundColor: '#ffffff', borderRadius: 10,
    borderWidth: 1, borderColor: '#e8e8e8',
    width: (width - 54) / 2,
  },
  sortChipActive: {
    backgroundColor: '#2ecc71', borderColor: '#2ecc71',
  },
  sortChipText: { color: '#999', fontSize: 12, fontWeight: '500', textAlign: 'center' },
  sortChipTextActive: { color: '#fff', fontWeight: '700' },

  // Categories
  categoriesGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10,
  },
  categoryChip: {
    width: (width - 54) / 2, paddingVertical: 12,
    backgroundColor: '#ffffff', borderRadius: 10,
    borderWidth: 1, borderColor: '#e8e8e8',
    alignItems: 'center',
  },
  categoryChipActive: { backgroundColor: '#2ecc71', borderColor: '#2ecc71' },
  categoryChipText: { color: '#999', fontSize: 13, fontWeight: '600' },
  categoryChipTextActive: { color: '#fff', fontWeight: '700' },

  // Footer
  footer: {
    position: 'absolute', bottom: 24, left: 20, right: 20,
    flexDirection: 'row', gap: 12,
  },
  applyBtn: {
    flex: 1, backgroundColor: '#2ecc71', paddingVertical: 15,
    borderRadius: 30, alignItems: 'center',
    shadowColor: '#2ecc71', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 10, elevation: 6,
  },
  applyBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  clearBtn: {
    flex: 1, backgroundColor: '#ffffff', paddingVertical: 15,
    borderRadius: 30, alignItems: 'center',
    borderWidth: 1, borderColor: '#2ecc71',
  },
  clearBtnText: { color: '#2ecc71', fontSize: 15, fontWeight: '700' },
});

export default FilterScreen;
