import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header() {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('Mode');

  return (
    <View style={styles.headerWrapper}>
      <LinearGradient
        colors={['#4CAF50', '#2E7D32']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.container, { paddingTop: insets.top + 10 }]}>
        {/* Chips côté gauche */}
        <View style={styles.chipsContainer}>
          <TouchableOpacity style={[styles.chip, styles.activeChip]}>
            <Text style={styles.activeChipText}>Détaillant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Grossiste</Text>
          </TouchableOpacity>
        </View>

        {/* Icônes côté droit */}
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButtonWithBadge}>
            <Ionicons name="notifications-outline" size={24} color="white" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="cart-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Barre de catégories scrollable */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {categories.map(cat => (
            <TouchableOpacity 
              key={cat.label} 
              style={[styles.categoryItem, activeCategory === cat.label ? styles.activeCategoryItem : {}]}
              onPress={() => setActiveCategory(cat.label)}
            >
              <View style={[styles.iconCircle, activeCategory === cat.label ? styles.activeIconCircle : {}]}>
                <Ionicons 
                  name={cat.icon} 
                  size={18} 
                  color={activeCategory === cat.label ? "white" : "#555"} 
                />
              </View>
              <Text 
                style={[styles.categoryText, activeCategory === cat.label ? styles.activeCategoryText : {}]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
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
  headerWrapper: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  container: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeChip: {
    backgroundColor: 'white',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'white',
  },
  activeChipText: {
    color: '#4CAF50',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 18,
    padding: 5,
  },
  iconButtonWithBadge: {
    marginLeft: 18,
    padding: 5,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF5252',
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'white',
  },
  badgeText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
  },
  categoryContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  categoryScroll: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 24,
  },
  activeCategoryItem: {
    transform: [{ scale: 1.05 }],
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  activeIconCircle: {
    backgroundColor: '#4CAF50',
    borderColor: '#2E7D32',
  },
  categoryText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
