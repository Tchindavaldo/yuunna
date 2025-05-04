import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Chips côté gauche */}
        <View style={styles.chipsContainer}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Détaillant</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Grossiste</Text>
          </View>
        </View>

        {/* Icônes côté droit */}
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="cart-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Barre de catégories scrollable */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
        {categories.map(cat => (
          <TouchableOpacity key={cat.label} style={styles.categoryItem}>
            <Ionicons name={cat.icon} size={22} color="black" />
            <Text style={styles.categoryText}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const categories: { icon: IoniconName; label: string }[] = [
  { icon: 'home-outline', label: 'Maison' },
  { icon: 'shirt-outline', label: 'Mode' },
  { icon: 'phone-portrait-outline', label: 'Électronique' },
  { icon: 'fitness-outline', label: 'Sport' },
  { icon: 'paw-outline', label: 'Animaux' },
  { icon: 'restaurant-outline', label: 'Cuisine' },
  { icon: 'book-outline', label: 'Livres' },
  { icon: 'watch-outline', label: 'Montres' },
];
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  chip: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 16,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
  categoryScroll: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 25,
    backgroundColor: '#f9f9f9',
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryText: {
    fontSize: 12,
    marginTop: 4,
  },
});
