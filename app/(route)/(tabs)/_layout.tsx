import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
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

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get('window');
  const tabWidth = width / 4; // 4 onglets au total

  // Nous avons retiré les animations et le bouton central

  // Composant personnalisé pour chaque onglet
  const TabBarIcon = ({ route, focused }: { route: any; focused: boolean; color: string }) => {
    let iconComponent;

    const tabIconMap: Record<string, [string, string]> = {
      'home/index': ['home-outline', 'home'],
      'suivie/index': ['grid-outline', 'grid'],
      'cart/index': ['cart-outline', 'cart'],
      'account/index': ['person-outline', 'person'],
      'notification/index': ['notifications-outline', 'notifications'],
    };

    const [outline, filled] = tabIconMap[route.name] || ['ellipse-outline', 'ellipse'];

    if (focused) {
      iconComponent = (
        <View style={styles.activeIconContainer}>
          <Ionicons name={filled as keyof typeof Ionicons.glyphMap} size={18} color="white" />
        </View>
      );
    } else {
      iconComponent = <Ionicons name={outline as keyof typeof Ionicons.glyphMap} size={18} color="#777" />;
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
          // height: 70 + insets.bottom, // a utiliser en production
          height: 60,
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
        tabBarIcon: ({ focused, color }) => TabBarIcon({ route, focused, color }),
      })}>
      <Tabs.Screen name="home/index" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="cart/index" options={{ title: 'Panier' }} />
      <Tabs.Screen name="suivie/index" options={{ title: 'Suivie' }} />
      <Tabs.Screen name="notification/index" options={{ title: 'Notifications' }} />
      <Tabs.Screen name="account/index" options={{ title: 'Compte' }} />
    </Tabs>
  );
}
