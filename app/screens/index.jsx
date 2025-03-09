import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {config, database} from '../../lib/appwrite'
import * as Location from "expo-location";

const IndexScreen = () => {
  const [crimes, setCrimes] = useState([]);
  const [error, setError] = useState(null);
  const [crimeTitle, setCrimeTitle] = useState('');
  const [crimeDescription, setCrimeDescription] = useState('');
  const [crimeDate, setCrimeDate] = useState('');
  const [location, setLocation] = useState(null); // Store the location object
  const [region, setRegion] = useState(null); // Store the latitude and longitude

  useEffect(() => {
    init(); // Make sure to call init()
  }, []);

  const init = async () => {
    getData();
  };

  const getData = async () => {
    try {
      const { documents, total } = await database.listDocuments(config.db, config.col.crimes);
      setCrimes(documents);
      console.log(documents);
    } catch (error) {
      setError(error);
    }
  };

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
    setLocation(location.coords); // Save the location coordinates
  };

  const handleSubmit = async () => {
    if (!crimeTitle || !crimeDescription || !crimeDate || !location) {
      Alert.alert("Error", "Please fill in all fields before submitting.");
      return;
    }
  
    try {
      const response = await database.createDocument(
        config.db, // Database ID
        config.col.crimes, // Collection ID
        'unique()', // Generate a unique document ID
        {
          crime: crimeTitle,
          description: crimeDescription,
          date: crimeDate,
          latitude: location.latitude, // Save latitude
          longitude: location.longitude, // Save longitude
        }
      );
  
      Alert.alert("Success", "Your crime report has been submitted. Our team will review it and get back to you.");
  
      // Clear the input fields after successful submission
      setCrimeTitle('');
      setCrimeDescription('');
      setCrimeDate('');
      setLocation(null); // Clear location field
  
      // Refresh the data
      getData();
  
    } catch (error) {
      Alert.alert("Error", "Failed to submit crime report.");
      console.error(error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Report an Unresolved Crime</Text>
      {error && (<Text>{JSON.stringify(error)}</Text>)}

      <TextInput
        style={styles.input}
        placeholder="Crime Title"
        value={crimeTitle}
        onChangeText={setCrimeTitle}
      />

      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Describe the crime"
        multiline
        value={crimeDescription}
        onChangeText={setCrimeDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Date of Incident (YYYY-MM-DD)"
        value={crimeDate}
        onChangeText={setCrimeDate}
      />

      <TouchableOpacity style={styles.locationButton} onPress={getUserLocation}>
        <Text style={styles.locationButtonText}>Add Location</Text>
      </TouchableOpacity>

      {location && (
        <Text style={styles.locationText}>
          Location added: Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  description: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  locationIcon: {
    marginRight: 10,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#2563EB',
    textAlign: 'center',
  },
});

export default IndexScreen;
