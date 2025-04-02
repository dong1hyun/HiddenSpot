import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface MyLocationMarkerProps {
  latitude: number;
  longitude: number;
}

export default function MyLocationMarker({ latitude, longitude }: MyLocationMarkerProps) {
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    opacityAnim.setValue(1);

    Animated.loop(
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();
  }, [latitude, longitude]);

  return (
    <Marker coordinate={{ latitude, longitude }} title="내 위치">
      <Animated.View style={[styles.pulse, { opacity: opacityAnim }]} />
      <MaterialCommunityIcons style={styles.me} name="human-greeting" />
    </Marker>
  );
}

const styles = StyleSheet.create({
  me: {
    fontSize: 24,
    color: "#0984e3",
    backgroundColor: "rgba(255, 255, 0, 0.44)",
    borderRadius: 24,
    padding: 4,
  },
  pulse: {
    position: "absolute",
    width: 30,
    height: 30,
    backgroundColor: "rgba(255, 255, 0, 0.5)",
    borderRadius: 24,
  },
});
