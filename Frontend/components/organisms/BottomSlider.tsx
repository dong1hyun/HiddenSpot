import "react-native-reanimated";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { LocationType, PlaceType } from "../../lib/type";
import { getNearbyPlace } from "../../util/map";
import { FlatList } from "react-native-gesture-handler";
import NearbyPlaceItem from "../molecules/NearbyPlaceItem";

interface Props {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  getPlaceData: () => void;
  location: LocationType
}

export default function BottomSlider({ query, setQuery, getPlaceData, location }: Props) {
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const [places, setPlaces] = useState<PlaceType[]>();

  useEffect(() => {
    getNearbyPlace(location)
      .then((result) => {
        console.log(result);
        setPlaces(result);
      })
  }, [location]);

  return (
    <BottomSheet
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
        <FlatList
          contentContainerStyle={styles.scrollContainer}
          data={places}
          keyExtractor={((item) => item.placeName)}
          renderItem={(itemData) => (
            <NearbyPlaceItem photoUrl={itemData.item.photoUrl} placeName={itemData.item.placeName} location={itemData.item.location} />
          )}
        >
        </FlatList>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
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
