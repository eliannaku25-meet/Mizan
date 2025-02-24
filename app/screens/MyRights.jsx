import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

const PoliceStationsMap = () => {
  const [policeStations, setPoliceStations] = useState([]);
  const [region, setRegion] = useState({
    latitude: 32.0853, // Example: Tel Aviv
    longitude: 34.7818,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    const fetchPoliceStations = async () => {
      const url = `https://nominatim.openstreetmap.org/search?q=police&format=json&countrycodes=IL`;

      try {
        const response = await axios.get(url);
        setPoliceStations(response.data);
      } catch (error) {
        console.error("Error fetching police stations:", error);
      }
    };

    fetchPoliceStations();
  }, []);

  return (
    <MapView style={styles.map} initialRegion={region}>
      {policeStations.map((station, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: parseFloat(station.lat),
            longitude: parseFloat(station.lon),
          }}
          title={station.display_name.split(",")[0]}
          description={station.display_name}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default PoliceStationsMap;
