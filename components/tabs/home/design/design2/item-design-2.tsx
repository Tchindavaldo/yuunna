import { ItemProps } from '@/interface/itemsProps';
import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function ItemDesign2({ article = {} as any, onPressItem }: ItemProps) {
  const {
    titre = 'Titre par défaut',
    disponibilite = 'indisponible',
    prix1 = '0 f',
    image = require('../../../../../assets/images/home/gm4.webp'), // image locale par défaut
  } = article || {};

  // Déterminer la couleur du badge de disponibilité
  const statusColor = disponibilite === 'disponible' ? '#4CAF50' : '#FF5252';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        onPressItem();
      }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={typeof image === 'object' ? image : require('../../../../../assets/images/home/gm4.webp')}
            style={styles.image}
            resizeMode="contain"
          />
          
          {/* Badge de disponibilité */}
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{disponibilite}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {titre}
          </Text>
          
          <View style={styles.footer}>
            <Text style={styles.price}>{prix1}</Text>
            <TouchableOpacity style={styles.favoriteButton}>
              <Ionicons name="heart-outline" size={16} color="#FF4500" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    marginHorizontal: 6,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 160,
    width: '100%',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    height: '85%',
    width: '85%',
    resizeMode: 'contain',
  },
  statusBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  statusText: {
    color: 'white',
    fontSize: 9,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
    lineHeight: 16,
    height: 32,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF4500',
  },
  favoriteButton: {
    padding: 4,
  },
});

// Exporter le composant mémoisé pour éviter les rendus inutiles
export default memo(ItemDesign2);
