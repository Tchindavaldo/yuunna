import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

interface StepperProps {
  steps: number;
  currentStep: number;
  activeColor?: string;
  inactiveColor?: string;
}

const { width } = Dimensions.get('window');
const stepIndicatorWidth = width * 0.1;
const stepSpacing = width * 0.05;

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  activeColor = '#FF5733',
  inactiveColor = '#E1E1E1'
}) => {
  const renderStepIndicators = () => {
    const indicators = [];
    
    for (let i = 0; i < steps; i++) {
      const isActive = i <= currentStep - 1;
      
      // Style avancé pour les indicateurs
      indicators.push(
        <View key={i} style={styles.stepIndicatorWrapper}>
          <View 
            style={[
              styles.stepIndicator, 
              { 
                backgroundColor: isActive ? activeColor : inactiveColor,
                width: isActive ? stepIndicatorWidth : stepIndicatorWidth * 0.6,
                height: isActive ? 10 : 8,
                opacity: isActive ? 1 : 0.5,
                transform: [{ scale: isActive ? 1 : 0.9 }]
              }
            ]}
          />
          {i < steps - 1 && (
            <View 
              style={[
                styles.stepConnector,
                {
                  backgroundColor: i < currentStep - 1 ? activeColor : inactiveColor,
                  opacity: i < currentStep - 1 ? 0.5 : 0.2,
                }
              ]}
            />
          )}
        </View>
      );
    }
    
    return indicators;
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        {renderStepIndicators()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  stepIndicatorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIndicator: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: stepSpacing / 3,
    shadowColor: "#FF5733",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    elevation: 3,
  },
  stepConnector: {
    width: stepSpacing,
    height: 2,
    backgroundColor: '#E1E1E1',
  }
});

export default Stepper; 