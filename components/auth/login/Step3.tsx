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

interface Step3Props {
  onFinish: () => void;
  onBack: () => void;
}

const { width, height } = Dimensions.get('window');

const Step3: React.FC<Step3Props> = ({ onFinish, onBack }) => {
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
          <View style={styles.shine} />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Prêt à commencer</Text>
          
          <Text style={styles.description}>
            Créez votre compte ou connectez-vous pour commencer à faire vos achats depuis la Chine vers le Cameroun.
          </Text>
        </View>
        
        <View style={styles.benefitsContainer}>
          <View style={styles.benefitItem}>
            <View style={styles.benefitIcon}>
              <Ionicons name="checkmark" size={20} color="#FF5733" />
            </View>
            <Text style={styles.benefitText}>Prix compétitifs</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <View style={styles.benefitIcon}>
              <Ionicons name="checkmark" size={20} color="#FF5733" />
            </View>
            <Text style={styles.benefitText}>Livraison sécurisée</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <View style={styles.benefitIcon}>
              <Ionicons name="checkmark" size={20} color="#FF5733" />
            </View>
            <Text style={styles.benefitText}>Support client 24/7</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color="#555" />
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.finishButton} onPress={onFinish}>
          <Text style={styles.finishButtonText}>Commencer</Text>
          <Ionicons name="arrow-forward" size={22} color="#FFFFFF" />
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
    paddingBottom: height * 0.04,
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
    marginBottom: height * 0.05,
  },
  logoBackground: {
    width: width * 0.55,
    height: width * 0.55,
    borderRadius: width * 0.275,
    backgroundColor: 'rgba(255, 87, 51, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#FF5733",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  image: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
  },
  shine: {
    position: 'absolute',
    width: width * 0.55,
    height: width * 0.55,
    borderRadius: width * 0.275,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    top: -10,
    left: -10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  title: {
    fontSize: width * 0.09,
    fontWeight: 'bold',
    color: '#1D1A2F',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  description: {
    fontSize: width * 0.045,
    textAlign: 'center',
    color: '#555',
    lineHeight: width * 0.065,
    paddingHorizontal: width * 0.05,
  },
  benefitsContainer: {
    width: '100%',
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.02,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.015,
  },
  benefitIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 87, 51, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  benefitText: {
    fontSize: width * 0.043,
    color: '#333',
    fontWeight: '500',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: height * 0.02,
  },
  backButton: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F7',
    paddingVertical: height * 0.02,
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
  finishButton: {
    flexDirection: 'row',
    backgroundColor: '#FF5733',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.08,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#FF5733",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: '600',
    marginRight: 10,
  },
  decorElement1: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(255, 87, 51, 0.05)',
    top: -width * 0.4,
    right: -width * 0.3,
    zIndex: -1,
  },
  decorElement2: {
    position: 'absolute',
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: 'rgba(29, 26, 47, 0.04)',
    bottom: -width * 0.3,
    left: -width * 0.3,
    zIndex: -1,
  },
});

export default Step3; 