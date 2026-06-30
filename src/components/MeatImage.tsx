import React from 'react';
import { View, StyleSheet } from 'react-native';

type MeatType = 'beef_cubes' | 'lamb' | 'chicken' | 'goat' | 'beef_boneless';

interface MeatImageProps {
  type?: MeatType;
  size?: number;
}

const MeatImage: React.FC<MeatImageProps> = ({ type = 'beef_cubes', size = 80 }) => {
  const s = size;

  if (type === 'beef_cubes') {
    return (
      <View style={[styles.container, { width: s, height: s }]}>
        <View style={[styles.cube, { width: s * 0.4, height: s * 0.38, backgroundColor: '#c0392b', borderRadius: 6, top: s * 0.1, left: s * 0.05 }]} />
        <View style={[styles.cube, { width: s * 0.38, height: s * 0.35, backgroundColor: '#e74c3c', borderRadius: 6, top: s * 0.15, left: s * 0.42 }]} />
        <View style={[styles.cube, { width: s * 0.36, height: s * 0.34, backgroundColor: '#a93226', borderRadius: 6, top: s * 0.46, left: s * 0.15 }]} />
        <View style={[styles.cube, { width: s * 0.34, height: s * 0.32, backgroundColor: '#cd6155', borderRadius: 6, top: s * 0.5, left: s * 0.5 }]} />
        <View style={[styles.herb, { backgroundColor: '#2ecc71', width: s * 0.3, height: s * 0.08, bottom: s * 0.05, left: s * 0.05, borderRadius: 4 }]} />
      </View>
    );
  }

  if (type === 'lamb') {
    return (
      <View style={[styles.container, { width: s, height: s }]}>
        <View style={[styles.cube, { width: s * 0.7, height: s * 0.5, backgroundColor: '#c0392b', borderRadius: s * 0.25, top: s * 0.15, left: s * 0.1, transform: [{ rotate: '-10deg' }] }]} />
        <View style={[styles.cube, { width: s * 0.55, height: s * 0.35, backgroundColor: '#e74c3c', borderRadius: s * 0.18, top: s * 0.22, left: s * 0.18, transform: [{ rotate: '-10deg' }] }]} />
        <View style={[styles.cube, { width: s * 0.12, height: s * 0.35, backgroundColor: '#bdc3c7', borderRadius: 4, bottom: s * 0.05, right: s * 0.12, transform: [{ rotate: '10deg' }] }]} />
        <View style={[styles.herb, { backgroundColor: '#27ae60', width: s * 0.28, height: s * 0.1, bottom: s * 0.08, left: s * 0.08, borderRadius: 5 }]} />
      </View>
    );
  }

  if (type === 'chicken') {
    return (
      <View style={[styles.container, { width: s, height: s }]}>
        <View style={[styles.cube, { width: s * 0.65, height: s * 0.48, backgroundColor: '#d4a373', borderRadius: s * 0.24, top: s * 0.12, left: s * 0.08 }]} />
        <View style={[styles.cube, { width: s * 0.5, height: s * 0.34, backgroundColor: '#f0c080', borderRadius: s * 0.18, top: s * 0.2, left: s * 0.15 }]} />
        <View style={[styles.cube, { width: s * 0.1, height: s * 0.38, backgroundColor: '#bdc3c7', borderRadius: 4, bottom: s * 0.04, right: s * 0.18 }]} />
        <View style={[styles.herb, { backgroundColor: '#2ecc71', width: s * 0.25, height: s * 0.08, bottom: s * 0.06, left: s * 0.06, borderRadius: 4 }]} />
      </View>
    );
  }

  if (type === 'goat') {
    return (
      <View style={[styles.container, { width: s, height: s }]}>
        <View style={[styles.cube, { width: s * 0.7, height: s * 0.45, backgroundColor: '#922b21', borderRadius: s * 0.22, top: s * 0.2, left: s * 0.08, transform: [{ rotate: '8deg' }] }]} />
        <View style={[styles.cube, { width: s * 0.52, height: s * 0.32, backgroundColor: '#c0392b', borderRadius: s * 0.16, top: s * 0.27, left: s * 0.15, transform: [{ rotate: '8deg' }] }]} />
        <View style={[styles.herb, { backgroundColor: '#1abc9c', width: s * 0.3, height: s * 0.09, bottom: s * 0.07, left: s * 0.06, borderRadius: 5 }]} />
      </View>
    );
  }

  // beef_boneless - large slab
  return (
    <View style={[styles.container, { width: s, height: s }]}>
      <View style={[styles.cube, { width: s * 0.82, height: s * 0.6, backgroundColor: '#c0392b', borderRadius: s * 0.15, top: s * 0.1, left: s * 0.06 }]} />
      <View style={[styles.cube, { width: s * 0.65, height: s * 0.42, backgroundColor: '#e74c3c', borderRadius: s * 0.12, top: s * 0.18, left: s * 0.14 }]} />
      <View style={[styles.cube, { width: s * 0.3, height: s * 0.2, backgroundColor: '#cd6155', borderRadius: s * 0.1, bottom: s * 0.12, right: s * 0.08 }]} />
      <View style={[styles.herb, { backgroundColor: '#2ecc71', width: s * 0.35, height: s * 0.1, bottom: s * 0.06, left: s * 0.06, borderRadius: 5 }]} />
      <View style={[styles.herb, { backgroundColor: '#27ae60', width: s * 0.2, height: s * 0.08, bottom: s * 0.14, left: s * 0.36, borderRadius: 4 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'relative', overflow: 'hidden' },
  cube: { position: 'absolute' },
  herb: { position: 'absolute' },
});

export default MeatImage;
