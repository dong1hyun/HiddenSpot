import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useRef, useState } from "react";
import MapView, { MapPressEvent } from "react-native-maps";
import { LocationType } from "../lib/type";

interface MapContextType {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    location: LocationType | null;
    setLocation: Dispatch<SetStateAction<LocationType | null>>;
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    address: string;
    setAddress: Dispatch<SetStateAction<string>>;
    onMarkerPress: () => void;
    onMapPress: (e: MapPressEvent) => void;
    mapRef: React.RefObject<MapView>;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export default function MapProvider({ children }: { children: ReactNode }) {
    const [location, setLocation] = useState<LocationType | null>(null);
    const [query, setQuery] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [address, setAddress] = useState("");
    const onMarkerPress = () => {
        setModalVisible(true)
    }
    const onMapPress = (e: MapPressEvent) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setLocation({ latitude, longitude });
    };
    const mapRef = useRef<MapView>(null);

    return (
        <MapContext.Provider value={{
            location,
            setLocation,
            query,
            setQuery,
            onMapPress,
            modalVisible,
            setModalVisible,
            onMarkerPress,
            address,
            setAddress,
            mapRef
        }}>
            {children}
        </MapContext.Provider>
    );
};


export const useMapContext = () => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error('컨텍스트가 존재하지 않습니다.');
    }
    return context;
};