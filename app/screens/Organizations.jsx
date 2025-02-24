import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CardComponent from '../components/Card';  // Import the reusable Card component

const Organizations = () => {
  const organizations = [
    {
      name: "Legal Aid Society",
      description: "Provides free legal assistance to victims of crimes.",
      contact: "+972-XX-XXXXXXX",
      category: "Legal",
    },
    {
      name: "Victim Support Center",
      description: "24/7 support and counseling for crime victims.",
      contact: "+972-XX-XXXXXXX",
      category: "Support",
    },
    {
      name: "Citizens' Rights Association",
      description: "Advocacy and support for civil rights.",
      contact: "+972-XX-XXXXXXX",
      category: "Advocacy",
    },
    {
      name: "Community Legal Clinic",
      description: "Free legal consultations and representation.",
      contact: "+972-XX-XXXXXXX",
      category: "Legal",
    }
  ];

  // Custom action for the button press


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Support Organizations</Text>
      {organizations.map((org, index) => (
        <CardComponent
          key={index}
          title={org.name}
          category={org.category}
          description={org.description}
          contact={org.contact}
          onButtonPress={() => handleButtonPress(org.name)}  // Pass the button action
        />
      ))}
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
});

export default Organizations;
