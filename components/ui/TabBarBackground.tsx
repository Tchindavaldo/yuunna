// components/ui/TabBarBackground.tsx
import { StyleSheet, View } from 'react-native';

export default function TabBarBackground() {
  return <View style={styles.background} />;
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white', // ou une autre couleur qui correspond à ton design
  },
});
