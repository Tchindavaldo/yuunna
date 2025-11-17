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
import { fetchProducts, setHasMore } from '../../../store/productSlice';
import { Product, productGroup } from '../../../store/types';
import BottomNav from '../../gloabal/bottom-nav';
import ItemDesign1 from './design/design1/item-design-1';
import ItemDesign2 from './design/design2/item-design-2';
import ItemDesign3 from './design/design3/item-design-3';
import ItemDesign6 from './design/design6/item-design-6';
import Header from './header/header';
import { useNavigateWithData } from './utils/navigate';

// Calcul du nombre optimal de produits à charger :
// - Chaque item principal utilise 1 produit
// - Design 1 utilise 2 produits supplémentaires
// - Design 2 utilise 3 produits supplémentaires
// - Design 4 utilise 4 produits supplémentaires
// Total par item: 1 + 2 + 3 + 4 = 10 produits
// Pour avoir au moins 2 items complets visibles à l'écran: 2 * 10 = 20
const PAGE_SIZE = 18; // Optimisé pour charger suffisamment de produits pour les designs

const { height, width } = Dimensions.get('window');

// Fonction utilitaire pour formater les prix (convertir les nombres en chaînes si nécessaire)
const formatPrice = (price: string | number | undefined): string => {
  if (price === undefined) return '0';
  if (typeof price === 'number') return `¥${price}`;
  return price;
};

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
  // Hooks et state
  const navigateWithData = useNavigateWithData();
  const dispatch = useAppDispatch();

  // Récupérer les données du store Redux avec vérification de sécurité
  const productsState = useAppSelector(state => state.products);
  const { loading, page, hasMore } = productsState;

  // S'assurer que items est toujours un tableau, même s'il est null ou undefined
  const items = productsState?.items || [];
  const data = items;
  const [loaderType, setLoaderType] = useState<'default' | 'pulse' | 'dots' | 'progress' | 'skeleton'>('pulse');
  const [isInitialLoadDone, setIsInitialLoadDone] = useState(false); // Flag pour éviter les appels multiples

  // Variables pour le carrousel des produits populaires
  // const defaultItem: productGroup =
  // data.length > 0 ? data[0] : {id:'id1',[{ id: '0', titre: '', status: '', prix: '0', imageUrl: '', vendeur: '', ventes: '0' }]};
  const defaultItem: productGroup =
    data.length > 0
      ? data[0]
      : {
          id: 'default-group',
          products: [
            {
              id: '0',
              titre: '',
              status: '',
              prix: '0',
              imageUrl: '',
              vendeur: '',
              ventes: '0',
            },
          ],
        };

  // Vérifier que defaultItem.products[0] existe
  console.log(defaultItem);

  const defaultProduct =
    defaultItem.products && defaultItem.products.length > 0
      ? defaultItem.products[0]
      : {
          id: '0',
          titre: 'Produit par défaut',
          status: 'active',
          prix: '0',
          imageUrl: '',
          vendeur: 'Boutique par défaut',
          ventes: '0 ventes',
        };

  const article = {
    titre: 'Produit par défaut',
    titreOriginal: 'Produit par défaut',
    disponibilite: 'indisponible',
    prix1: '0',
    image: undefined,
    vendeur: 'Boutique par défaut',
    ventes: '0 ventes',
  };
  // const article = {
  //   titre: defaultProduct.titre || 'Produit par défaut',
  //   titreOriginal: defaultProduct.titreOriginal || defaultProduct.titre || 'Produit par défaut',
  //   disponibilite: defaultProduct.status === 'active' ? 'disponible' : 'indisponible',
  //   prix1: formatPrice(defaultProduct.prix || '0'),
  //   image: defaultProduct.imageUrl ? { uri: defaultProduct.imageUrl } : undefined,
  //   vendeur: defaultProduct.vendeur || 'Boutique par défaut',
  //   ventes: defaultProduct.ventes || '0 ventes',
  // };

  // Animations
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const progressAnim = React.useRef(new Animated.Value(0)).current;
  const dotsAnim = React.useRef(new Animated.Value(0)).current;

  // Fonction pour charger les données initiales (première page)
  const loadInitialData = useCallback(async () => {
    // Vérifier si les données sont déjà chargées ou en cours de chargement
    if (loading || data.length > 0 || isInitialLoadDone) {
      // console.log(
      // //   '[HOME] Chargement initial ignoré:',
      //   loading ? 'chargement en cours' : data.length > 0 ? 'données déjà chargées' : 'déjà fait'
      // );
      return;
    }

    try {
      // Démarrage du chargement initial (cursor 0)
      // Réinitialiser le curseur à 0 et charger les données initiales
      await dispatch(
        fetchProducts({
          cursor: 0,
          limit: PAGE_SIZE,
          // keyword: '美国T恤', // Mot-clé par défaut, à remplacer par un état si nécessaire
        })
      );
      // Chargement initial terminé avec succès
    } catch (error) {
      console.error('[HOME] Erreur lors du chargement initial des produits:', error);
    }
  }, [dispatch, loading, data.length, isInitialLoadDone]);

  // Fonction pour charger plus de données (pagination)
  // Récupérer les données de pagination depuis le store Redux
  const { nextCursor, cursor, totalAvailable, hasMore: storeHasMore, lastDoc } = useAppSelector(state => state.products);

  // Log pour déboguer l'état de la pagination
  useEffect(() => {
    // // console.log(
    //   `[HOME] État de la pagination: cursor=${cursor}, nextCursor=${nextCursor}, hasMore=${hasMore}, storeHasMore=${storeHasMore}, totalAvailable=${totalAvailable}`
    // );
  }, [cursor, nextCursor, hasMore, storeHasMore, totalAvailable]);

  const fetchMoreData = useCallback(async () => {
    // Vérifier si un chargement est déjà en cours
    if (loading) {
      // console.log('[HOME] Pas de chargement supplémentaire: chargement en cours');
      return;
    }

    // Vérifier s'il y a plus de données à charger
    // Utiliser storeHasMore qui vient directement du store Redux
    if (storeHasMore === false) {
      // console.log('[HOME] Pas de chargement supplémentaire: plus de données (storeHasMore est false)');
      return;
    }

    // Log pour déboguer
    // console.log(`[HOME] fetchMoreData - cursor: ${cursor}, nextCursor: ${nextCursor}, storeHasMore: ${storeHasMore}`);

    // Vérifier si on a déjà chargé tous les produits disponibles
    // Note: Nous continuons à charger même si totalAvailable est atteint, car le backend peut avoir plus de données
    if (data.length >= totalAvailable && totalAvailable > 0) {
      // console.log(
      // //   `[HOME] Tous les produits disponibles (${totalAvailable}) ont été chargés, mais on continue à chercher plus`
      // );
      // // Ne pas arrêter le chargement ici, continuer à essayer de charger plus de données
      // dispatch(setHasMore(false)); // Cette ligne est commentée pour permettre plus de chargements
    }

    try {
      // Déterminer le curseur à utiliser pour la prochaine requête
      // Si nextCursor est défini, l'utiliser
      // Sinon, si cursor est défini, utiliser cursor + PAGE_SIZE
      // Sinon, utiliser data.length comme curseur (position actuelle dans la liste)
      let cursorToUse;

      if (nextCursor !== undefined && nextCursor !== null) {
        cursorToUse = nextCursor;
      } else if (cursor !== undefined && cursor !== null) {
        cursorToUse = cursor + PAGE_SIZE;
      } else {
        cursorToUse = data.length;
      }

      // Démarrage du chargement avec cursor et lastDoc
      // Charger la page suivante avec le système de curseur et lastDoc
      const result = await dispatch(
        fetchProducts({
          cursor: cursorToUse,
          limit: PAGE_SIZE,
          // Le mot-clé a été retiré pour simplifier la requête
          // Le lastDoc est automatiquement récupéré depuis le state dans le thunk
        })
      );

      // Vérifier si des données ont été reçues
      const payload = result.payload as any;
      if (payload && payload.items && payload.items.length === 0) {
        // console.log('[HOME] Aucun produit reçu, fin du chargement');
        // Forcer hasMore à false dans le store
        dispatch(setHasMore(false));
      } else {
        // Chargement avec cursor terminé avec succès
      }
    } catch (error) {
      console.error('[HOME] Erreur lors du chargement des produits supplémentaires:', error);
    }
  }, [dispatch, loading, storeHasMore, data.length, nextCursor, cursor, totalAvailable]);

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
    // Afficher l'état actuel avec le nombre réel d'éléments dans le tableau data
    // console.log('[HOME] Initialisation du composant Home - État actuel:', {
    //   dataLength: data.length,
    //   loading,
    //   isInitialLoadDone,
    //   page,
    //   hasMore,
    // });

    // Vérifier si les données sont déjà chargées ou en cours de chargement
    if (data.length === 0 && !loading && !isInitialLoadDone) {
      // Démarrage du chargement initial depuis useEffect
      setIsInitialLoadDone(true); // Marquer comme fait pour éviter les appels répétés
      loadInitialData();
    }

    // Ne pas nettoyer les données lors du démontage pour éviter de perdre l'état
    // entre les navigations
  }, [data.length, loading, isInitialLoadDone]);

  // Mémoiser la fonction onPressItem pour éviter les recréations à chaque rendu
  const createOnPressItem = useCallback(
    (item: Product | null | undefined) => {
      return () => {
        // Vérifier que l'item existe avant de naviguer
        if (item) {
          navigateWithData(Routes.tabs.home.detail, { product: item });
        } else {
          console.warn('[HOME] Tentative de navigation avec un produit null ou undefined');
          // Créer un produit par défaut pour éviter les erreurs
          const defaultProduct = {
            id: 'default-product',
            titre: 'Produit par défaut',
            prix: '0',
            imageUrl: '',
            vendeur: 'Boutique par défaut',
            ventes: '0 ventes',
            status: 'active',
          };
          navigateWithData(Routes.tabs.home.detail, { product: defaultProduct });
        }
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

      // Vérifier si nous avons assez de produits dans data
      if (data.length < 2) {
        // Si nous n'avons pas assez de produits, retourner un tableau avec le produit de base répété
        // console.log(
        // //   `[HOME] Pas assez de produits disponibles (${data.length}), utilisation du produit de base pour tous les designs`
        // );
        return Array(count).fill(baseProduct);
      }

      // Log pour déboguer
      // Produits disponibles pour getNextProducts

      // Créer un tableau d'indices stables basés sur le hash du produit
      // Utiliser modulo data.length pour s'assurer que nous ne dépassons pas la taille du tableau
      const stableIndices = Array.from({ length: count }, (_, i) => {
        return (baseHash + i + 1) % data.length;
      });

      // Récupérer les produits aux indices calculés
      for (const idx of stableIndices) {
        if (idx >= 0 && idx < data.length) {
          result.push(data[idx]);
        } else {
          // Si l'indice est hors limites, utiliser le produit de base comme fallback
          result.push(baseProduct);
        }
      }

      // Vérifier si nous avons récupéré assez de produits
      if (result.length < count) {
        // Compléter avec des copies du produit de base si nécessaire
        const remaining = count - result.length;
        // console.log(
        // //   `[HOME] Pas assez de produits récupérés (${result.length}/${count}), ajout de ${remaining} copies du produit de base`
        // );
        result.push(...Array(remaining).fill(baseProduct));
      }

      return result;
    },
    [data]
  );

  // Fonction pour déterminer si un produit doit être affiché comme premium
  const isPremiumProduct = useCallback((product: Product | null) => {
    // Vérifier si le produit est null ou undefined
    if (!product) return false;

    // Logique pour déterminer si un produit est premium
    // Par exemple, basé sur le prix, la catégorie, etc.
    if (!product.prix) return false;

    // Gérer à la fois les prix sous forme de chaîne et de nombre
    let prixValue: number;
    if (typeof product.prix === 'number') {
      prixValue = product.prix;
    } else {
      // Si c'est une chaîne, extraire la valeur numérique
      prixValue = parseFloat(product.prix.replace(/[^0-9.]/g, ''));
    }

    return prixValue > 50;
  }, []);

  // Mémoiser la fonction renderItem pour éviter les recréations à chaque rendu
  const renderItem = useCallback(
    ({ item, index }: { item: productGroup; index: number }) => {
      // Le backend renvoie maintenant directement un tableau de 6 items
      // Vérifier si item est un tableau ou un objet unique
      // Traitement de l'item

      // Vérifier si item est null ou undefined avant de traiter ses propriétés
      if (!item || !item.products) {
        return null; // Ne pas rendre cet élément s'il est null ou si ses produits sont null
      }

      const itemArray = Array.isArray(item.products) ? item.products : [item.products];

      // Filtrer les produits null ou undefined
      const validProducts = itemArray.filter(product => product !== null && product !== undefined);

      // Utiliser les produits valides pour les designs
      const design2Products = validProducts.slice(0, 6);
      const design4Products = validProducts.slice(6, 12);
      const design3Products = validProducts.slice(12);

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
              {design2Products
                .filter(product => product !== null && product !== undefined)
                .map((product, idx) => {
                  const productArticle = {
                    titre: product.titre || `Produit ${idx + 1}`,
                    titreOriginal: product.titreOriginal || product.titre || `Produit ${idx + 1}`,
                    disponibilite: product.status === 'active' ? 'disponible' : 'indisponible',
                    prix1: formatPrice(product.prix || '0'),
                    image: product.imageUrl ? { uri: product.imageUrl } : undefined,
                    vendeur: product.vendeur || `Boutique ${idx + 1}`,
                    ventes: product.ventes || `${Math.floor(Math.random() * 100) + 50} ventes`,
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
                  articles={design4Products
                    .filter(product => product !== null && product !== undefined)
                    .map((product, idx) => ({
                      titre: product.titre || `Produit ${idx + 1}`,
                      titreOriginal: product.titreOriginal || product.titre || `Produit ${idx + 1}`,
                      disponibilite: product.status === 'active' ? 'disponible' : 'indisponible',
                      prix: formatPrice(product.prix || '0'),
                      imageUrl: product.imageUrl || '',
                      vendeur: product.vendeur || `Boutique Premium ${idx + 1}`,
                      ventes:
                        product.ventes || `${Math.floor(Math.random() * (300 - idx * 50)) + (50 - idx * 10)} ventes`,
                      status: product.status || 'active',
                    }))}
                  onPressItem={index => {
                    const validProducts = design4Products.filter(product => product !== null);
                    if (index >= 0 && index < validProducts.length) {
                      createOnPressItem(validProducts[index])();
                    }
                  }}
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
              {design3Products
                .filter(product => product !== null && product !== undefined) // Filtrer les produits null ou undefined
                .map((product, idx) => {
                  if (isPremiumProduct(product)) {
                    const productArticle = {
                      titre: product.titre || `Produit Premium ${idx + 1}`,
                      titreOriginal: product.titreOriginal || product.titre || `Produit Premium ${idx + 1}`,
                      disponibilite: product.status === 'active' ? 'disponible' : 'indisponible',
                      prix1: formatPrice(product.prix || '0'),
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
                  image: data[0].products[0].imageUrl ? { uri: data[0].products[0].imageUrl } : undefined,
                  vendeur: 'Boutique Officielle',
                  ventes: '256 ventes',
                  titreOriginal: 'Produit Premium Exclusif',
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
                      prix1: formatPrice(design4Products[0].prix),
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
  const keyExtractor = useCallback((item: productGroup) => `product_${item.id}`, []);

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
      // console.log(`[HOME] Rendu du composant avec ${data.length} produits, page ${page}, hasMore: ${hasMore}`);
      // Ajouter un log pour afficher les IDs des produits pour déboguer
      // console.log(`[HOME] IDs des produits: ${data.map(p => p.id).join(', ')}`);

      // Si on a détecté des doublons dans le reducer mais que hasMore est toujours à true,
      // forcer hasMore à false pour arrêter les requêtes
      const uniqueIds = new Set(data.map((p: productGroup) => p.id));
      if (uniqueIds.size < data.length && hasMore) {
        // console.log(`[HOME] Détection de doublons dans les données, arrêt des requêtes`);
        dispatch(setHasMore(false));
      }
    }
  }, [data.length, page, hasMore, dispatch]);

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
          <ItemDesign1
            article={article}
            onPressItem={createOnPressItem(defaultItem.products[0])}
            key={`${defaultItem.id}_main`}
          />

          {/* Afficher les produits suivants */}
          {data.slice(1, 3).map((product: productGroup, idx: number) => {
            if (!product || !product.products || !product.products[0]) return null; // Vérification de sécurité complète

            // Récupérer le premier produit avec vérification de sécurité
            const firstProduct = product.products[0];

            const productArticle = {
              titre: firstProduct.titre || `Produit ${idx + 1}`,
              titreOriginal: firstProduct.titreOriginal || firstProduct.titre || `Produit ${idx + 1}`,
              disponibilite: firstProduct.status === 'active' ? 'disponible' : 'indisponible',
              prix1: formatPrice(firstProduct.prix || '0'),
              image: firstProduct.imageUrl ? { uri: firstProduct.imageUrl } : undefined,
              vendeur: firstProduct.vendeur || `Boutique ${idx + 1}`,
              ventes: firstProduct.ventes || `${Math.floor(Math.random() * 100) + 50} ventes`,
            };
            return (
              <ItemDesign1
                article={productArticle}
                onPressItem={createOnPressItem(product.products[0])}
                key={`${product.id}_design1_${idx}`}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }, [data.length, article, defaultItem, createOnPressItem]);

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
          onEndReachedThreshold={0}
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
