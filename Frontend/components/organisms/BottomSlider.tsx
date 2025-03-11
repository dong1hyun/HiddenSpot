import "react-native-reanimated";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { PlaceType } from "../../lib/type";
import { FlatList } from "react-native-gesture-handler";
import NearbyPlaceItem from "../molecules/NearbyPlaceItem";
import MapView from "react-native-maps";
import { useMapContext } from "../../context/MapContext";
import { fetchSearchPlace } from "../../util/map";

export default function BottomSlider({ mapRef }: { mapRef: React.RefObject<MapView> }) {
  const { query, setQuery, location, setLocation, setAddress } = useMapContext();
  const [places, setPlaces] = useState<PlaceType[]>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  
  const getSearchPlaces = async () => {
    try {
      const places = await fetchSearchPlace(query);
      if(places) setPlaces(places);
    } catch(error) {
      console.error(error);
    }
  };

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleFocus = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(2);
    }
  };

  useEffect(() => {
    if (!query) {
      setPlaces([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      getSearchPlaces();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);
  return (
    <BottomSheet
      ref={bottomSheetRef}
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
          onPressIn={handleFocus}
        />
        {places ? <FlatList
          contentContainerStyle={styles.scrollContainer}
          data={places}
          keyExtractor={((_, index) => index.toString())}
          renderItem={(itemData) => (
            <NearbyPlaceItem
              mapRef={mapRef}
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
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    margin: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#c1c1c1",
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 16
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