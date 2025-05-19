import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetailComponent() {
  const navigation = useNavigation();
  const route = useRoute();
  const { data }: any = route.params || {};

  console.log('gettt:', { data });

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>Article non trouvé</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Retour</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.dataId}>ID de l'article: {data.id}</Text>

      <View style={styles.detailsContainer}>
        {Object.entries(data).map(([key, value]) => (
          <Text key={key} style={styles.detaildata}>
            <Text style={styles.detailKey}>{key}: </Text>
            <Text>{String(value)}</Text>
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dataId: {
    fontSize: 18,
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
  },
  detaildata: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  detailKey: {
    fontWeight: 'bold',
  },
});
