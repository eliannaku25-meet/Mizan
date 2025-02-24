import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { config, database } from '../../lib/appwrite';
import CardComponent from '../components/Card';  // Assuming CardComponent is in 'components' folder
import BadgeComponent from '../components/Badge';  // A custom badge component

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const { documents } = await database.listDocuments(config.db, config.col.crimes); // Use config.col.crimes
      const formattedCases = documents.map(doc => ({
        id: doc.$id,
        crimeTitle: doc.crime,
        crimeDescription: doc.description,
        crimeDate: doc.date,
        status: "Pending", // Default status until further updates
      }));
      setCases(formattedCases);
    } catch (error) {
      setError(error.message);
    }
  };
  
  // Function to determine badge color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "Under Review":
        return "#FCD34D"; // Yellow
      case "In Progress":
        return "#60A5FA"; // Blue
      case "Pending":
        return "#D1D5DB"; // Gray
      default:
        return "#D1D5DB";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pending Cases</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={cases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardComponent title={item.crimeTitle} description={item.crimeDescription}>
            <View style={styles.cardFooter}>
              <Text style={styles.dateText}>Filed: {item.crimeDate}</Text>
              <BadgeComponent text={item.status} color={getStatusColor(item.status)} />
            </View>
          </CardComponent>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  cardFooter: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 5,
  },
});

export default Cases;
