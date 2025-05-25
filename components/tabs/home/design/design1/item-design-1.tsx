import { ItemProps } from '@/interface/itemsProps';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function ItemDesign1({ article, onPressItem }: ItemProps) {
  // Extraire les valeurs de l'objet article avec des valeurs par défaut
  const {
    titre = 'Produit sans titre',
    disponibilite = 'indisponible',
    prix1 = '0f',
    image = require('../../../../../assets/images/home/gmx.png'),
  } = article || {};

  // Déterminer la couleur du badge de disponibilité
  const statusColor = disponibilite === 'disponible' ? '#4CAF50' : '#FF5252';
  
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        onPressItem();
      }}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={typeof image === 'object' ? image : require('../../../../../assets/images/home/gmx.png')}
            style={styles.image}
            resizeMode="contain"
          />
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
            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryTime}>15-20 min</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 320,
    height: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 140,
    height: '100%',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  statusBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    color: '#FF4500',
    fontSize: 18,
    fontWeight: '700',
  },
  deliveryInfo: {
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    padding: 4,
  },
  deliveryTime: {
    color: '#666666',
    fontSize: 10,
    fontWeight: '500',
  },
});

// Définition des PropTypes ici
ItemDesign1.propTypes = {
  onPressItem: PropTypes.func.isRequired, // une fonction obligatoire
  article: PropTypes.object,
};

// Exporter le composant mémoisé pour éviter les rendus inutiles
export default memo(ItemDesign1);
