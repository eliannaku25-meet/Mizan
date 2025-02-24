import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CardComponent = ({ title, description, category, children }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.description}>{description}</Text>
      {children} {/* This allows dynamic elements (badges, buttons, etc.) inside the card */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    backgroundColor: '#E0F2FE',
    color: '#0284C7',
    padding: 5,
    borderRadius: 12,
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 10,
  },
});

export default CardComponent;
