import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView } from "react-native";
import Constants from "expo-constants";
import Home from "./Home";
import DriverInfo from "./DriverInfo";
import LastResults from "./LastResults";

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: Constants.statusBarHeight
      }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Drivers" component={Home} />
          <Stack.Screen name="Driver Info" component={DriverInfo} />
          <Stack.Screen name="Last Race" component={LastResults} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
