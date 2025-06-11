import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AvatarSalud = ({ diasSinFumar }) => {
  const getPulmonColor = () => {
    if (diasSinFumar < 7) return '#D32F2F'; // Rojo
    if (diasSinFumar < 30) return '#FFA000'; // Naranja
    if (diasSinFumar < 90) return '#1976D2'; // Azul
    return '#2E7D32'; // Verde
  };

  const getPulmonSize = () => {
    const baseSize = 100;
    const additionalSize = Math.min(50, diasSinFumar * 0.5);
    return baseSize + additionalSize;
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.pulmon,
        { 
          backgroundColor: getPulmonColor(),
          width: getPulmonSize(),
          height: getPulmonSize(),
        }
      ]}>
        <Text style={styles.pulmonText}>{diasSinFumar}</Text>
      </View>
      <Text style={styles.label}>Tu salud mejora cada día</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  pulmon: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  pulmonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
});

export default AvatarSalud;
