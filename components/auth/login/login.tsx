import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Interface pour les props du composant
interface LoginFormProps {
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
  onEmailLogin?: () => void;
}

// Les patterns du fond d'écran avec caractères chinois
const BackgroundPatterns: React.FC = () => {
  return (
    <View style={styles.patternsContainer}>
      <Text style={[styles.chineseCharacter, { top: '43%', left: '15%' }]}>福</Text>
      <Text style={[styles.pattern, { top: '20%', left: '5%' }]}>—</Text>
      <View style={[styles.patternCircle, { top: '35%', left: '8%', width: 40, height: 40 }]} />
      <Text style={[styles.chineseCharacter, { top: '43%', right: '5%' }]}>财</Text>
      <Text style={[styles.pattern, { top: '36%', right: '42%' }]}>*</Text>
      <Text style={[styles.chineseCharacter, { top: '39%', right: '30%' }]}>贸</Text>
      <Text style={[styles.pattern, { bottom: '57%', left: '25%' }]}>~</Text>
      <Text style={[styles.chineseCharacter, { bottom: '20%', right: '15%' }]}>商</Text>
      <Text style={[styles.chineseCharacter, { top: '32%', right: '59%' }]}>财</Text>
      <Text style={[styles.pattern, { top: '46%', right: '22%' }]}>*</Text>
      <Text style={[styles.chineseCharacter, { top: '40%', right: '51%' }]}>贸</Text>
      <Text style={[styles.pattern, { bottom: '70%', left: '15%' }]}>~</Text>
      <Text style={[styles.chineseCharacter, { bottom: '61%', right: '16%' }]}>商</Text>
    </View>
  );
};

export default function LoginForm({ onGoogleLogin, onAppleLogin, onEmailLogin}: LoginFormProps) {
    const router = useRouter();
    
    const handleGoogleLogin = async () => {
      console.log('Connexion avec Google réussie');
      router.replace('/home');
    };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Logo Container */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Image 
            source={require('../../../assets/images/logo.png')}
            style={styles.logoImage}
            resizeMode="cover"
          />
        </View>
      </View>
      
      {/* Titre principal */}
      <Text style={styles.title}>Bienvenue{'\n'}sur Yuunna</Text>
      
      {/* Patterns du fond avec caractères chinois */}
      <BackgroundPatterns />
      
      {/* Textes descriptifs */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>Faites vos achats en</Text>
        <Text style={styles.descriptionText}>Chine en un clic.</Text>
      </View>
      
      {/* Boutons de connexion */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.googleButton]}
          onPress={handleGoogleLogin}
        >
          <Ionicons name="logo-google" size={22} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Continue avec Google</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.appleButton]}
          onPress={onAppleLogin}
        >
          <Ionicons name="logo-apple" size={22} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Sign in avec Apple</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.emailButton]}
          onPress={onEmailLogin}
        >
          <Ionicons name="mail-outline" size={22} color="#1D1A2F" style={styles.buttonIcon} />
          <Text style={styles.emailButtonText}>Continue avec email</Text>
        </TouchableOpacity>
      </View>
      
      {/* Indicateur de home */}
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');
const buttonWidth = width * 0.85;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: height * 0.04,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.06,
  },
  logoCircle: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: width * 0.175,
    backgroundColor: 'rgba(255, 87, 51, 0.05)',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoImage: {
    width: width * 0.33,
    height: width * 0.33,
    borderRadius: width * 0.165,
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    fontWeight: '700',
    fontSize: width * 0.1,
    color: '#1D1A2F',
    textAlign: 'center',
    marginTop: height * 0.04,
    lineHeight: width * 0.12,
  },
  patternsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  pattern: {
    position: 'absolute',
    fontSize: width * 0.08,
    color: '#ECECEC',
  },
  chineseCharacter: {
    position: 'absolute',
    fontSize: width * 0.08,
    color: 'rgba(255, 87, 51, 0.1)',
  },
  patternCircle: {
    position: 'absolute',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ECECEC',
  },
  descriptionContainer: {
    marginTop: height * 0.15,
    alignItems: 'center',
  },
  descriptionText: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    fontSize: width * 0.06,
    color: '#1D1A2F',
    marginVertical: 5,
  },
  buttonContainer: {
    width: buttonWidth,
    alignSelf: 'center',
    marginTop: height * 0.06,
  },
  button: {
    borderRadius: 25,
    paddingVertical: height * 0.02,
    marginVertical: height * 0.01,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleButton: {
    backgroundColor: '#1D1A2F',
  },
  appleButton: {
    backgroundColor: '#1D1A2F',
  },
  emailButton: {
    backgroundColor: '#F5F5F7',
  },
  buttonIcon: {
    marginRight: width * 0.03,
  },
  buttonText: {
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    fontSize: width * 0.042,
    fontWeight: '600',
  },
  emailButtonText: {
    color: '#1D1A2F',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    fontSize: width * 0.042,
    fontWeight: '600',
  },
  homeIndicator: {
    width: width * 0.35,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 100,
    alignSelf: 'center',
    position: 'absolute',
    bottom: height * 0.02,
    opacity: 0.2,
  },
});