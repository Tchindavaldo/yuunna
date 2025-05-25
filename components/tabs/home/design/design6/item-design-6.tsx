import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Type pour les articles
interface Article {
  titre: string;
  disponibilite: string;
  prix: string;
  prix1?: string; // Pour compatibilité avec le design 5
  vendeur: string;
  ventes: string;
  status?: string; // Optionnel pour permettre la compatibilité avec les espaces
  imageUrl?: string;
  image?: any; // Pour compatibilité avec le design 5
}

// Style Pinterest avec disposition en cascade et espaces intelligents
function ItemDesign6({
  articles = [],
  onPressItem,
  continueEffect = false,
}: {
  articles: Article[];
  onPressItem: (index: number) => void;
  continueEffect?: boolean;
}) {
  // Répartition des articles dans les colonnes gauche et droite
  // Si moins de 6 articles, on remplit avec des articles par défaut
  const filledArticles = [...articles];
  while (filledArticles.length < 6) {
    filledArticles.push({
      titre: `Produit Tendance ${filledArticles.length + 1}`,
      disponibilite: 'disponible',
      prix: `${Math.floor(Math.random() * 100) + 99}€`,
      vendeur: `Boutique ${filledArticles.length + 1}`,
      ventes: `${Math.floor(Math.random() * 100) + 50} ventes`,
      status: 'active',
    });
  }

  // Structure spécifique demandée :
  // Colonne gauche : 2 longs items design 6, 1 petit item design 5
  // Colonne droite : 1 petit item design 5, 2 longs items design 6
  const leftColumnItems = [filledArticles[0], filledArticles[1]]; // 2 longs items pour la colonne gauche
  const rightColumnItems = [filledArticles[3], filledArticles[4]]; // 2 longs items pour la colonne droite

  // Articles pour les petits items design 5
  const leftSmallItem = filledArticles[2]; // Petit item en bas de la colonne gauche
  const rightSmallItem = filledArticles[5]; // Petit item en haut de la colonne droite

  return (
    <View style={[styles.pinterestContainer, continueEffect && styles.continueEffectContainer]}>
      {/* Colonne gauche : 2 longs items design 6, 1 petit item design 5 */}
      <View style={styles.column}>
        {/* Premier item long */}
        {leftColumnItems.map((item, index) => {
          const isAvailable = item.status === 'active';
          return (
            <TouchableOpacity
              key={`left-${index}`}
              activeOpacity={0.8}
              onPress={() => onPressItem(filledArticles.indexOf(item))}
              style={[styles.itemCard]}>
              <View style={styles.imageContainer}>
                <Image
                  source={
                    item.imageUrl ? { uri: item.imageUrl } : require('../../../../../assets/images/home/gm4.webp')
                  }
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.overlay} />

                {/* Bouton favori */}
                <TouchableOpacity style={styles.favoriteButton}>
                  <Ionicons name="heart-outline" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.titre}
                </Text>
                <Text style={styles.price}>{item.prix}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Petit item design 5 en bas de la colonne gauche */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onPressItem(filledArticles.indexOf(leftSmallItem))}
          style={styles.smallItemCard}>
          <View style={styles.secondaryImageContainer}>
            <Image
              source={
                leftSmallItem.imageUrl
                  ? { uri: leftSmallItem.imageUrl }
                  : require('../../../../../assets/images/home/gm4.webp')
              }
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Informations du produit avec design amélioré */}
          <View style={styles.enhancedInfoContainer}>
            <Text style={styles.enhancedTitle} numberOfLines={1}>
              {leftSmallItem.titre}
            </Text>
            <Text style={styles.enhancedPrice}>{leftSmallItem.prix}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Colonne droite : 1 petit item design 5, 2 longs items design 6 */}
      <View style={styles.column}>
        {/* Petit item design 5 en haut de la colonne droite */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onPressItem(filledArticles.indexOf(rightSmallItem))}
          style={styles.smallItemCard}>
          <View style={styles.secondaryImageContainer}>
            <Image
              source={
                rightSmallItem.imageUrl
                  ? { uri: rightSmallItem.imageUrl }
                  : require('../../../../../assets/images/home/gm4.webp')
              }
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Informations du produit avec design amélioré */}
          <View style={styles.enhancedInfoContainer}>
            <Text style={styles.enhancedTitle} numberOfLines={1}>
              {rightSmallItem.titre}
            </Text>
            <Text style={styles.enhancedPrice}>{rightSmallItem.prix}</Text>
          </View>
        </TouchableOpacity>

        {/* Items longs de la colonne droite */}
        {rightColumnItems.map((item, index) => {
          const isAvailable = item.status === 'active';
          const isFirstRightItem = index === 0 && !continueEffect;

          return (
            <TouchableOpacity
              key={`right-${index}`}
              activeOpacity={0.8}
              onPress={() => onPressItem(filledArticles.indexOf(item))}
              style={[styles.itemCard]}>
              <View style={styles.imageContainer}>
                <Image
                  source={
                    item.imageUrl ? { uri: item.imageUrl } : require('../../../../../assets/images/home/gm4.webp')
                  }
                  style={styles.image}
                  resizeMode="cover"
                />

                {/* Bouton favori */}
                <TouchableOpacity style={styles.favoriteButton}>
                  <Ionicons name="heart-outline" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.titre}
                </Text>
                <Text style={styles.price}>{item.prix}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Container principal style Pinterest
  pinterestContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },

  // Container pour continuer l'effet Pinterest
  continueEffectContainer: {
    marginTop: -50, // Pour donner l'impression de continuité avec le composant précédent
  },

  // Styles pour les petits items (design 5)
  smallItemCard: {
    height: 180,
    marginVertical: 0,
    borderRadius: 8,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
    marginBottom: 20,
  },

  // Style pour le premier item de la colonne gauche
  firstLeftItemCard: {
    marginBottom: 20,
  },

  // Conteneur d'image pour les éléments secondaires
  secondaryImageContainer: {
    width: '100%',
    height: '60%',
    position: 'relative',
    backgroundColor: 'transparent',
  },

  // Styles pour les overlays colorés (supprimés)
  colorOverlay1: {
    display: 'none',
  },

  colorOverlay2: {
    display: 'none',
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

  enhancedPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E91E63',
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

  // Colonnes
  column: {
    width: '48%', // Légèrement moins que 50% pour avoir un petit espace entre les colonnes
  },

  // Carte d'article
  itemCard: {
    width: '100%',
    height: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20, // Espace plus grand entre les cartes dans la même colonne
  },

  // Conteneur d'image
  imageContainer: {
    width: '100%',
    height: 220, // Hauteur standard encore plus grande
    position: 'relative',
    backgroundColor: 'transparent',
  },

  // Image
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  // Overlay générique (supprimé)
  overlay: {
    display: 'none',
  },

  // Overlay pour le premier élément
  firstItemOverlay: {
    backgroundColor: 'rgba(33, 150, 243, 0.05)', // Bleu transparent
  },

  // Overlay pour le dernier élément
  lastItemOverlay: {
    backgroundColor: 'rgba(156, 39, 176, 0.05)', // Violet transparent
  },

  // Overlay pour les éléments réguliers
  regularOverlay: {
    backgroundColor: 'rgba(76, 175, 80, 0.05)', // Vert transparent
  },

  // Badge de disponibilité
  unavailableBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  unavailableText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

  // Badges de disponibilité supprimés

  // Bouton favori
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Badge de prix hexagonal (premier élément)
  hexagonPriceBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },

  hexagonPrice: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },

  // Badge de prix circulaire (dernier élément)
  circlePriceBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#E91E63',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circlePrice: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 12,
  },

  // Badge de prix régulier
  regularPriceBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },

  regularPrice: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 12,
  },

  // Badge de prix en ruban
  ribbonPriceBadge: {
    position: 'absolute',
    top: 10,
    left: 0,
    backgroundColor: '#E91E63',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },

  ribbonPrice: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 10,
  },

  // Badge de ventes
  salesBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  salesText: {
    fontSize: 10,
    color: '#FFF',
    marginLeft: 4,
  },

  // Badge de ventes en coin
  cornerSalesBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  cornerSalesText: {
    fontSize: 10,
    color: '#FFF',
    marginLeft: 4,
  },

  // Conteneur d'informations
  infoContainer: {
    padding: 12,
    justifyContent: 'space-between',
  },

  // Titre de l'article
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },

  // Prix de l'article
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E91E63',
    marginBottom: 5,
  },

  // Ligne pour le badge de boutique
  shopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  shopBadge: {
    backgroundColor: 'rgba(156, 39, 176, 0.1)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  shopText: {
    color: '#9C27B0',
    fontSize: 10,
    fontWeight: '500',
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
    fontWeight: '600',
  },
});

export default ItemDesign6;

interface ItemProps {
  article: {
    titre?: string;
    disponibilite?: string;
    prix1?: string;
    prix2?: string;
    image?: any;
    vendeur?: string;
    ventes?: string;
  };
  onPressItem: () => void;
}
