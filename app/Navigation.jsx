import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Import stack navigator for screen navigation
import SignupScreen from './screens/Signup'; // Import the Signup screen component
import LoginScreen from './screens/Login'; // Import the Login screen component
import MainContainer from './MainContainer'; // Import the tab navigator (MainContainer)

// Create a stack navigator instance
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Signup"> {/* Set the initial screen to "Signup" */}
      {/* Define the screens in the navigation stack */}
      <Stack.Screen name="Signup" component={SignupScreen} /> {/* Screen for user signup */}
      <Stack.Screen name="Login" component={LoginScreen} /> {/* Screen for user login */}
      <Stack.Screen name="Main" component={MainContainer} options={{ headerShown: false }} /> {/* Main screen with tabs, header hidden */}
    </Stack.Navigator>
  );
};

export default Navigation;
