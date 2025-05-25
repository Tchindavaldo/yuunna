import Routes from '@/app/(route)/routes';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Easing,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchProducts } from '../../../store/productSlice';
import { Product } from '../../../store/types';
import BottomNav from '../../gloabal/bottom-nav';
import ItemDesign1 from './design/design1/item-design-1';
import ItemDesign2 from './design/design2/item-design-2';
import ItemDesign3 from './design/design3/item-design-3';
import ItemDesign6 from './design/design6/item-design-6';
import Header from './header/header';
import { useNavigateWithData } from './utils/navigate';

const PAGE_SIZE = 10;

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  flatListContainer: {
    backgroundColor: 'white',
    flex: 1,
  },

  itemSeparator: {
    height: 10,
    backgroundColor: 'white',
  },
  // Styles pour les sections
  sectionContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
  },
  desing6: {
    marginBottom: 0,
  },
  sectionHeader: {
    paddingHorizontal: 0,
    paddingLeft: 3,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  // Styles pour Pinterest/Taobao
  pinterestOuterContainer: {
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 3,
  },
  pinterestTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginLeft: 8,
  },
  pinterestDirectContainer: {
    position: 'relative',
    width: '100%',
    height: 650, // Hauteur fixe pour contenir tous les éléments
  },
  pinterestItem1: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '60%',
    height: 320,
    zIndex: 1,
  },
  pinterestItem2: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '38%',
    height: 150,
    zIndex: 2,
  },
  pinterestItem3: {
    position: 'absolute',
    top: 160,
    right: 0,
    width: '38%',
    height: 150,
    zIndex: 3,
  },
  pinterestItem4: {
    position: 'absolute',
    top: 330,
    left: 0,
    width: '100%',
    height: 320,
    zIndex: 4,
  },
  pinterestGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  pinterestSingleContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 0,
  },
  pinterestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pinterestLeftLarge: {
    width: '58%', // Plus large pour le design 4
  },
  pinterestRightLarge: {
    width: '40%', // Plus étroit pour le design 2
  },
  pinterestRightColumn: {
    width: '40%',
    justifyContent: 'space-between',
  },
  pinterestRightItem: {
    marginBottom: 10,
  },
  // Anciens styles maintenus pour compatibilité
  pinterestContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  pinterestColumn: {
    width: '48%',
    flexDirection: 'column',
  },
  pinterestItemWrapper: {
    marginBottom: 16,
  },
  pinterestSpacer: {
    height: 0,
    marginBottom: 0,
  },
  pinterestHeader: {
    paddingHorizontal: 0,
    paddingVertical: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  filtersScrollContainer: {
    paddingHorizontal: 5,
    paddingTop: 8,
    paddingBottom: 0,
    flexDirection: 'row',
    gap: 8,
    marginBottom: 0,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 3,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeFilterChip: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4CAF50',
  },
  filterChipText: {
    fontSize: 11,
    color: '#555',
    marginLeft: 3,
  },
  activeFilterChipText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: height - 150, // Hauteur moins l'espace pour le header et le bottom nav
  },
  footerLoader: {
    marginVertical: 20,
  },
  footerLoaderContainer: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  footerPulseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  footerPulseCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLoadingText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  changeLoaderButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 1000,
  },
  loaderTypeText: {
    position: 'absolute',
    bottom: 70,
    right: 90,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    color: 'white',
    fontSize: 12,
  },
  // Styles pour les loaders personnalisés
  pulseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseIcon: {
    position: 'absolute',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginHorizontal: 5,
  },
  progressBar: {
    width: width * 0.7,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginVertical: 20,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
});

