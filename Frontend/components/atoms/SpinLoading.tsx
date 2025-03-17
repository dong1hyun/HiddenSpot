import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Spinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fdcb6e" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',  
    left: '50%', 
    transform: [
      { translateX: -25 },
      { translateY: -25 }, 
    ],
    zIndex: 1,
  },
});

export default Spinner;
