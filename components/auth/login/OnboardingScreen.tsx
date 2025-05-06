import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Stepper from './Stepper';
import LoginForm from './login';

const { width, height } = Dimensions.get('window');

const OnboardingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    setShowLogin(true);
  };

  const renderStep = () => {
    if (showLogin) {
      return <LoginForm 
        onGoogleLogin={() => router.replace('/home')}
        onAppleLogin={() => console.log('Apple login')}
        onEmailLogin={() => console.log('Email login')}
      />;
    }

    switch (currentStep) {
      case 1:
        return <Step1 onNext={handleNext} />;
      case 2:
        return <Step2 onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Step3 onFinish={handleFinish} onBack={handleBack} />;
      default:
        return <Step1 onNext={handleNext} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {!showLogin && (
        <View style={styles.stepperContainer}>
          <Stepper steps={3} currentStep={currentStep} />
        </View>
      )}
      
      {renderStep()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  stepperContainer: {
    paddingTop: height * 0.05,
  }
});

export default OnboardingScreen; 