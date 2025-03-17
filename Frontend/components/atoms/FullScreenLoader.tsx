import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const FullScreenLoader = ({ loading }: {loading: boolean}) => {
  if (!loading) return null; // 로딩 중이 아닐 경우 렌더링 안 함

  return (
    <View style={styles.overlay}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>로딩 중...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute', // 화면 전체를 덮음
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명한 오버레이
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // 최상위에 배치
  },
  loaderContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 더 진한 배경으로 가독성 증가
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
});

export default FullScreenLoader;
