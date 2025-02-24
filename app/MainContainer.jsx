import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import IndexScreen from './screens/index'; // Create IndexScreen.js
import Organizations from './screens/Organizations.jsx';
import MyRights from './screens/MyRights';
import MyCases from './screens/MyCases';


// Screen names
const indexName = "Home";
const OrganizationsName = "Organizations";
const MyRightsName = "My rights";
const MyCasesName = "My cases";


const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
      <Tab.Navigator
        initialRouteName={indexName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === indexName) {
              iconName = focused ? 'home' : 'home-outline'; // Icon for the Index screen
            } else if (rn === OrganizationsName) {
              iconName = focused ? 'baker' : 'baker-outline';
            } else if (rn === MyRightsName) {
              iconName = focused ? 'storefront' : 'storefront-outline';
            } else if (rn === MyCasesName) {
              iconName = focused ? 'cart' : 'cart-outline';
            }

            // Return the tab icon
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 },
        }}>

        {/* Index Screen */}
        <Tab.Screen name={indexName} component={IndexScreen} />

        {/* Bakery Screens */}
        <Tab.Screen name={OrganizationsName} component={Organizations} />
        <Tab.Screen name={MyRightsName} component={MyRights} />
        <Tab.Screen name={MyCasesName} component={MyCases} />


      </Tab.Navigator>

  );
}

export default MainContainer;
