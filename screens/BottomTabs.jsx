import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "./Homepage";
import RandomScreen from "./RandomScreen";
import ProfileScreen from "./ProfileScreen";
import { Entypo, FontAwesome } from "@expo/vector-icons";

export default function BottomTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Entypo
                name="home"
                size={24}
                color={focused ? "black" : "gray"}
              />
            );
          },
        }}
        name="Homepage"
        component={Homepage}
      />
      <Tab.Screen
        name="RandomScreen"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="random"
                size={24}
                color={focused ? "black" : "gray"}
              />
            );
          },
        }}
        component={RandomScreen}
      />
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="user"
                size={24}
                color={focused ? "black" : "gray"}
              />
            );
          },
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
