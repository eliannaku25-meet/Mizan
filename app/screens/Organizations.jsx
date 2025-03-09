import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BakeryFour = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bakery Four</Text>
      <Text style={styles.review}>Perfectly balanced jelly and dough with excellent flavor!</Text>
      <Text style={styles.rating}>Rating: 4.8/5</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  review: {
    fontSize: 16,
    marginVertical: 10,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BakeryFour;
