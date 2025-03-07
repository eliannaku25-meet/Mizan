import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IndexScreen from './screens/index';
import Organizations from './screens/Organizations';
import MyRights from './screens/MyRights';
import MyCases from './screens/MyCases';

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Organizations') {
            iconName = focused ? 'business' : 'business-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={IndexScreen} />
      <Tab.Screen name="Organizations" component={Organizations} />
      <Tab.Screen name="My Rights" component={MyRights} />
      <Tab.Screen name="My Cases" component={MyCases} />
    </Tab.Navigator>
  );
}

export default MainContainer;
