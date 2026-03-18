import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Dimensions, 
  StatusBar 
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const busAnim = useRef(new Animated.Value(-100)).current;
  const busOpacity = useRef(new Animated.Value(0)).current;
  const textRevealAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(busOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(busAnim, {
          toValue: width + 100, 
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(textRevealAnim, {
          toValue: 1,
          duration: 1500,
          delay: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setTimeout(onFinish, 1000);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      <View style={styles.logoWrapper}>
        <Text style={styles.valeText}>Vale</Text>
        <Animated.View style={{ opacity: textRevealAnim }}>
          <Text style={styles.busText}>Bus</Text>
        </Animated.View>
      </View>

      <Animated.View 
        style={[
          styles.busContainer, 
          { 
            transform: [{ translateX: busAnim }],
            opacity: busOpacity
          }
        ]}
      >
        <FontAwesome5 name="bus" size={40} color="white" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a3d1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#a3cc39',
  },
  busText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  busContainer: {
    position: 'absolute',
    top: '52%',
    left: 0,
  },
});

export default SplashScreen;