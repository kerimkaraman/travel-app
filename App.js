import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "./AppNavigation";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "react-native-get-random-values";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
      <StatusBar style="auto" />
    </Provider>
  );
}
