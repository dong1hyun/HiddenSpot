import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Spinner = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      {
        isLoading ?
          <View style={styles.container}>
            <ActivityIndicator size="large" color="black" />
          </View> :
          null
      }
    </>
  )
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
