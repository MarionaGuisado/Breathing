import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

const ModalSOS = ({ visible, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [step, setStep] = useState(1);
  
  const tips = [
    "Respira profundamente 3 veces",
    "Bebe un vaso de agua",
    "Llama a un amigo",
    "Sal a caminar 5 minutos",
    "Come un snack saludable"
  ];

  const handleComplete = () => {
    if (step < 5) {
      setStep(step + 1);
      return { shouldRepeat: true, delay: 0.5 };
    }
    return { shouldRepeat: false };
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>MODO SOS - Distráete</Text>
          
          <View style={styles.timerContainer}>
            <CountdownCircleTimer
              isPlaying={isPlaying}
              duration={60}
              colors={['#2E7D32', '#FFA000', '#D32F2F']}
              colorsTime={[60, 30, 0]}
              onComplete={handleComplete}
              size={150}
            >
              {({ remainingTime }) => (
                <Text style={styles.timerText}>{remainingTime}</Text>
              )}
            </CountdownCircleTimer>
          </View>
          
          <Text style={styles.tipText}>{tips[step - 1]}</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => setIsPlaying(!isPlaying)}
            >
              <Text style={styles.buttonText}>
                {isPlaying ? 'Pausar' : 'Continuar'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.closeButton]} 
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 20,
  },
  timerContainer: {
    marginVertical: 20,
  },
  timerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  tipText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#1976D2',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#D32F2F',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ModalSOS;
