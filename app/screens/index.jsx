import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { config, database, account } from '../../lib/appwrite';  // Import the account module
import * as Location from "expo-location";
import Ionicons from 'react-native-vector-icons/Ionicons';  // Import the Ionicons icon library

const IndexScreen = () => {
  const [crimes, setCrimes] = useState([]);
  const [error, setError] = useState(null);
  const [crimeTitle, setCrimeTitle] = useState('');
  const [crimeDescription, setCrimeDescription] = useState('');
  const [crimeDate, setCrimeDate] = useState('');
  const [location, setLocation] = useState(null); // Store the location object
  const [region, setRegion] = useState(null); // Store the latitude and longitude
  const [user, setUser] = useState({ name: "John Doe" }); // Replace with actual user data

  useEffect(() => {
    init();
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

  // Function to fetch the current user's ID from Appwrite session
  const getUserID = async () => {
    try {
      const session = await account.getSession('current'); // Get current session
      return session.userId; // Return the user ID
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return null;
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

    const userId = await getUserID();  // Get the authenticated user's ID
    if (!userId) {
      Alert.alert("Error", "Could not fetch user ID.");
      return;
    }

    try {
      const response = await database.createDocument(
        config.db, 
        config.col.crimes, 
        'unique()', 
        {
          crime: crimeTitle,
          description: crimeDescription,
          date: crimeDate,
          latitude: location.latitude, 
          longitude: location.longitude, 
          victimID: userId,  // Include victimID field with the user ID
        }
      );

      Alert.alert("Success", "Your crime report has been submitted. Our team will review it and get back to you.");
      setCrimeTitle('');
      setCrimeDescription('');
      setCrimeDate('');
      setLocation(null);
      getData();

    } catch (error) {
      Alert.alert("Error", "Failed to submit crime report.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Blue banner */}
      <View style={styles.banner}>
        <Text style={styles.welcomeText}>Welcome, {user?.name || "User"}</Text>
      </View>

      {/* Report a Crime Section with custom icon */}
      <View style={styles.reportSection}>
        <Image source={require('../../assets/images/Figma/Vector (5).png')} style={styles.icon} />
        <Text style={styles.reportTitle}>Report a Crime</Text>
      </View>

      {/* Big Blue Form Box */}
      <View style={styles.formBox}>
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

        {/* Add Location Button with Icon */}
        <TouchableOpacity style={styles.locationButton} onPress={getUserLocation}>
          <Ionicons name="location-outline" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.locationButtonText}>Add Location</Text>
        </TouchableOpacity>

        {location && (
          <Text style={styles.locationText}>
            Location added: Latitude: {location.latitude}, Longitude: {location.longitude}
          </Text>
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  banner: {
    backgroundColor: "#04445E", // Blue banner
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    color: "#EAB82C",
    fontSize: 18,
    fontWeight: 'bold',
  },
  reportSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  reportTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#04445E', // Blue color for the text
  },
  formBox: {
    backgroundColor: "#04445E",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#8F8E8E', 
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    color: '#fff',
    fontSize: 16,
  },
  description: {
    height: 120,
    textAlignVertical: 'top',
  },
  locationButton: {
    backgroundColor: '#EAB82C',
    padding: 12,
    borderRadius: 5,
    justifyContent: 'center',
    flexDirection: 'row', // Align icon and text in a row
    marginBottom: 10,
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10, // Space between the icon and the text
  },
  locationText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#04445E',
  },
});

export default IndexScreen;
