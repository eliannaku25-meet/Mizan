import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { config, database, account } from '../../lib/appwrite';
import CardComponent from '../components/Card';

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [error, setError] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    fetchUserID();
  }, []);

  const fetchUserID = async () => {
    try {
      const session = await account.getSession('current');
      setUserID(session.userId);
      fetchCases(session.userId);
    } catch (error) {
      setError("Error fetching user session.");
    }
  };

  const fetchCases = async (userId) => {
    try {
      const { documents } = await database.listDocuments(config.db, config.col.crimes);
      const filteredCases = documents.filter(doc => doc.victimID === userId);
      const formattedCases = filteredCases.map(doc => ({
        id: doc.$id,
        crimeTitle: doc.crime,
        crimeDescription: doc.description,
        crimeDate: doc.date,
        status: "In Progress",
      }));
      setCases(formattedCases);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Cases</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={cases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardComponent 
            title={item.crimeTitle} 
            description={item.crimeDescription} 
            status={item.status} 
          />
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
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 50,
    backgroundColor: '#04445E',
    color: 'white',
    paddingVertical: 40,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Cases;
