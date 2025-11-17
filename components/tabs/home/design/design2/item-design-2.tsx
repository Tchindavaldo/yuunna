import { ItemProps } from '@/interface/itemsProps';
import { Product } from '@/store/types';
import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function ItemDesign2({ article = { titreOriginal: 'Titre original par défaut' }, onPressItem }: ItemProps) {
  const {
    titre = 'Titre par défaut',
    disponibilite = 'indisponible',
    prix1 = '0 f',
    image = require('../../../../../assets/images/home/gm4.webp'), // image locale par défaut
    titreOriginal = 'Titre original par défaut',
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
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {titreOriginal}
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
    width: 150,
    // height: 150,
    marginRight: 6,
    paddingLeft: 3,
    marginVertical: 10,
    backgroundSize: 'content',
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 150,
    width: '90%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
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
    paddingVertical: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 5,
    lineHeight: 16,
    height: 28,
  },
  price: {
    color: '#FF4500',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 0,
    marginBottom: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
  },
  favoriteButton: {
    padding: 4,
  },
});

// Exporter le composant mémoisé pour éviter les rendus inutiles
export default memo(ItemDesign2);
