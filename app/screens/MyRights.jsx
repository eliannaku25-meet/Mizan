import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"; 
import * as Location from "expo-location";
import axios from "axios";

const PlacesMap = () => {
  const [places, setPlaces] = useState([]);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    const getUserLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Enable location services to use this feature.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    };

    const fetchPlaces = async () => {
      const categories = ["police", "hospital", "shelter"];
      let allResults = [];

      try {
        for (const category of categories) {
          const url = 'https: nominatim.openstreetmap.org/search?q=${category}&format=json&countrycodes=IL;'
          const response = await axios.get(url);
          allResults = [...allResults, ...response.data];
        }

        const formattedPlaces = allResults.map((place) => ({
          lat: parseFloat(place.lat),
          lon: parseFloat(place.lon),
          name: place.display_name.split(",")[0], // Shorten name
          address: place.display_name,
        }));

        console.log("Fetched Places:", formattedPlaces);
        setPlaces(formattedPlaces);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchPlaces();
    getUserLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Resources in Your Area</Text>
      </View>

      {region ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE} // ✅ Use Google Maps provider
          region={region}
          showsUserLocation
          showsMyLocationButton
        >
          {places.map((place, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: place.lat, longitude: place.lon }}
              title={place.name}
              pinColor={
                place.name.toLowerCase().includes("police")
                  ? "blue"
                  : place.name.toLowerCase().includes("hospital")
                  ? "red"
                  : "green"
              }
            />
          ))}
        </MapView>
      ) : (
        <Text>Loading map...</Text>
      )}

      {/* Legend */}
      <View style={styles.legendContainer}>
        <Text style={[styles.legendText, { color: "blue" }]}>Police</Text>
        <Text style={[styles.legendText, { color: "red" }]}>Hospital</Text>
        <Text style={[styles.legendText, { color: "green" }]}>Shelter</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 40,
    left: 10,
    right: 10,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 8,
    zIndex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  map: {
    flex: 1,
  },
  legendContainer: {
    position: "absolute",
    bottom: 20,
    right: 10,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 8,
    zIndex: 1,
  },
  legendText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default PlacesMap;