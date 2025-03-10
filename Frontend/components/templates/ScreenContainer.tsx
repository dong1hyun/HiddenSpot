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
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default ScreenContainer;
