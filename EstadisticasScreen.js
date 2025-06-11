import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const screenWidth = Dimensions.get('window').width;

const EstadisticasScreen = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    last7Days: [],
    emotions: {},
    dailyAverage: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (user) {
        // Obtener registros de los últimos 7 días
        const q = query(
          collection(db, 'users', user.uid, 'day_logs'),
          where('date', '>=', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
        );
        
        const querySnapshot = await getDocs(q);
        const logs = [];
        const emotionCount = {};
        let totalCigs = 0;
        let daysWithData = 0;
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          logs.push(data);
          
          // Contar emociones
          if (data.emotion) {
            emotionCount[data.emotion] = (emotionCount[data.emotion] || 0) + 1;
          }
          
          // Calcular promedio
          if (data.cigarettes) {
            totalCigs += data.cigarettes;
            daysWithData++;
          }
        });
        
        setStats({
          last7Days: logs,
          emotions: emotionCount,
          dailyAverage: daysWithData > 0 ? totalCigs / daysWithData : 0,
        });
      }
    };
    
    fetchStats();
  }, [user]);

  const prepareLineData = () => {
    const labels = ['Hoy-6', 'Hoy-5', 'Hoy-4', 'Hoy-3', 'Hoy-2', 'Ayer', 'Hoy'];
    const data = labels.map((_, index) => {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() - (6 - index));
      const log = stats.last7Days.find(l => 
        l.date && l.date.toDate().toDateString() === targetDate.toDateString()
      );
      return log ? log.cigarettes : 0;
    });
    
    return {
      labels,
      datasets: [{
        data,
        color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
        strokeWidth: 2,
      }],
    };
  };

  const preparePieData = () => {
    return Object.keys(stats.emotions).map(key => ({
      name: key,
      count: stats.emotions[key],
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus Estadísticas</Text>
      
      <Text style={styles.sectionTitle}>Consumo últimos 7 días</Text>
      <LineChart
        data={prepareLineData()}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#1976D2',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      
      <Text style={styles.sectionTitle}>Emociones asociadas</Text>
      {Object.keys(stats.emotions).length > 0 ? (
        <PieChart
          data={preparePieData()}
          width={screenWidth - 40}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : (
        <Text style={styles.noDataText}>No hay datos de emociones</Text>
      )}
      
      <Text style={styles.sectionTitle}>Promedio diario</Text>
      <Text style={styles.averageText}>{stats.dailyAverage.toFixed(1)} cigarrillos/día</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  noDataText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 20,
  },
  averageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default EstadisticasScreen;
