import "react-native-reanimated";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { PlaceType } from "../../lib/type";
import { fetchPlace, getAddress, getNearbyPlace } from "../../util/map";
import { FlatList } from "react-native-gesture-handler";
import NearbyPlaceItem from "../molecules/NearbyPlaceItem";
import MapView from "react-native-maps";
import { useMapContext } from "../../context/MapContext";

export default function BottomSlider({ mapRef }: { mapRef: React.RefObject<MapView> }) {
  const { query, setQuery, location, setLocation, setAddress } = useMapContext();
  const getPlaceData = async () => {
    try {
      const newLocation = await fetchPlace(query);
      if (newLocation) {
        setLocation(newLocation);
        mapRef?.current?.animateToRegion({
          ...newLocation,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
        const address = await getAddress(newLocation);
        if (address) setAddress(address);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const [places, setPlaces] = useState<PlaceType[]>();

  useEffect(() => {
    getNearbyPlace(location)
      .then((result) => {
        setPlaces(result);
      })
  }, [location]);

  return (
    <BottomSheet
      style={styles.container}
      snapPoints={["25%", "50%", "80%"]}
      onChange={handleSheetChanges}
    >
      <BottomSheetView style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          placeholder="장소를 검색하세요"
          onChangeText={setQuery}
          value={query}
          onSubmitEditing={getPlaceData}
        />
        {places ? <FlatList
          contentContainerStyle={styles.scrollContainer}
          data={places}
          keyExtractor={((item) => item.placeName)}
          renderItem={(itemData) => (
            <NearbyPlaceItem
              photoUrl={itemData.item.photoUrl}
              placeName={itemData.item.placeName}
              location={itemData.item.location}
              formattedAddress={itemData.item.formattedAddress}
            />
          )}
        >
        </FlatList> :
          <Text></Text>
        }
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ecf0f1",
    borderRadius: 16,
    margin: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
  },
  scrollContainer: {
    justifyContent: "flex-start",
    gap: 30
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
});
