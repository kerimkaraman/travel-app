import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "./Homepage";
import RandomScreen from "./RandomScreen";
import ProfileScreen from "./ProfileScreen";

export default function BottomTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Homepage" component={Homepage} />
      <Tab.Screen name="RandomScreen" component={RandomScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
