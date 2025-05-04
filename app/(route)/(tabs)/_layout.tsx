import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
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
          const tabIconMap: Record<string, [string, string]> = {
            'home/index': ['home-outline', 'home'],
            'categories/index': ['grid-outline', 'grid'],
            'cart/index': ['cart-outline', 'cart'],
            'account/index': ['person-outline', 'person'],
            'notification/index': ['notifications-outline', 'notifications'],
          };

          const [outline, filled] = tabIconMap[route.name] || ['ellipse-outline', 'ellipse'];
          const iconName = focused ? filled : outline;

          return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={20} color={color} />;
        },
      })}>
      <Tabs.Screen name="home/index" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="categories/index" options={{ title: 'Catégories' }} />
      <Tabs.Screen name="cart/index" options={{ title: 'Panier' }} />
      <Tabs.Screen name="notification/index" options={{ title: 'Notifications' }} />
      <Tabs.Screen name="account/index" options={{ title: 'Compte' }} />
    </Tabs>
  );
}
