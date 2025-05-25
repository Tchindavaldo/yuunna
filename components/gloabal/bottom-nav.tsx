import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  centerButtonContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    top: -25,
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 4,
    borderColor: 'white',
  },
  centerButtonTouchable: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  activeTabContainer: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  activeIconContainer: {
    backgroundColor: '#4CAF50',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -10,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4CAF50',
  },
});

export default function BottomNav() {
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get('window');
  const tabWidth = width / 5; // 5 pour avoir de l'espace pour le bouton central

  // Animations pour le bouton central
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Animation de pulsation pour le bouton central
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, []);

  // Fonction pour animer le bouton central au toucher
  const animateCenterButton = () => {
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Interpolation pour la rotation
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // Composant personnalisé pour le bouton central
  const CenterButton = () => (
    <View style={styles.centerButtonContainer}>
      <Animated.View
        style={[
          styles.centerButton,
          {
            transform: [{ scale: scaleAnim }, { rotate: spin }],
          },
        ]}>
        <TouchableOpacity
          style={styles.centerButtonTouchable}
          onPress={() => {
            animateCenterButton();
            // Navigation ou action spéciale ici
          }}>
          <MaterialCommunityIcons name="shopping" size={26} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );

  // Composant personnalisé pour chaque onglet
  const TabBarIcon = ({ route, focused }: { route: any; focused: boolean }) => {
    let iconComponent;

    switch (route.name) {
      case 'home':
        iconComponent = focused ? (
          <View style={styles.activeIconContainer}>
            <Ionicons name="home" size={22} color="white" />
          </View>
        ) : (
          <Ionicons name="home-outline" size={22} color="#777" />
        );
        break;
      case 'suivie':
        iconComponent = focused ? (
          <View style={styles.activeIconContainer}>
            <Ionicons name="grid" size={22} color="white" />
          </View>
        ) : (
          <Ionicons name="grid-outline" size={22} color="#777" />
        );
        break;
      case 'cart':
        iconComponent = focused ? (
          <View style={styles.activeIconContainer}>
            <Ionicons name="cart" size={22} color="white" />
          </View>
        ) : (
          <Ionicons name="cart-outline" size={22} color="#777" />
        );
        break;
      case 'account':
        iconComponent = focused ? (
          <View style={styles.activeIconContainer}>
            <Ionicons name="person" size={22} color="white" />
          </View>
        ) : (
          <Ionicons name="person-outline" size={22} color="#777" />
        );
        break;
      default:
        iconComponent = <Ionicons name="ellipse-outline" size={22} color="#777" />;
    }

    return (
      <View style={[styles.tabContainer, focused && styles.activeTabContainer]}>
        {iconComponent}
        {focused && <View style={styles.activeIndicator} />}
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#777',
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          position: 'relative',
        },
        tabBarItemStyle: {
          width: tabWidth,
        },
        tabBarIcon: ({ focused }) => TabBarIcon({ route, focused }),
      })}>
      <Tabs.Screen name="home" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="suivie" options={{ title: 'Suivie' }} />
      <Tabs.Screen
        name="center"
        options={{
          title: '',
          tabBarButton: () => <CenterButton />,
        }}
        listeners={{
          tabPress: e => {
            // Empêcher la navigation
            e.preventDefault();
          },
        }}
      />
      <Tabs.Screen name="cart" options={{ title: 'Panier' }} />
      <Tabs.Screen name="account" options={{ title: 'Compte' }} />
    </Tabs>
  );
}
