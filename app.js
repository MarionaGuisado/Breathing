import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import EstadisticasScreen from './screens/EstadisticasScreen';
import RegistroScreen from './screens/RegistroScreen';
import { AuthProvider } from './context/AuthContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Inicio') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Estadísticas') {
                iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              } else if (route.name === 'Registro') {
                iconName = focused ? 'create' : 'create-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#2E7D32',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Inicio" component={HomeScreen} />
          <Tab.Screen name="Registro" component={RegistroScreen} />
          <Tab.Screen name="Estadísticas" component={EstadisticasScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
