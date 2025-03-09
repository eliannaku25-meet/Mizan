import React from 'react'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native'; // Import StyleSheet
import IndexScreen from './screens/index';
import Organizations from './screens/Organizations';
import MyRights from './screens/MyRights';
import MyCases from './screens/MyCases';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});

function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;
          if (route.name === 'Home') {
            iconSource = focused 
              ? require('../assets/images/Figma/Vector-1.png') // Active state
              : require('../assets/images/Figma/Vector (3).png'); // Inactive state
          } else if (route.name === 'Organizations') {
            iconSource = focused 
              ? require('../assets/images/Figma/Vector (1).png')
              : require('../assets/images/Figma/Vector-3.png');
          } else if (route.name === 'My Rights') {
            iconSource = focused 
              ? require('../assets/images/Figma/Vector (4).png')
              : require('../assets/images/Figma/Vector-2.png');
          } else if (route.name === 'My Cases') {
            iconSource = focused 
              ? require('../assets/images/Figma/Vector (2).png')
              : require('../assets/images/Figma/Vector.png');
          }

          // Use the styles from StyleSheet
          return <Image source={iconSource} style={styles.icon} />;
        },
        tabBarStyle: {
          backgroundColor: '#04445F', // Set background color of the tab bar
        },
        tabBarActiveTintColor: '#EAB82C', // Set active tab color
        tabBarInactiveTintColor: 'gray', // Set inactive tab color
      })}>
      <Tab.Screen name="Home" component={IndexScreen} />
      <Tab.Screen name="Organizations" component={Organizations} />
      <Tab.Screen name="My Rights" component={MyRights} />
      <Tab.Screen name="My Cases" component={MyCases} />
    </Tab.Navigator>
  );
}

export default MainContainer;
