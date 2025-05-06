import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface Step1Props {
  onNext: () => void;
}

const { width, height } = Dimensions.get('window');

const Step1: React.FC<Step1Props> = ({ onNext }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoWrapper}>
          <View style={styles.logoBackground}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          
          <View style={styles.decorCircle1} />
          <View style={styles.decorCircle2} />
          <View style={styles.decorCircle3} />
        </View>
        
        <Text style={styles.title}>Bienvenue sur Yuunna</Text>
        
        <Text style={styles.description}>
          Découvrez la simplicité d'acheter des produits directement de la Chine vers le Cameroun.
        </Text>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>Découvrir</Text>
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
    paddingHorizontal: width * 0.08,
    paddingBottom: height * 0.05,
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logoWrapper: {
    position: 'relative',
    marginBottom: height * 0.06,
  },
  logoBackground: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(255, 87, 51, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#FF5733",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
    zIndex: 2,
  },
  image: {
    width: width * 0.45,
    height: width * 0.45,
    borderRadius: width * 0.225,
  },
  decorCircle1: {
    position: 'absolute',
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
    backgroundColor: 'rgba(255, 87, 51, 0.15)',
    top: -width * 0.05,
    right: -width * 0.05,
    zIndex: 1,
  },
  decorCircle2: {
    position: 'absolute',
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    backgroundColor: 'rgba(255, 87, 51, 0.1)',
    bottom: -width * 0.03,
    left: -width * 0.03,
    zIndex: 1,
  },
  decorCircle3: {
    position: 'absolute',
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.04,
    backgroundColor: 'rgba(29, 26, 47, 0.08)',
    top: width * 0.12,
    left: -width * 0.06,
    zIndex: 1,
  },
  title: {
    fontSize: width * 0.09,
    fontWeight: 'bold',
    color: '#1D1A2F',
    marginBottom: height * 0.025,
    textAlign: 'center',
  },
  description: {
    fontSize: width * 0.048,
    textAlign: 'center',
    color: '#555',
    lineHeight: width * 0.07,
    paddingHorizontal: width * 0.05,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: height * 0.03,
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#FF5733',
    paddingVertical: height * 0.022,
    paddingHorizontal: width * 0.08,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.65,
    shadowColor: "#FF5733",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 7,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.05,
    fontWeight: '600',
    marginRight: 12,
  },
  arrowContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorElement1: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(255, 87, 51, 0.06)',
    top: -width * 0.4,
    left: -width * 0.2,
    zIndex: -1,
  },
  decorElement2: {
    position: 'absolute',
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: 'rgba(29, 26, 47, 0.04)',
    bottom: -width * 0.3,
    right: -width * 0.3,
    zIndex: -1,
  },
});

export default Step1; 