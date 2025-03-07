import { GOOGLE_MAPS_API_KEY } from "@env";
import { useRef, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import 'react-native-get-random-values';

export default function MapScreen() {
    const [location, setLocation] = useState({
        latitude: 37.5665,
        longitude: 126.9780, // 기본 위치 (서울)
      });
      const [query, setQuery] = useState("");
      const mapRef = useRef<MapView>(null);
    
      const fetchPlaces = async () => {
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${GOOGLE_MAPS_API_KEY}`;
    
        try {
          const response = await fetch(url);
          const data = await response.json();
    
          if (data?.results?.length > 0) {
            const place = data.results[0];
            const newLocation = {
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            };
    
            setLocation(newLocation);
    
            // 검색한 위치로 지도 이동
            mapRef?.current?.animateToRegion({
              ...newLocation,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            });
          }
        } catch (error) {
          console.error("Error fetching places:", error);
        }
      };
    
      const onMapPress = (e: MapPressEvent) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setLocation({ latitude, longitude });
      };
    
      return (
        <View style={{ flex: 1 }}>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
            placeholder="장소를 검색하세요"
            onChangeText={setQuery}
            value={query}
          />
          <Button title="검색" onPress={fetchPlaces} />
    
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 37.5665,
              longitude: 126.9780,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            onPress={onMapPress}
          >
            <Marker coordinate={location} title="검색된 장소" />
          </MapView>
        </View>
      );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: "100%",
      height: "100%",
    },
  });