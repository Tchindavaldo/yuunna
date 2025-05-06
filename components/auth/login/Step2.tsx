import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

// Type précis pour les icônes supportées
type IconName = 'search-outline' | 'cart-outline' | 'airplane-outline';

interface Feature {
  id: string;
  icon: IconName;
  title: string;
  description: string;
}

interface FeatureItemProps {
  icon: IconName;
  title: string;
  description: string;
}

const { width, height } = Dimensions.get('window');

// Fonctionnalités principales de l'application
const features: Feature[] = [
  {
    id: '1',
    icon: 'search-outline',
    title: 'Recherche de produits',
    description: 'Trouvez facilement les produits chinois qui correspondent à vos besoins.'
  },
  {
    id: '2',
    icon: 'cart-outline',
    title: 'Achat en ligne',
    description: 'Commandez directement depuis notre application avec un paiement sécurisé.'
  },
  {
    id: '3',
    icon: 'airplane-outline',
    title: 'Livraison internationale',
    description: 'Livraison rapide et fiable de la Chine vers le Cameroun.'
  }
];

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <View style={styles.featureItem}>
    <View style={styles.iconContainer}>
      <Ionicons name={icon} size={width * 0.07} color="#FF5733" />
    </View>
    <View style={styles.featureTextContainer}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const Step2: React.FC<Step2Props> = ({ onNext, onBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nos fonctionnalités</Text>
        <Text style={styles.subtitle}>
          Découvrez tout ce que Yuunna propose pour faciliter vos achats
        </Text>
      </View>
      
      <View style={styles.featuresContainer}>
        <FlatList
          data={features}
          renderItem={({ item }) => (
            <FeatureItem
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.featuresList}
          showsVerticalScrollIndicator={false}
        />
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color="#555" />
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>Suivant</Text>
          <View style={styles.arrowContainer}>
            <Ionicons name="arrow-forward" size={22} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
      
      {/* Éléments décoratifs */}
      <View style={styles.decorElement1} />
      <View style={styles.decorElement2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.03,
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    width: '100%',
    paddingTop: height * 0.01,
    paddingBottom: height * 0.02,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#1D1A2F',
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: width * 0.042,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: width * 0.06,
    marginBottom: height * 0.01,
  },
  featuresContainer: {
    flex: 1,
    width: '100%',
  },
  featuresList: {
    paddingVertical: height * 0.01,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: height * 0.025,
    backgroundColor: '#FFFFFF',
    padding: width * 0.045,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(240, 240, 240, 1)',
  },
  iconContainer: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: width * 0.07,
    backgroundColor: 'rgba(255, 87, 51, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.04,
    shadowColor: "#FF5733",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  featureTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#1D1A2F',
    marginBottom: height * 0.008,
  },
  featureDescription: {
    fontSize: width * 0.038,
    color: '#666',
    lineHeight: width * 0.055,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: height * 0.025,
    paddingHorizontal: width * 0.02,
  },
  backButton: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F7',
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.06,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  backButtonText: {
    color: '#555',
    fontSize: width * 0.04,
    fontWeight: '600',
    marginLeft: 8,
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#FF5733',
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.06,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#FF5733",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    fontWeight: '600',
    marginRight: 8,
  },
  arrowContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorElement1: {
    position: 'absolute',
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: 'rgba(255, 87, 51, 0.05)',
    top: -width * 0.2,
    right: -width * 0.2,
    zIndex: -1,
  },
  decorElement2: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(29, 26, 47, 0.03)',
    bottom: -width * 0.25,
    left: -width * 0.25,
    zIndex: -1,
  },
});

export default Step2; 