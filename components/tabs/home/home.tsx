import Routes from '@/app/(route)/routes';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Easing,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BottomNav from '../../gloabal/bottom-nav';
import ItemDesign1 from './design/design1/item-design-1';
import ItemDesign2 from './design/design2/item-design-2';
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

  const [data, setData] = useState<object[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loaderType, setLoaderType] = useState<'default' | 'pulse' | 'dots' | 'progress' | 'skeleton'>('pulse');

  // Animations
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const progressAnim = React.useRef(new Animated.Value(0)).current;
  const dotsAnim = React.useRef(new Animated.Value(0)).current;

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

      // Animation de la barre de progression
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      // Animation des points
      Animated.loop(
        Animated.timing(dotsAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [loading]);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    // Simuler une API (tu peux remplacer ça par fetch/axios)
    const newItems = Array.from({ length: PAGE_SIZE }, (_, i) => ({
      id: `${i + 1 + (page - 1) * PAGE_SIZE}`,
      title: 'Article ' + PAGE_SIZE,
      price: PAGE_SIZE + '.99€',
      category: 'Électronique' + PAGE_SIZE,
      rating: 4.5,
      stock: 1 + PAGE_SIZE,
    }));

    // Délai simulé - 5 secondes pour le premier chargement, 1 seconde pour les suivants
    if (data.length === 0) {
      // Premier chargement - attendre 5 secondes
      await new Promise(r => setTimeout(r, 5000));
    } else {
      // Chargements suivants - attendre 1 seconde
      await new Promise(r => setTimeout(r, 20000));
    }

    setData(prev => [...prev, ...newItems]);
    setPage(prev => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
        {[...Array(2)].map((_, index) => (
          <ItemDesign1
            onPressItem={() => {
              navigateWithData(Routes.tabs.home.detail, item);
            }}
            key={`${item.id}${index}`}
          />
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
        {[...Array(3)].map((_, index) => (
          <ItemDesign2
            onPressItem={() => {
              navigateWithData(Routes.tabs.home.detail, item);
            }}
            key={`item2${item.id}${index}`}
          />
        ))}
      </ScrollView>

      {/* <ItemDesign3 /> */}
    </View>
  );

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

  return (
    <>
      <Header />
      {data.length > 0 ? (
        <FlatList
          style={styles.flatListContainer}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={fetchData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooterLoader}
          contentContainerStyle={{ padding: 10 }}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      ) : (
        renderLoader()
      )}

      <BottomNav />
    </>
  );
}
