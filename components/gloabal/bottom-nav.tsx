import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function BottomNav() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'categories':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'cart':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'account':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}>
      <Tabs.Screen name="home" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="categories" options={{ title: 'Catégories' }} />
      <Tabs.Screen name="cart" options={{ title: 'Panier' }} />
      <Tabs.Screen name="account" options={{ title: 'Compte' }} />
    </Tabs>
  );
}
