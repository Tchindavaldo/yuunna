import { ItemProps } from '@/interface/itemsProps';
import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Style Pinterest avec un élément principal et deux éléments secondaires
function ItemDesign4({
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
    titreOriginal = 'Produit Tendance',
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
      {/* Conteneur pour les deux éléments de gauche */}
      <View style={styles.sideContainer}>
        {/* Élément secondaire en haut à gauche - Design créatif */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}} style={styles.secondaryItem}>
          <View style={styles.secondaryImageContainer}>
            <Image
              source={typeof image2 === 'object' ? image2 : require('../../../../../assets/images/home/gm4.webp')}
              style={styles.image}
              resizeMode="cover"
            />
            {/* Overlay coloré au lieu d'un dégradé noir */}
            <View style={styles.colorOverlay1} />

            {/* Badge de prix flottant */}
            <View style={styles.floatingPriceBadge}>
              <Text style={styles.floatingPrice}>{prix2}</Text>
            </View>

            {/* Badge de ventes avec design amélioré */}
            {ventes2 && (
              <View style={styles.enhancedSalesBadge}>
                <Ionicons name="flame" size={10} color="#FFF" />
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
            {/* Overlay coloré différent */}
            <View style={styles.colorOverlay2} />

            {/* Badge de prix avec style différent */}
            <View style={styles.ribbonPriceBadge}>
              <Text style={styles.ribbonPrice}>{prix3}</Text>
            </View>

            {/* Badge de ventes avec position différente */}
            {ventes3 && (
              <View style={styles.cornerSalesBadge}>
                <Ionicons name="star" size={10} color="#FFF" />
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
                <Text style={styles.tagText}>Nouveau</Text>
              </View>
              <View style={styles.productTag2}>
                <Text style={styles.tagText}>Top</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Élément principal à droite */}
      <TouchableOpacity activeOpacity={0.8} onPress={() => onPressItem()} style={styles.mainItem}>
        {/* Image principale avec overlay de dégradé */}
        <View style={styles.mainImageContainer}>
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
            {titreOriginal}
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
    </View>
  );
}

const { width } = Dimensions.get('window');
const itemWidth = (width - 40) / 2; // 2 colonnes avec marge

const styles = StyleSheet.create({
  // Conteneur principal de la disposition Pinterest
  pinterestContainer: {
    width: width - 16,
    height: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  // Élément principal maintenant à droite
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

  // Conteneur pour les deux éléments maintenant à gauche
  sideContainer: {
    width: '40%',
    height: '100%',
    justifyContent: 'space-between',
  },

  // Éléments secondaires à droite
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
    backgroundColor: 'rgba(76, 175, 80, 0.15)', // Vert transparent
    borderRadius: 12,
  },

  colorOverlay2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(33, 150, 243, 0.15)', // Bleu transparent
    borderRadius: 12,
  },

  // Styles pour les badges de prix flottants
  floatingPriceBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  floatingPrice: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 12,
  },

  // Styles pour les badges de ventes améliorés
  enhancedSalesBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#FF5722',
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
    top: 10,
    left: 10,
    backgroundColor: '#9C27B0',
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

  // Styles pour les badges de prix en ruban
  ribbonPriceBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2196F3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 12,
  },

  ribbonPrice: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 12,
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
    backgroundColor: '#4CAF50',
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
    backgroundColor: '#FF9800',
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

  // Anciens styles maintenus pour compatibilité
  smallSalesBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },

  smallSalesText: {
    fontSize: 9,
    color: '#333',
    marginLeft: 2,
  },

  smallInfoContainer: {
    padding: 8,
    justifyContent: 'space-between',
    height: '40%',
  },

  smallTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },

  smallPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF4500',
  },

  // Ancien style container maintenu pour compatibilité
  container: {
    width: width / 2 + 17,
    height: 250,
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
    height: 150,
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
