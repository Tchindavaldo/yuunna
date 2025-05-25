import { ItemProps } from '@/interface/itemsProps';
import { Ionicons } from '@expo/vector-icons';
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
  } = article || {};

  // Valeurs supplémentaires pour le design tendance (valeurs par défaut)
  const vendeur = article?.vendeur || 'Boutique Tendance';
  const ventes = article?.ventes || '45 ventes';

  // Déterminer si le produit est disponible
  const isAvailable = disponibilite === 'disponible';

  // Extraire les valeurs pour le deuxième élément
  const {
    titre: titre2 = 'Accessoire Tendance',
    disponibilite: disponibilite2 = 'disponible',
    prix1: prix2 = '¥129',
    image: image2 = require('../../../../../assets/images/home/gm4.webp'),
    vendeur: vendeur2 = 'Boutique Accessoires',
    ventes: ventes2 = '32 ventes',
  } = secondItem || {};

  // Extraire les valeurs pour le troisième élément
  const {
    titre: titre3 = 'Collection Spéciale',
    disponibilite: disponibilite3 = 'disponible',
    prix1: prix3 = '¥159',
    image: image3 = require('../../../../../assets/images/home/gm4.webp'),
    vendeur: vendeur3 = 'Boutique Collections',
    ventes: ventes3 = '28 ventes',
  } = thirdItem || {};

  return (
    <View style={styles.pinterestContainer}>
      {/* Conteneur pour les deux éléments de gauche - INVERSÉ PAR RAPPORT À DESIGN 4 */}
      <View style={styles.leftContainer}>
        {/* Élément secondaire en haut à gauche - Design créatif */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}} style={styles.secondaryItem}>
          <View style={styles.secondaryImageContainer}>
            <Image
              source={typeof image2 === 'object' ? image2 : require('../../../../../assets/images/home/gm4.webp')}
              style={styles.image}
              resizeMode="cover"
            />
            {/* Overlay coloré avec dégradé violet */}
            <View style={styles.colorOverlay1} />

            {/* Badge de prix avec design hexagonal */}
            <View style={styles.hexagonPriceBadge}>
              <Text style={styles.hexagonPrice}>{prix2}</Text>
            </View>

            {/* Badge de ventes avec design amélioré */}
            {ventes2 && (
              <View style={styles.enhancedSalesBadge}>
                <Ionicons name="trending-up" size={10} color="#FFF" />
                <Text style={styles.enhancedSalesText}>{ventes2}</Text>
              </View>
            )}
          </View>

          {/* Informations du produit avec design amélioré */}
          <View style={styles.enhancedInfoContainer}>
            <Text style={styles.enhancedTitle} numberOfLines={1}>
              {titre2}
            </Text>
            <View style={styles.shopIndicator}>
              <View style={styles.shopDot} />
              <Text style={styles.smallShopText}>{vendeur2}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Élément tertiaire en bas à gauche - Design créatif différent */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}} style={styles.secondaryItem}>
          <View style={styles.secondaryImageContainer}>
            <Image
              source={typeof image3 === 'object' ? image3 : require('../../../../../assets/images/home/gm4.webp')}
              style={styles.image}
              resizeMode="cover"
            />
            {/* Overlay coloré avec dégradé turquoise */}
            <View style={styles.colorOverlay2} />

            {/* Badge de prix avec style circulaire */}
            <View style={styles.circlePriceBadge}>
              <Text style={styles.circlePrice}>{prix3}</Text>
            </View>

            {/* Badge de ventes avec position différente */}
            {ventes3 && (
              <View style={styles.cornerSalesBadge}>
                <Ionicons name="rocket" size={10} color="#FFF" />
                <Text style={styles.cornerSalesText}>{ventes3}</Text>
              </View>
            )}
          </View>

          {/* Informations du produit avec style différent */}
          <View style={styles.enhancedInfoContainer}>
            <Text style={styles.enhancedTitle} numberOfLines={1}>
              {titre3}
            </Text>
            <View style={styles.tagContainer}>
              <View style={styles.productTag}>
                <Text style={styles.tagText}>Exclusif</Text>
              </View>
              <View style={styles.productTag2}>
                <Text style={styles.tagText}>Promo</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Élément principal à droite - INVERSÉ PAR RAPPORT À DESIGN 4 */}
      <TouchableOpacity activeOpacity={0.8} onPress={() => onPressItem()} style={styles.mainItem}>
        {/* Image principale avec overlay de dégradé */}
        <View style={styles.mainImageContainer}>
          <Image
            source={typeof image === 'object' ? image : require('../../../../../assets/images/home/gm4.webp')}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Overlay coloré subtil */}
          <View style={styles.mainOverlay} />

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

          {/* Badge de prix premium */}
          <View style={styles.premiumPriceBadge}>
            <Text style={styles.premiumPrice}>{prix1}</Text>
          </View>
        </View>

        {/* Informations du produit */}
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {titre}
          </Text>

          <View style={styles.priceRow}>
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
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Conteneur principal de la disposition Pinterest inversée
  pinterestContainer: {
    width: width - 16,
    height: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  // Élément principal à droite (inversé)
  mainItem: {
    width: '58%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },

  // Conteneur pour les deux éléments de gauche (inversé)
  leftContainer: {
    width: '40%',
    height: '100%',
    justifyContent: 'space-between',
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
  },

  // Conteneur d'image pour l'élément principal
  mainImageContainer: {
    width: '100%',
    height: '65%',
    position: 'relative',
  },

  // Conteneur d'image pour les éléments secondaires
  secondaryImageContainer: {
    width: '100%',
    height: '60%',
    position: 'relative',
  },

  // Styles pour les overlays colorés
  colorOverlay1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(156, 39, 176, 0.15)', // Violet transparent
    borderRadius: 12,
  },

  colorOverlay2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 188, 212, 0.15)', // Turquoise transparent
    borderRadius: 12,
  },

  mainOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(233, 30, 99, 0.05)', // Rose très transparent
    borderRadius: 12,
  },

  // Styles pour les badges de prix hexagonaux
  hexagonPriceBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#9C27B0',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    transform: [{ rotate: '0deg' }],
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  hexagonPrice: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 12,
  },

  // Styles pour les badges de prix circulaires
  circlePriceBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#00BCD4',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  circlePrice: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 11,
  },

  // Style pour le badge de prix premium
  premiumPriceBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#E91E63',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },

  premiumPrice: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 14,
  },

  // Styles pour les badges de ventes améliorés
  enhancedSalesBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#673AB7',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },

  enhancedSalesText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 3,
  },

  // Styles pour les badges de ventes en coin
  cornerSalesBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#00BCD4',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },

  cornerSalesText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 3,
  },

  // Styles pour les conteneurs d'informations améliorés
  enhancedInfoContainer: {
    padding: 10,
    height: '40%',
    justifyContent: 'space-between',
  },

  enhancedTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },

  // Styles pour l'indicateur de boutique
  shopIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  shopDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9C27B0',
    marginRight: 4,
  },

  smallShopText: {
    fontSize: 10,
    color: '#666',
  },

  // Styles pour les tags de produit
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  productTag: {
    backgroundColor: '#00BCD4',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
  },

  productTag2: {
    backgroundColor: '#E91E63',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  tagText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: '700',
  },

  // Styles pour l'image
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  // Styles pour le gradient
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  // Styles pour les badges de ventes
  salesBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },

  salesText: {
    fontSize: 10,
    color: '#333',
    marginLeft: 3,
    fontWeight: '500',
  },

  // Styles pour le bouton favori
  favoriteButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

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

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E91E63',
  },

  // Styles pour le badge d'indisponibilité
  unavailableBadge: {
    backgroundColor: '#F44336',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  unavailableText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '500',
  },

  // Styles pour la rangée du vendeur
  shopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  shopBadge: {
    backgroundColor: 'rgba(233, 30, 99, 0.1)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  shopText: {
    color: '#E91E63',
    fontSize: 10,
    fontWeight: '500',
  },

  // Style pour le bouton du panier
  cartButton: {
    backgroundColor: '#E91E63',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(ItemDesign5);
