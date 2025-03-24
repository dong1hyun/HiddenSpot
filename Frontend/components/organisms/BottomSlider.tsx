import "react-native-reanimated";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { PlaceType } from "../../lib/type";
import { useMapContext } from "../../context/MapContext";
import { fetchSearchPlace } from "../../util/map";
import RecommendatedPlace from "../molecules/RecommendatedPlace";
import SearchedPlace from "../molecules/SearchedPlace";
import Feather from "react-native-vector-icons/Feather";

export default function BottomSlider() {
  const { query, setQuery } = useMapContext();
  const [places, setPlaces] = useState<PlaceType[]>();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const getSearchPlaces = async () => {
    try {
      const places = await fetchSearchPlace(query);
      if (places) setPlaces(places);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
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

  const onDeletePress = () => {
    setQuery("");
  }
  return (
    <BottomSheet
      ref={bottomSheetRef}
      style={styles.container}
      snapPoints={["25%", "50%", "80%"]}
      onChange={handleSheetChanges}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="장소를 검색하세요"
            onChangeText={setQuery}
            value={query}
            onPressIn={handleFocus}
            numberOfLines={1}
          />
          <Feather
            style={styles.deleteIcon}
            name="delete"
            onPress={onDeletePress}
          />
        </View>
        {places && places.length > 0 ?
          <SearchedPlace places={places} />
          :
          <RecommendatedPlace />
        }
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {

  },
  deleteIcon: {
    position: "absolute",
    fontSize: 20,
    right: 15,
    top: 10,
    color: "gray",
    paddingHorizontal: 5,
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
    paddingHorizontal: 16,
    paddingRight: 50,
  }
});