import { ItemProps } from '@/interface/itemsProps';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

function ItemDesign1({ article, onPressItem }: ItemProps) {
  const { width } = useWindowDimensions();
  const carouselWidth = width * 1; // Augmentation de la largeur à 85% de l'écran
  const [activeIndex, setActiveIndex] = useState(0);

  // Données du carrousel
  const carouselData: CarouselItem[] = [
    {
      id: 1,
      title: 'Bienvenue sur Yuunna',
      description: 'Votre marketplace africaine de confiance',
      backgroundColor: ['#4CAF50', '#2E7D32'],
      icon: 'shopping-bag',
      iconType: 'FontAwesome5',
    },
    {
      id: 2,
      title: 'Nouveaux Produits',
      description: 'Découvrez nos dernières arrivées exclusives',
      backgroundColor: ['#FF9800', '#F57C00'],
      icon: 'package-variant',
      iconType: 'MaterialCommunityIcons',
    },
    {
      id: 3,
      title: 'Livraison Rapide',
      description: 'Recevez vos commandes en un temps record',
      backgroundColor: ['#2196F3', '#1976D2'],
      icon: 'rocket',
      iconType: 'FontAwesome5',
    },
    {
      id: 4,
      title: 'Paiement Sécurisé',
      description: 'Vos transactions sont 100% sécurisées',
      backgroundColor: ['#9C27B0', '#7B1FA2'],
      icon: 'shield-check',
      iconType: 'MaterialCommunityIcons',
    },
    {
      id: 5,
      title: 'Support 24/7',
      description: 'Notre équipe est toujours à votre écoute',
      backgroundColor: ['#F44336', '#D32F2F'],
      icon: 'headset',
      iconType: 'FontAwesome5',
    },
  ];

  // Définir l'interface pour les données du carrousel
  interface CarouselItem {
    id: number;
    title: string;
    description: string;
    backgroundColor: [string, string];
    icon: any; // Utiliser any pour éviter les problèmes de typage avec les noms d'icônes
    iconType: 'FontAwesome5' | 'MaterialCommunityIcons' | 'Ionicons';
  }

  // Rendu d'un élément du carrousel
  const renderCarouselItem = ({ item, index }: { item: CarouselItem; index: number }) => {
    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.carouselItem} onPress={() => onPressItem()}>
        <LinearGradient
          colors={item.backgroundColor as [string, string]}
          style={styles.gradientBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <View style={styles.carouselContent}>
            <View style={styles.iconContainer}>
              {item.iconType === 'FontAwesome5' && <FontAwesome5 name={item.icon as any} size={36} color="white" />}
              {item.iconType === 'MaterialCommunityIcons' && (
                <MaterialCommunityIcons name={item.icon as any} size={40} color="white" />
              )}
              {item.iconType === 'Ionicons' && <Ionicons name={item.icon as any} size={40} color="white" />}
            </View>
            <Text style={styles.carouselTitle}>{item.title}</Text>
            <Text style={styles.carouselDescription}>{item.description}</Text>

            <View style={styles.carouselButton}>
              <Text style={styles.carouselButtonText}>Découvrir</Text>
              <FontAwesome5 name="arrow-right" size={14} color="white" style={styles.buttonIcon} />
            </View>
          </View>

          {/* Éléments décoratifs */}
          <View style={styles.decorCircle1} />
          <View style={styles.decorCircle2} />
          <View style={styles.decorCircle3} />
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={carouselWidth}
        height={200}
        autoPlay={true}
        data={carouselData}
        scrollAnimationDuration={1000}
        autoPlayInterval={5000}
        onSnapToItem={index => setActiveIndex(index)}
        renderItem={renderCarouselItem}
      />

      {/* Indicateurs de pagination */}
      <View style={styles.paginationContainer}>
        {carouselData.map((_, index) => (
          <View key={index} style={[styles.paginationDot, index === activeIndex ? styles.paginationDotActive : {}]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    alignItems: 'center',
    width: '100%',
  },
  carouselItem: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
    marginHorizontal: 5,
  },
  gradientBackground: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  carouselContent: {
    padding: 20,
    height: '100%',
    justifyContent: 'center',
    zIndex: 2,
  },
  iconContainer: {
    marginBottom: 12,
  },
  carouselTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  carouselDescription: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  carouselButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  carouselButtonText: {
    color: 'white',
    fontWeight: '600',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
    marginRight: 32,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#4CAF50',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  decorCircle1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: -30,
    right: -30,
    zIndex: 1,
  },
  decorCircle2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    bottom: -20,
    left: 30,
    zIndex: 1,
  },
  decorCircle3: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: 30,
    left: -10,
    zIndex: 1,
  },
});

// Définition des PropTypes ici
ItemDesign1.propTypes = {
  onPressItem: PropTypes.func.isRequired, // une fonction obligatoire
  article: PropTypes.object,
};

// Exporter le composant mémoisé pour éviter les rendus inutiles
export default memo(ItemDesign1);
