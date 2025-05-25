import { ItemProps } from '@/interface/itemsProps';
import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Style unique et élégant pour un seul élément
function ItemDesign4({ article = {} as any, onPressItem }: ItemProps) {
  // Extraire les valeurs de l'objet article avec des valeurs par défaut
  const {
    titre = 'Produit Tendance',
    disponibilite = 'disponible',
    prix1 = '¥199',
    image = require('../../../../../assets/images/home/gm4.webp'),
  } = article || {};

  // Valeurs supplémentaires pour le design tendance (valeurs par défaut)
  const vendeur = article?.vendeur || 'Boutique Tendance';
  const ventes = article?.ventes || '45 ventes';

  // Déterminer si le produit est disponible
  const isAvailable = disponibilite === 'disponible';

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPressItem()} style={styles.container}>
      {/* Image principale avec overlay de dégradé */}
      <View style={styles.imageContainer}>
        <Image
          source={typeof image === 'object' ? image : require('../../../../../assets/images/home/gm4.webp')}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Dégradé en bas de l'image */}
        <View style={styles.gradient} />

        {/* Badge de ventes */}
        {ventes && (
          <View style={styles.salesBadge}>
            <Ionicons name="flame" size={12} color="#FF4500" />
            <Text style={styles.salesText}>{ventes}</Text>
          </View>
        )}

        {/* Bouton favori */}
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Informations du produit */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {titre}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{prix1}</Text>
          {!isAvailable && (
            <View style={styles.unavailableBadge}>
              <Text style={styles.unavailableText}>Indisponible</Text>
            </View>
          )}
        </View>

        {/* Informations du vendeur */}
        <View style={styles.shopRow}>
          <View style={styles.shopBadge}>
            <Text style={styles.shopText}>{vendeur}</Text>
          </View>

          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="cart-outline" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const { width } = Dimensions.get('window');
const itemWidth = (width - 40) / 2; // 2 colonnes avec marge

const styles = StyleSheet.create({
  // Style principal du conteneur
  container: {
    width: width / 2 + 17, // Exactement la moitié de l'écran moins les marges
    height: 250, // Hauteur fixe réduite pour s'adapter aux mobiles
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    marginHorizontal: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    height: 150, // Hauteur fixe pour l'image
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  salesBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  salesText: {
    fontSize: 10,
    color: '#333',
    marginLeft: 3,
    fontWeight: '500',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 8,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF4500',
    letterSpacing: 0.5,
  },
  unavailableBadge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  unavailableText: {
    fontSize: 8,
    color: '#999',
  },
  shopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shopBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    flex: 1,
    marginRight: 6,
  },
  shopText: {
    fontSize: 9,
    color: '#666',
    fontWeight: '500',
  },
  cartButton: {
    backgroundColor: '#4CAF50',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});

// Exporter le composant mémoisé pour éviter les rendus inutiles
export default memo(ItemDesign4);
