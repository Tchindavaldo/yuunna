import { ItemProps } from '@/interface/itemsProps';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function ItemDesign3({ article = {} as any, onPressItem }: ItemProps) {
  // Extraire les valeurs de l'objet article avec des valeurs par défaut
  const {
    titre = 'Produit Premium',
    disponibilite = 'disponible',
    prix1 = '¥299',
    image = require('../../../../../assets/images/home/gm4.webp'),
  } = article || {};
  
  // Valeurs supplémentaires pour le design premium (valeurs par défaut)
  const vendeur = article.vendeur || 'Boutique Premium';
  const ventes = article.ventes || '128 ventes';

  // Déterminer les couleurs du gradient en fonction de la disponibilité
  const gradientColors = disponibilite === 'disponible' 
    ? ['#6A11CB', '#2575FC'] as const
    : ['#333333', '#666666'] as const;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        onPressItem();
      }}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          {/* Badge Premium */}
          <View style={styles.premiumBadge}>
            <Ionicons name="diamond" size={12} color="#FFD700" />
            <Text style={styles.premiumText}>Premium</Text>
          </View>

          {/* Contenu principal */}
          <View style={styles.contentRow}>
            {/* Informations du produit */}
            <View style={styles.infoContainer}>
              <Text style={styles.title} numberOfLines={2}>{titre}</Text>
              
              <View style={styles.shopInfo}>
                <Ionicons name="storefront-outline" size={12} color="#FFFFFF" />
                <Text style={styles.shopName}>{vendeur}</Text>
              </View>
              
              <View style={styles.salesInfo}>
                <Ionicons name="trending-up" size={12} color="#FFFFFF" />
                <Text style={styles.salesText}>{ventes}</Text>
              </View>
              
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{prix1}</Text>
                <View style={styles.statusIndicator}>
                  <View style={[styles.statusDot, { backgroundColor: disponibilite === 'disponible' ? '#4AFF8F' : '#FF5252' }]} />
                  <Text style={styles.statusText}>{disponibilite}</Text>
                </View>
              </View>
            </View>
            
            {/* Image du produit */}
            <View style={styles.imageContainer}>
              <Image
                source={typeof image === 'object' ? image : require('../../../../../assets/images/home/gm4.webp')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </View>
          
          {/* Boutons d'action */}
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={18} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-social-outline" size={18} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.cartButton]}>
              <Ionicons name="cart-outline" size={18} color="#FFFFFF" />
              <Text style={styles.cartText}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 4,
  },
  card: {
    width: 320,
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  premiumBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumText: {
    color: '#FFD700',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 4,
  },
  contentRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  infoContainer: {
    flex: 3,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 22,
  },
  shopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  shopName: {
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
    opacity: 0.9,
  },
  salesInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  salesText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
    opacity: 0.8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  statusText: {
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartText: {
    color: '#FFFFFF',
    marginLeft: 6,
    fontWeight: '600',
    fontSize: 14,
  },
});

// Exporter le composant mémoisé pour éviter les rendus inutiles
export default memo(ItemDesign3);