export default function HomeComponent() {
  const navigateWithData = useNavigateWithData();
  const dispatch = useAppDispatch();
  const { items: data, loading, page, hasMore } = useAppSelector(state => state.products);
  const [loaderType, setLoaderType] = useState<'default' | 'pulse' | 'dots' | 'progress' | 'skeleton'>('pulse');
  const [isInitialLoadDone, setIsInitialLoadDone] = useState(false); // Flag pour éviter les appels multiples

  // Variables pour le carrousel des produits populaires
  const defaultItem: Product =
    data.length > 0 ? data[0] : { id: '0', titre: '', status: '', prix: '0', imageUrl: '', vendeur: '', ventes: '0' };
  const design1Products = data.length > 1 ? data.slice(1, 3) : [];
  const article = {
    titre: defaultItem.titre,
    disponibilite: defaultItem.status === 'active' ? 'disponible' : 'indisponible',
    prix1: defaultItem.prix,
    image: defaultItem.imageUrl ? { uri: defaultItem.imageUrl } : undefined,
    vendeur: defaultItem.vendeur,
    ventes: defaultItem.ventes,
  };

  // Animations
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const progressAnim = React.useRef(new Animated.Value(0)).current;
  const dotsAnim = React.useRef(new Animated.Value(0)).current;

  // Fonction pour charger les données initiales (première page)
  const loadInitialData = useCallback(async () => {
    // Vérifier si les données sont déjà chargées ou en cours de chargement
    if (loading || data.length > 0 || isInitialLoadDone) {
      console.log(
        '[HOME] Chargement initial ignoré:',
        loading ? 'chargement en cours' : data.length > 0 ? 'données déjà chargées' : 'déjà fait'
      );
      return;
    }

    try {
      console.log('[HOME] Démarrage du chargement initial (page 1)');
      // Réinitialiser la page à 1 et charger les données initiales
      await dispatch(fetchProducts({ page: 1, limit: PAGE_SIZE }));
      console.log('[HOME] Chargement initial terminé avec succès');
    } catch (error) {
      console.error('[HOME] Erreur lors du chargement initial des produits:', error);
    }
  }, [dispatch, loading, data.length, isInitialLoadDone]);

  // Fonction pour charger plus de données (pagination)
  const fetchMoreData = useCallback(async () => {
    // Vérifier si un chargement est déjà en cours ou s'il n'y a plus de données
    if (loading || !hasMore) {
      console.log('[HOME] Pas de chargement supplémentaire:', loading ? 'chargement en cours' : 'plus de données');
      return;
    }

    try {
      // Utiliser la page actuelle + 1 pour charger la page suivante
      const nextPage = page + 1;
      console.log(`[HOME] Démarrage du chargement de la page ${nextPage} (${data.length} produits déjà chargés)`);

      // Charger la page suivante
      await dispatch(fetchProducts({ page: nextPage, limit: PAGE_SIZE }));
      console.log(`[HOME] Chargement de la page ${nextPage} terminé avec succès`);
    } catch (error) {
      console.error('[HOME] Erreur lors du chargement des produits supplémentaires:', error);
    }
  }, [dispatch, loading, hasMore, page, data.length]);

  useEffect(() => {
    if (loading) {
      // Animation de pulsation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Animation de progression
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 5000, // 5 secondes pour compléter la barre
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      // Animation des points
      Animated.loop(
        Animated.timing(dotsAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();
    }
  }, [loading, pulseAnim, progressAnim, dotsAnim]);

  // Effet pour charger les données initiales une seule fois au montage du composant
  useEffect(() => {
    console.log('[HOME] Initialisation du composant Home - État actuel:', {
      dataLength: data.length,
      loading,
      isInitialLoadDone,
      page,
      hasMore,
    });

    // Vérifier si les données sont déjà chargées ou en cours de chargement
    if (data.length === 0 && !loading && !isInitialLoadDone) {
      console.log('[HOME] Démarrage du chargement initial depuis useEffect');
      setIsInitialLoadDone(true); // Marquer comme fait pour éviter les appels répétés
      loadInitialData();
    }

    // Ne pas nettoyer les données lors du démontage pour éviter de perdre l'état
    // entre les navigations
  }, [data.length, loading, isInitialLoadDone]);

  // Mémoiser la fonction onPressItem pour éviter les recréations à chaque rendu
  const createOnPressItem = useCallback(
    (item: Product) => {
      return () => {
        navigateWithData(Routes.tabs.home.detail, { product: item });
      };
    },
    [navigateWithData]
  );

  // Fonction pour obtenir les produits suivants dans la liste
  // Utilise un offset fixe basé sur l'ID du produit pour assurer la cohérence
  const getNextProducts = useCallback(
    (baseProduct: Product, count: number) => {
      // Utiliser l'ID du produit pour générer un hash numérique stable
      const getStableHash = (id: string) => {
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
          hash = (hash << 5) - hash + id.charCodeAt(i);
          hash |= 0; // Convertir en entier 32 bits
        }
        return Math.abs(hash);
      };

      const baseHash = getStableHash(baseProduct.id);
      const result = [];

      // Créer un tableau d'indices stables basés sur le hash du produit
      const stableIndices = Array.from({ length: count }, (_, i) => {
        return (baseHash + i + 1) % data.length;
      });

      // Récupérer les produits aux indices calculés
      for (const idx of stableIndices) {
        result.push(data[idx]);
      }

      return result;
    },
    [data]
  );

  // Fonction pour déterminer si un produit doit être affiché comme premium
  const isPremiumProduct = useCallback((product: Product) => {
    // Logique pour déterminer si un produit est premium
    // Par exemple, basé sur le prix, la catégorie, etc.
    return product.prix && parseFloat(product.prix.replace(/[^0-9.]/g, '')) > 50;
  }, []);

  // Mémoiser la fonction renderItem pour éviter les recréations à chaque rendu
  const renderItem = useCallback(
    ({ item, index }: { item: Product; index: number }) => {
      // Récupérer des produits supplémentaires pour les designs
      const design1Products = getNextProducts(item, 2);
      const design2Products = getNextProducts(item, 3);
      const design4Products = getNextProducts(item, 4); // Produits pour le design Pinterest/Taobao
      const design5Products = getNextProducts(item, 3); // Produits pour le design 5
      const design6Products = getNextProducts(item, 2); // Produits pour le design 6

      // Adapter le format du produit pour correspondre à l'interface ItemProps
      const article = {
        titre: item.titre,
        disponibilite: item.status === 'active' ? 'disponible' : 'indisponible',
        prix1: item.prix,
        image: item.imageUrl ? { uri: item.imageUrl } : undefined,
        vendeur: item.vendeur,
        ventes: item.ventes,
      };

      return (
        <View>
          {/* Section 2: Design 2 - Horizontal */}
          <View style={[styles.sectionContainer, { marginBottom: 20 }]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Nouveautés</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 15, paddingHorizontal: 0 }}
              removeClippedSubviews={true}>
              {design2Products.map((product, idx) => {
                const productArticle = {
                  titre: product.titre,
                  disponibilite: product.status === 'active' ? 'disponible' : 'indisponible',
                  prix1: product.prix,
                  image: product.imageUrl ? { uri: product.imageUrl } : undefined,
                  vendeur: product.vendeur,
                  ventes: product.ventes,
                };

                return (
                  <ItemDesign2
                    article={productArticle}
                    onPressItem={createOnPressItem(product)}
                    key={`${product.id}_design2_${idx}`}
                  />
                );
              })}
            </ScrollView>
          </View>

          {/* Section 5: Design 5 - Pinterest/Taobao Inversé */}
          {/* <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Collection Exclusive</Text>
              <Text style={styles.sectionSubtitle}>Sélection spéciale</Text>
            </View>

            <View style={styles.pinterestOuterContainer}>

               <View style={styles.pinterestSingleContainer}>
                {design4Products.length > 0 && (
                  <ItemDesign5
                    article={{
                      titre: design4Products[0].titre,
                      disponibilite: design4Products[0].status === 'active' ? 'disponible' : 'indisponible',
                      prix1: design4Products[0].prix,
                      image: design4Products[0].imageUrl ? { uri: design4Products[0].imageUrl } : undefined,
                      vendeur: design4Products[0].vendeur || 'Boutique Premium',
                      ventes: `${Math.floor(Math.random() * 300) + 50} ventes`,
                    }}
                    onPressItem={createOnPressItem(design4Products[0])}
                    secondItem={
                      design4Products.length > 1
                        ? {
                            titre: design4Products[1].titre,
                            disponibilite: design4Products[1].status === 'active' ? 'disponible' : 'indisponible',
                            prix1: design4Products[1].prix,
                            image: design4Products[1].imageUrl ? { uri: design4Products[1].imageUrl } : undefined,
                            vendeur: design4Products[1].vendeur || 'Boutique Exclusive',
                            ventes: `${Math.floor(Math.random() * 180) + 20} ventes`,
                          }
                        : undefined
                    }
                    thirdItem={
                      design4Products.length > 2
                        ? {
                            titre: design4Products[2].titre,
                            disponibilite: design4Products[2].status === 'active' ? 'disponible' : 'indisponible',
                            prix1: design4Products[2].prix,
                            image: design4Products[2].imageUrl ? { uri: design4Products[2].imageUrl } : undefined,
                            vendeur: design4Products[2].vendeur || 'Boutique Luxe',
                            ventes: `${Math.floor(Math.random() * 150) + 15} ventes`,
                          }
                        : undefined
                    }
                  />
                )}
              </View>
            </View>
          </View>*/}
          {/* Section 6: Design 6 - Deux éléments égaux côte à côte */}
          <View style={styles.sectionContainer && styles.desing6}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Sélection Duo</Text>
              {/* <Text style={styles.sectionSubtitle}>Produits complémentaires</Text> */}
            </View>

            <View style={[styles.pinterestOuterContainer, { marginBottom: 0, paddingBottom: 0, height: 'auto' }]}>
              {/* Affichage du composant ItemDesign6 avec 2 éléments de taille égale */}
              <View style={styles.pinterestSingleContainer}>
                <ItemDesign6
                  articles={design4Products.map((product, idx) => ({
                    titre: product.titre,
                    disponibilite: product.status === 'active' ? 'disponible' : 'indisponible',
                    prix: product.prix,
                    imageUrl: product.imageUrl,
                    vendeur: product.vendeur || `Boutique Premium ${idx + 1}`,
                    ventes: `${Math.floor(Math.random() * (300 - idx * 50)) + (50 - idx * 10)} ventes`,
                    status: product.status,
                  }))}
                  onPressItem={index => createOnPressItem(design4Products[index])()}
                />
              </View>
            </View>
          </View>

          {/* Section 3: Design 3 - Premium */}
          <View style={[styles.sectionContainer]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Produits Premium</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 15, paddingHorizontal: 0 }}
              removeClippedSubviews={true}>
              {/* Produits premium */}
              {data
                .slice(0, 4)
                .map((product, idx) => {
                  if (isPremiumProduct(product)) {
                    const productArticle = {
                      titre: product.titre,
                      disponibilite: product.status === 'active' ? 'disponible' : 'indisponible',
                      prix1: product.prix,
                      image: product.imageUrl ? { uri: product.imageUrl } : undefined,
                      vendeur: product.vendeur || 'Boutique Officielle',
                      ventes: product.ventes || '256 ventes',
                    };

                    return (
                      <ItemDesign3
                        article={productArticle}
                        onPressItem={createOnPressItem(product)}
                        key={`${product.id}_design3_${idx}`}
                      />
                    );
                  }
                  return null;
                })
                .filter(Boolean)}

              {/* Ajouter un exemple de design premium pour démonstration */}
              <ItemDesign3
                article={{
                  titre: 'Produit Premium Exclusif',
                  disponibilite: 'disponible',
                  prix1: '¥399',
                  image: data[0].imageUrl ? { uri: data[0].imageUrl } : undefined,
                  vendeur: 'Boutique Officielle',
                  ventes: '256 ventes',
                }}
                onPressItem={() => console.log('Produit premium cliqué')}
              />
            </ScrollView>
          </View>

          {/* Section 4: Design 4 - Pinterest/Taobao */}
          {/* <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Découvrir</Text>
              <Text style={styles.sectionSubtitle}>Tendances populaires</Text>
            </View>

            <View style={styles.pinterestOuterContainer}>
              <Text style={styles.pinterestTitle}>Style Pinterest/Taobao</Text>

               <View style={styles.pinterestSingleContainer}>
                {design4Products.length > 0 && (
                  <ItemDesign4
                    article={{
                      titre: design4Products[0].titre,
                      disponibilite: design4Products[0].status === 'active' ? 'disponible' : 'indisponible',
                      prix1: design4Products[0].prix,
                      image: design4Products[0].imageUrl ? { uri: design4Products[0].imageUrl } : undefined,
                      vendeur: design4Products[0].vendeur || 'Boutique Tendance',
                      ventes: `${Math.floor(Math.random() * 200) + 10} ventes`,
                    }}
                    onPressItem={createOnPressItem(design4Products[0])}
                  />
                )}
              </View>
            </View>
          </View> */}
        </View>
      );
    },
    [createOnPressItem, data, getNextProducts, isPremiumProduct]
  );

  // Mémoiser la fonction d'extraction de clé pour la FlatList
  const keyExtractor = useCallback((item: Product) => `product_${item.id}`, []);

  const renderLoader = () => {
    // Si c'est le chargement initial (pas de données)
    if (loading && data.length === 0) {
      // Afficher le loader centré si c'est le chargement initial
      switch (loaderType) {
        case 'pulse':
          return (
            <View style={styles.loaderContainer}>
              <View style={styles.pulseContainer}>
                <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }] }]}>
                  <Ionicons name="cart-outline" size={40} color="#4CAF50" style={styles.pulseIcon} />
                </Animated.View>
              </View>
              <Text style={styles.loadingText}>Chargement en cours...</Text>
            </View>
          );

        case 'dots':
          return (
            <View style={styles.loaderContainer}>
              <View style={styles.dotsContainer}>
                <Animated.View
                  style={[
                    styles.dot,
                    {
                      opacity: dotsAnim.interpolate({
                        inputRange: [0, 0.3, 0.6, 1],
                        outputRange: [0.3, 1, 0.3, 0.3],
                      }),
                    },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.dot,
                    {
                      opacity: dotsAnim.interpolate({
                        inputRange: [0, 0.3, 0.6, 1],
                        outputRange: [0.3, 0.3, 1, 0.3],
                      }),
                    },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.dot,
                    {
                      opacity: dotsAnim.interpolate({
                        inputRange: [0, 0.3, 0.6, 1],
                        outputRange: [0.3, 0.3, 0.3, 1],
                      }),
                    },
                  ]}
                />
              </View>
              <Text style={styles.loadingText}>Chargement en cours...</Text>
            </View>
          );

        case 'progress':
          return (
            <View style={styles.loaderContainer}>
              <Ionicons name="cart-outline" size={40} color="#4CAF50" />
              <View style={styles.progressBar}>
                <Animated.View
                  style={[
                    styles.progressFill,
                    {
                      width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
              </View>
              <Text style={styles.loadingText}>Chargement des produits...</Text>
            </View>
          );

        default:
          return (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.loadingText}>Chargement...</Text>
            </View>
          );
      }
    } else if (loading) {
      // Afficher le loader en bas pour le chargement de plus de données
      return <ActivityIndicator size="large" color="#4CAF50" style={styles.footerLoader} />;
    }
    return null;
  };

  // Version simplifiée du loader pour le footer avec toujours le type pulse mais plus petit
  const renderFooterLoader = () => {
    if (loading) {
      return (
        <View style={styles.footerLoaderContainer}>
          <View style={styles.footerPulseContainer}>
            <Animated.View style={[styles.footerPulseCircle, { transform: [{ scale: pulseAnim }] }]}>
              <Ionicons name="cart-outline" size={20} color="#4CAF50" style={styles.pulseIcon} />
            </Animated.View>
          </View>
          <Text style={styles.footerLoadingText}>Chargement en cours...</Text>
        </View>
      );
    }
    return null;
  };

  // Fonction pour changer le type de loader (à des fins de démonstration)
  const changeLoaderType = () => {
    const types: ('default' | 'pulse' | 'dots' | 'progress' | 'skeleton')[] = [
      'default',
      'pulse',
      'dots',
      'progress',
      'skeleton',
    ];
    const currentIndex = types.indexOf(loaderType);
    const nextIndex = (currentIndex + 1) % types.length;
    setLoaderType(types[nextIndex]);
  };

  // Log pour le rendu du composant - uniquement quand les données changent réellement
  useEffect(() => {
    if (data.length > 0) {
      console.log(`[HOME] Rendu du composant avec ${data.length} produits, page ${page}, hasMore: ${hasMore}`);
    }
  }, [data.length, page, hasMore]);

  // Composant d'en-tête pour le FlatList qui contient la bannière défilante
  const renderListHeader = useCallback(() => {
    if (data.length === 0) return null;

    return (
      <View>
        {/* Filtres et catégories rapides */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollContainer}>
          <TouchableOpacity style={styles.filterChip}>
            <Ionicons name="funnel-outline" size={14} color="#4CAF50" />
            <Text style={styles.filterChipText}>Filtrer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterChip, styles.activeFilterChip]}>
            <Text style={[styles.filterChipText, styles.activeFilterChipText]}>Populaires</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Nouveautés</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Promotions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Tendances</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Ventes</Text>
          </TouchableOpacity>
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 20, paddingHorizontal: 0, justifyContent: 'center', width: '100%' }}
          removeClippedSubviews={true}>
          {/* Afficher le produit principal */}
          <ItemDesign1 article={article} onPressItem={createOnPressItem(defaultItem)} key={`${defaultItem.id}_main`} />

          {/* Afficher les produits suivants */}
          {design1Products.map((product, idx) => {
            const productArticle = {
              titre: product.titre,
              disponibilite: product.status === 'active' ? 'disponible' : 'indisponible',
              prix1: product.prix,
              image: product.imageUrl ? { uri: product.imageUrl } : undefined,
              vendeur: product.vendeur,
              ventes: product.ventes,
            };
            return (
              <ItemDesign1
                article={productArticle}
                onPressItem={createOnPressItem(product)}
                key={`${product.id}_design1_${idx}`}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }, [data.length, article, defaultItem, design1Products, createOnPressItem]);

  return (
    <>
      <Header />
      {data.length > 0 ? (
        <FlatList
          style={styles.flatListContainer}
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={fetchMoreData}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={renderListHeader}
          ListFooterComponent={renderFooterLoader}
          contentContainerStyle={{ paddingHorizontal: 0 }}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          removeClippedSubviews={true}
          maxToRenderPerBatch={5}
          windowSize={10}
          initialNumToRender={3}
          updateCellsBatchingPeriod={50}
        />
      ) : (
        renderLoader()
      )}

      <BottomNav />
    </>
  );
}
