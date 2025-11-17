import { ItemProps } from '@/interface/itemsProps';
import React, { memo } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Style Pinterest inversé avec les éléments secondaires à gauche et l'élément principal à droite
function ItemDesign5({
  article = {} as any,
  onPressItem,
  secondItem = {},
  thirdItem = {},
}: ItemProps & { secondItem?: any; thirdItem?: any }) {
  // Extraire les valeurs de l'objet article principal avec des valeurs par défaut
  const {
    titre = 'Produit Tendance',
    disponibilite = 'disponible',
    prix1 = '¥199',
    image = require('../../../../../assets/images/home/gm4.webp'),
    titreOriginal = 'Titre original par défaut',
  } = article || {};

  // Déterminer si le produit est disponible
  const isAvailable = disponibilite === 'disponible';

  // Extraire les valeurs pour le deuxième élément (item en haut à gauche)
  const {
    titre: titre2 = 'Accessoire Tendance',
    prix1: prix2 = '¥129',
    image: image2 = require('../../../../../assets/images/home/gm4.webp'),
  } = secondItem || {};

  // Extraire les valeurs pour le troisième élément (item en bas à gauche)
  const {
    titre: titre3 = 'Collection Spéciale',
    prix1: prix3 = '¥159',
    image: image3 = require('../../../../../assets/images/home/gm4.webp'),
  } = thirdItem || {};

  return (
    <View style={styles.pinterestContainer}>
      {/* Conteneur pour les deux éléments de gauche */}
      <View style={styles.leftContainer}>
        {/* Élément secondaire en haut à gauche */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}} style={styles.secondaryItem}>
          <View style={styles.secondaryImageContainer}>
            <Image
              source={typeof image2 === 'object' ? image2 : require('../../../../../assets/images/home/gm4.webp')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Informations du produit */}
          <View style={styles.enhancedInfoContainer}>
            <Text style={styles.enhancedTitle} numberOfLines={1}>
              {titre2}
            </Text>
            <Text style={styles.enhancedPrice}>{prix2}</Text>
          </View>
        </TouchableOpacity>

        {/* Élément tertiaire en bas à gauche */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}} style={styles.secondaryItem}>
          <View style={styles.secondaryImageContainer}>
            <Image
              source={typeof image3 === 'object' ? image3 : require('../../../../../assets/images/home/gm4.webp')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Informations du produit */}
          <View style={styles.enhancedInfoContainer}>
            <Text style={styles.enhancedTitle} numberOfLines={1}>
              {titre3}
            </Text>
            <Text style={styles.enhancedPrice}>{prix3}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.leftContainer}>
        {/* Élément secondaire en haut à gauche */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}} style={styles.secondaryItem}>
          <View style={styles.secondaryImageContainer}>
            <Image
              source={typeof image2 === 'object' ? image2 : require('../../../../../assets/images/home/gm4.webp')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Informations du produit */}
          <View style={styles.enhancedInfoContainer}>
            <Text style={styles.enhancedTitle} numberOfLines={1}>
              {titre2}
            </Text>
            <Text style={styles.enhancedPrice}>{prix2}</Text>
          </View>
        </TouchableOpacity>

        {/* Élément tertiaire en bas à gauche */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}} style={styles.secondaryItem}>
          <View style={styles.secondaryImageContainer}>
            <Image
              source={typeof image3 === 'object' ? image3 : require('../../../../../assets/images/home/gm4.webp')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Informations du produit */}
          <View style={styles.enhancedInfoContainer}>
            <Text style={styles.enhancedTitle} numberOfLines={1}>
              {titre3}
            </Text>
            <Text style={styles.enhancedPrice}>{prix3}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Conteneur principal de la disposition Pinterest inversée
  pinterestContainer: {
    width: width + 16,
    height: 450,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  // Conteneur pour les deux éléments de gauche (inversé)
  leftContainer: {
    width: '45%',
    height: '100%',
    justifyContent: 'flex-start',
  },

  // Éléments secondaires à gauche
  secondaryItem: {
    height: '48%',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },

  // Conteneur d'image pour les éléments secondaires
  secondaryImageContainer: {
    width: '100%',
    height: '70%',
    position: 'relative',
    backgroundColor: 'transparent',
  },

  // Styles pour les conteneurs d'images

  // Styles pour les conteneurs d'informations améliorés
  enhancedInfoContainer: {
    padding: 10,
    height: '60%',
    justifyContent: 'space-between',
  },

  enhancedTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },

  enhancedPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E91E63',
    marginBottom: 4,
  },

  // Style pour l'image
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  // Styles pour le bouton favori (supprimé car dupliqué)

  // Styles pour les informations du produit
  infoContainer: {
    padding: 10,
    height: '35%',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },

  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E91E63',
  },

  // Style pour le bouton favori
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(ItemDesign5);
