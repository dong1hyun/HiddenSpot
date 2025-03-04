import React, { ReactNode } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

const ScreenContainer = ({ children }: {children: ReactNode}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white", // 배경색 유지
  },
  container: {
    flex: 1,
    paddingHorizontal: 20, // 좌우 여백 설정
    paddingVertical: 10, // 상하 여백 설정
  },
});

export default ScreenContainer;
