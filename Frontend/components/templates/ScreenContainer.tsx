import React, { ReactNode } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";

const ScreenContainer = ({ children, style }: { children: ReactNode, style?: object }) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <ScrollView>
        <View style={styles.container}>{children}</View>
      </ScrollView>
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
