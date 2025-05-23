import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PageHeader from '../common/PageHeader';

const { width } = Dimensions.get('window');

type PaymentMethod = 'card' | 'paypal' | 'orangemoney' | 'mtnmoney';

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeStep, setActiveStep] = useState(1);
  const [cardStep, setCardStep] = useState(1); // Étape dans le processus de carte (1-4)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCodePopup, setShowCodePopup] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Récupérer le montant total du panier depuis les paramètres de route
  const totalAmount = params.totalAmount ? parseFloat(params.totalAmount as string) : 169.97;

  // Animation pour les transitions entre étapes
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const spinAnim = React.useRef(new Animated.Value(0)).current;

  // Animation de rotation pour le loader
  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        })
      ).start();
    } else {
      spinAnim.setValue(0);
    }
  }, [isLoading]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const changeStep = (step: number) => {
    // Animation de transition
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Changer l'étape après la première animation
    setTimeout(() => {
      setActiveStep(step);
    }, 200);
  };

  const formatCardNumber = (text: string) => {
    // Supprimer tous les espaces
    const cleaned = text.replace(/\\s+/g, '');
    // Ajouter un espace tous les 4 chiffres
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    return formatted;
  };

  const handleCardNumberChange = (text: string) => {
    // Supprimer tout sauf les chiffres
    const numericOnly = text.replace(/[^0-9]/g, '');
    // Limiter à 16 chiffres
    const truncated = numericOnly.slice(0, 16);
    // Formater avec des espaces
    setCardNumber(formatCardNumber(truncated));
  };

  const handleExpiryDateChange = (text: string) => {
    // Supprimer tout sauf les chiffres
    const numericOnly = text.replace(/[^0-9]/g, '');

    if (numericOnly.length <= 2) {
      setExpiryDate(numericOnly);
    } else {
      // Format MM/YY
      setExpiryDate(`${numericOnly.slice(0, 2)}/${numericOnly.slice(2, 4)}`);
    }
  };

  const handleCvvChange = (text: string) => {
    // Supprimer tout sauf les chiffres et limiter à 3 ou 4 chiffres
    const numericOnly = text.replace(/[^0-9]/g, '');
    setCvv(numericOnly.slice(0, 4));
  };

  const renderPaymentMethodSelection = () => {
    return (
      <View style={styles.methodsContainer}>
        <Text style={styles.sectionTitle}>Choisissez votre méthode de paiement</Text>

        <TouchableOpacity
          style={[styles.paymentMethod, selectedPaymentMethod === 'card' && styles.paymentMethodSelected]}
          onPress={() => setSelectedPaymentMethod('card')}>
          <View style={styles.paymentMethodIcon}>
            <Ionicons name="card-outline" size={24} color={selectedPaymentMethod === 'card' ? '#4CAF50' : '#666'} />
          </View>
          <View style={styles.paymentMethodInfo}>
            <Text style={styles.paymentMethodTitle}>Carte bancaire</Text>
            <Text style={styles.paymentMethodSubtitle}>Visa, Mastercard, CB</Text>
          </View>
          {selectedPaymentMethod === 'card' && <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.paymentMethod, selectedPaymentMethod === 'paypal' && styles.paymentMethodSelected]}
          onPress={() => setSelectedPaymentMethod('paypal')}>
          <View style={styles.paymentMethodIcon}>
            <Ionicons name="logo-paypal" size={24} color={selectedPaymentMethod === 'paypal' ? '#4CAF50' : '#666'} />
          </View>
          <View style={styles.paymentMethodInfo}>
            <Text style={styles.paymentMethodTitle}>PayPal</Text>
            <Text style={styles.paymentMethodSubtitle}>Paiement sécurisé en ligne</Text>
          </View>
          {selectedPaymentMethod === 'paypal' && <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.paymentMethod, selectedPaymentMethod === 'orangemoney' && styles.paymentMethodSelected]}
          onPress={() => setSelectedPaymentMethod('orangemoney')}>
          <View
            style={[
              styles.paymentMethodIcon,
              { backgroundColor: selectedPaymentMethod === 'orangemoney' ? '#FFF5E6' : '#fff' },
            ]}>
            <Text style={{ color: '#FF6600', fontSize: 18, fontWeight: 'bold' }}>OM</Text>
          </View>
          <View style={styles.paymentMethodInfo}>
            <Text style={styles.paymentMethodTitle}>Orange Money</Text>
            <Text style={styles.paymentMethodSubtitle}>Paiement mobile rapide et sécurisé</Text>
          </View>
          {selectedPaymentMethod === 'orangemoney' && <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.paymentMethod, selectedPaymentMethod === 'mtnmoney' && styles.paymentMethodSelected]}
          onPress={() => setSelectedPaymentMethod('mtnmoney')}>
          <View
            style={[
              styles.paymentMethodIcon,
              { backgroundColor: selectedPaymentMethod === 'mtnmoney' ? '#FFFDE6' : '#fff' },
            ]}>
            <Text style={{ color: '#FFCC00', fontSize: 18, fontWeight: 'bold' }}>MTN</Text>
          </View>
          <View style={styles.paymentMethodInfo}>
            <Text style={styles.paymentMethodTitle}>MTN Mobile Money</Text>
            <Text style={styles.paymentMethodSubtitle}>Paiement mobile rapide et sécurisé</Text>
          </View>
          {selectedPaymentMethod === 'mtnmoney' && <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />}
        </TouchableOpacity>

        <TouchableOpacity style={styles.continueButton} onPress={() => changeStep(2)}>
          <LinearGradient
            colors={['#4CAF50', '#2E7D32']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.continueGradient}>
            <Text style={styles.continueButtonText}>Continuer</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  const renderMobileMoneyForm = () => {
    return (
      <View style={styles.mobileMoneyContainer}>
        <Text style={styles.sectionTitle}>
          {selectedPaymentMethod === 'orangemoney' ? 'Orange Money' : 'MTN Mobile Money'}
        </Text>

        <View style={styles.mobileMoneyCard}>
          <LinearGradient
            colors={selectedPaymentMethod === 'orangemoney' ? ['#FF8C00', '#FF6600'] : ['#FFDE03', '#FFCC00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.mobileMoneyGradient}>
            <View style={styles.mobileMoneyHeader}>
              <Text style={styles.mobileMoneyTitle}>
                {selectedPaymentMethod === 'orangemoney' ? 'Orange Money' : 'MTN Mobile Money'}
              </Text>
              <Ionicons name="phone-portrait-outline" size={24} color="#fff" />
            </View>

            <View style={styles.mobileMoneyBody}>
              <Text style={styles.mobileMoneyLabel}>Numéro associé</Text>
              <Text style={styles.mobileMoneyValue}>{phoneNumber || 'Entrez votre numéro'}</Text>
            </View>

            <View style={styles.mobileMoneyFooter}>
              <Text style={styles.mobileMoneyCode}>{selectedPaymentMethod === 'orangemoney' ? '#233#' : '*126#'}</Text>
              <Text style={styles.mobileMoneyInfo}>Vous recevrez une notification pour confirmer</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Numéro de téléphone</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre numéro"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.backButton} onPress={() => changeStep(1)}>
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.payButton, !phoneNumber && styles.payButtonDisabled]}
            onPress={() => {
              if (phoneNumber) {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  setShowCodePopup(true);
                }, 1500);
              }
            }}
            disabled={!phoneNumber}>
            <LinearGradient
              colors={selectedPaymentMethod === 'orangemoney' ? ['#FF8C00', '#FF6600'] : ['#FFDE03', '#FFCC00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.payGradient}>
              <Text style={[styles.payButtonText, selectedPaymentMethod === 'mtnmoney' && { color: '#333' }]}>
                Payer {totalAmount.toFixed(2)}€
              </Text>
              <Ionicons name="lock-closed" size={18} color={selectedPaymentMethod === 'mtnmoney' ? '#333' : '#fff'} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCardForm = () => {
    const renderCardPreview = () => (
      <View style={styles.cardPreview}>
        <LinearGradient
          colors={['#232526', '#414345']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}>
          <View style={styles.cardHeader}>
            <View style={styles.cardChip} />
            <Ionicons name="wifi-outline" size={24} color="#fff" style={{ transform: [{ rotate: '90deg' }] }} />
          </View>

          <Text style={styles.cardNumberPreview}>{cardNumber || '•••• •••• •••• ••••'}</Text>

          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardLabel}>NOM DU TITULAIRE</Text>
              <Text style={styles.cardValue}>{cardName || 'Votre Nom'}</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>EXPIRE</Text>
              <Text style={styles.cardValue}>{expiryDate || 'MM/YY'}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );

    // Étape 1: Numéro de carte et nom
    const renderCardNumberStep = () => (
      <View>
        {renderCardPreview()}

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Numéro de carte</Text>
          <TextInput
            style={styles.input}
            placeholder="1234 5678 9012 3456"
            keyboardType="number-pad"
            value={cardNumber}
            onChangeText={handleCardNumberChange}
            maxLength={19} // 16 chiffres + 3 espaces
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nom du titulaire</Text>
          <TextInput
            style={styles.input}
            placeholder="Prénom Nom"
            value={cardName}
            onChangeText={setCardName}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.backButton} onPress={() => changeStep(1)}>
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.nextButton, (!cardNumber || !cardName) && styles.buttonDisabled]}
            onPress={() => cardNumber && cardName && setCardStep(2)}
            disabled={!cardNumber || !cardName}>
            <LinearGradient
              colors={['#4CAF50', '#2E7D32']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.nextGradient}>
              <Text style={styles.nextButtonText}>Suivant</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );

    // Étape 2: Date d'expiration et CVV
    const renderCardExpiryStep = () => (
      <View>
        {renderCardPreview()}

        <View style={styles.inputRow}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.inputLabel}>Date d'expiration</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              keyboardType="number-pad"
              value={expiryDate}
              onChangeText={handleExpiryDateChange}
              maxLength={5} // MM/YY
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.inputLabel}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="123"
              keyboardType="number-pad"
              value={cvv}
              onChangeText={handleCvvChange}
              maxLength={4}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveCardOption} onPress={() => setSaveCard(!saveCard)}>
          <View style={[styles.checkbox, saveCard && styles.checkboxChecked]}>
            {saveCard && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <Text style={styles.saveCardText}>Enregistrer cette carte pour mes prochains achats</Text>
        </TouchableOpacity>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.backButton} onPress={() => setCardStep(1)}>
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.payButton, (!expiryDate || !cvv) && styles.buttonDisabled]}
            onPress={() => {
              if (expiryDate && cvv) {
                setIsLoading(true);
                // Générer un numéro de commande
                const generatedOrderNumber = `YU${Math.floor(100000 + Math.random() * 900000)}`;
                setOrderNumber(generatedOrderNumber);

                setTimeout(() => {
                  setIsLoading(false);
                  setPaymentSuccess(true);
                  changeStep(3);
                }, 1500);
              }
            }}
            disabled={!expiryDate || !cvv}>
            <LinearGradient
              colors={['#4CAF50', '#2E7D32']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.payGradient}>
              <Text style={styles.payButtonText}>Payer {totalAmount.toFixed(2)}€</Text>
              <Ionicons name="lock-closed" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );

    return (
      <View style={styles.cardFormContainer}>
        <Text style={styles.sectionTitle}>
          {cardStep === 1 && 'Informations de carte'}
          {cardStep === 2 && 'Sécurité'}
        </Text>

        {cardStep === 1 && renderCardNumberStep()}
        {cardStep === 2 && renderCardExpiryStep()}
      </View>
    );
  };

  // Étape 3: Message de confirmation simple
  const renderConfirmation = () => {
    return (
      <View style={styles.confirmationContainer}>
        <View style={styles.successIconContainer}>
          <LinearGradient
            colors={['#4CAF50', '#2E7D32']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.successIconGradient}>
            <Ionicons name="checkmark" size={60} color="#fff" />
          </LinearGradient>
        </View>

        <Text style={styles.confirmationTitle}>Paiement réussi !</Text>
        <Text style={styles.confirmationSubtitle}>
          Votre commande a été confirmée et sera expédiée dans les plus brefs délais.
        </Text>

        <TouchableOpacity style={styles.continueButton} onPress={() => changeStep(4)}>
          <LinearGradient
            colors={['#4CAF50', '#2E7D32']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.continueGradient}>
            <Text style={styles.continueButtonText}>Voir le récapitulatif</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  // Étape 4: Reçu détaillé
  const renderReceipt = () => {
    return (
      <View style={styles.confirmationContainer}>
        <View style={styles.orderSummary}>
          <Text style={styles.orderSummaryTitle}>Récapitulatif de la commande</Text>

          <View style={styles.orderDetail}>
            <Text style={styles.orderDetailLabel}>Numéro de commande</Text>
            <Text style={styles.orderDetailValue}>#{orderNumber}</Text>
          </View>

          <View style={styles.orderDetail}>
            <Text style={styles.orderDetailLabel}>Date</Text>
            <Text style={styles.orderDetailValue}>{new Date().toLocaleDateString()}</Text>
          </View>

          <View style={styles.orderDetail}>
            <Text style={styles.orderDetailLabel}>Méthode de paiement</Text>
            <Text style={styles.orderDetailValue}>
              {selectedPaymentMethod === 'card' && 'Carte bancaire'}
              {selectedPaymentMethod === 'paypal' && 'PayPal'}
              {selectedPaymentMethod === 'orangemoney' && 'Orange Money'}
              {selectedPaymentMethod === 'mtnmoney' && 'MTN Mobile Money'}
            </Text>
          </View>

          <View style={styles.orderDetail}>
            <Text style={styles.orderDetailLabel}>Montant total</Text>
            <Text style={styles.orderDetailValue}>{totalAmount.toFixed(2)}€</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.returnButton} onPress={() => router.push('/')}>
          <LinearGradient
            colors={['#4CAF50', '#2E7D32']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.returnGradient}>
            <Text style={styles.returnButtonText}>Retour à l'accueil</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.trackOrderButton} onPress={() => router.push('/suivie')}>
          <Text style={styles.trackOrderText}>Suivre ma commande</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <PageHeader
        title="Paiement"
        subtitle="Finalisez votre commande en toute sécurité"
        iconName="shield-checkmark-outline"
        badgeCount={0}
        badgeColor="#4CAF50"
        onIconPress={() => router.back()}
      />

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(activeStep / 4) * 100}%` }]} />
        </View>
        <View style={styles.stepsContainer}>
          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, activeStep >= 1 && styles.activeStepCircle]}>
              {activeStep > 1 ? (
                <Ionicons name="checkmark" size={16} color="#fff" />
              ) : (
                <Text style={[styles.stepNumber, activeStep >= 1 && styles.activeStepNumber]}>1</Text>
              )}
            </View>
            <Text style={[styles.stepLabel, activeStep >= 1 && styles.activeStepLabel]}>Méthode</Text>
          </View>

          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, activeStep >= 2 && styles.activeStepCircle]}>
              {activeStep > 2 ? (
                <Ionicons name="checkmark" size={16} color="#fff" />
              ) : (
                <Text style={[styles.stepNumber, activeStep >= 2 && styles.activeStepNumber]}>2</Text>
              )}
            </View>
            <Text style={[styles.stepLabel, activeStep >= 2 && styles.activeStepLabel]}>Détails</Text>
          </View>

          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, activeStep >= 3 && styles.activeStepCircle]}>
              {activeStep > 3 ? (
                <Ionicons name="checkmark" size={16} color="#fff" />
              ) : (
                <Text style={[styles.stepNumber, activeStep >= 3 && styles.activeStepNumber]}>3</Text>
              )}
            </View>
            <Text style={[styles.stepLabel, activeStep >= 3 && styles.activeStepLabel]}>Confirmation</Text>
          </View>

          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, activeStep >= 4 && styles.activeStepCircle]}>
              {activeStep > 4 ? (
                <Ionicons name="checkmark" size={16} color="#fff" />
              ) : (
                <Text style={[styles.stepNumber, activeStep >= 4 && styles.activeStepNumber]}>4</Text>
              )}
            </View>
            <Text style={[styles.stepLabel, activeStep >= 4 && styles.activeStepLabel]}>Reçu</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.stepContent, { opacity: fadeAnim }]}>
          {activeStep === 1 && renderPaymentMethodSelection()}
          {activeStep === 2 &&
            (selectedPaymentMethod === 'orangemoney' || selectedPaymentMethod === 'mtnmoney'
              ? renderMobileMoneyForm()
              : renderCardForm())}
          {activeStep === 3 && renderConfirmation()}
          {activeStep === 4 && renderReceipt()}
        </Animated.View>
      </ScrollView>

      {/* Popup pour le code de confirmation */}
      {showCodePopup && (
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>Confirmer le paiement 💰 🔒</Text>
            </View>
            <View style={styles.popupBody}>
              <Text style={styles.popupText}>
                Composez le code
                <Text style={styles.popupCode}>{selectedPaymentMethod === 'orangemoney' ? ' #233# ' : ' *126# '}</Text>
                puis entrez votre code secret pour valider votre transaction sur Yuunna.
              </Text>
            </View>
            <View style={styles.popupFooter}>
              <TouchableOpacity
                style={styles.popupButton}
                onPress={() => {
                  setShowCodePopup(false);
                  setTimeout(() => {
                    changeStep(3);
                  }, 500);
                }}>
                <Text style={styles.popupButtonText}>J'ai compris</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Loader */}
      {isLoading && (
        <View style={styles.loaderOverlay}>
          <View style={styles.loaderContainer}>
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: spin,
                  },
                ],
              }}>
              <Ionicons
                name="sync-outline"
                size={40}
                color={selectedPaymentMethod === 'orangemoney' ? '#FF6600' : '#FFCC00'}
              />
            </Animated.View>
            <Text style={styles.loaderText}>Traitement en cours...</Text>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // Styles pour le reçu de paiement
  receiptContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  receiptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  receiptTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginLeft: 12,
  },
  receiptContent: {
    marginBottom: 20,
  },
  receiptItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  receiptLabel: {
    fontSize: 16,
    color: '#666',
  },
  receiptValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  receiptDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
  },
  receiptStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  receiptStatusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  receiptStatusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  receiptActions: {
    marginTop: 20,
  },
  receiptAction: {
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  receiptActionGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiptActionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  receiptSecondaryAction: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiptSecondaryActionText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },

  // Styles pour le processus par étapes
  nextButton: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
  },
  nextGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  processingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  processingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginTop: 24,
    marginBottom: 8,
  },
  processingSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },

  // Styles pour Mobile Money
  mobileMoneyContainer: {
    flex: 1,
  },
  mobileMoneyCard: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  mobileMoneyGradient: {
    padding: 20,
    height: 180,
    borderRadius: 16,
    justifyContent: 'space-between',
  },
  mobileMoneyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mobileMoneyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  mobileMoneyBody: {
    marginVertical: 20,
  },
  mobileMoneyLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  mobileMoneyValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  mobileMoneyFooter: {
    alignItems: 'flex-start',
  },
  mobileMoneyCode: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  mobileMoneyInfo: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  payButtonDisabled: {
    opacity: 0.6,
  },

  // Styles pour le popup
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popupContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  popupHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  popupBody: {
    padding: 20,
  },
  popupText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'center',
  },
  popupCode: {
    fontWeight: '700',
    color: '#FF6600',
  },
  popupFooter: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'center',
  },
  popupButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  popupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Styles pour le loader
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderText: {
    marginTop: 16,
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    marginBottom: 15,
  },
  progressFill: {
    height: 4,
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  activeStepCircle: {
    backgroundColor: '#4CAF50',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  activeStepNumber: {
    color: '#fff',
  },
  stepLabel: {
    fontSize: 12,
    color: '#999',
  },
  activeStepLabel: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  stepContent: {
    padding: 20,
    paddingBottom: 40,
  },
  methodsContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  paymentMethodSelected: {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.05)',
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  paymentMethodSubtitle: {
    fontSize: 13,
    color: '#999',
  },
  continueButton: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  continueGradient: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  cardFormContainer: {
    flex: 1,
  },
  cardPreview: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cardGradient: {
    padding: 20,
    height: 200,
    borderRadius: 16,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardChip: {
    width: 40,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 6,
  },
  cardNumberPreview: {
    fontSize: 22,
    fontWeight: '500',
    color: '#fff',
    letterSpacing: 2,
    textAlign: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  saveCardOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  saveCardText: {
    fontSize: 14,
    color: '#666',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  payButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  payGradient: {
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  confirmationContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  successIconContainer: {
    marginBottom: 24,
    borderRadius: 50,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  successIconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  confirmationSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  orderSummary: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 32,
  },
  orderSummaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  orderDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderDetailLabel: {
    fontSize: 14,
    color: '#666',
  },
  orderDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  returnButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  returnGradient: {
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  trackOrderButton: {
    paddingVertical: 16,
  },
  trackOrderText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
});
