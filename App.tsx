import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import { RootStackParamList } from "./src/types/navigation";
import { InputScreen } from "./src/screens/InputScreen";
import { ListScreen } from "./src/screens/ListScreen";
import { ChartScreen } from "./src/screens/ChartScreen";
import { initDatabase } from "./src/utils/db";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

const Stack = createNativeStackNavigator<RootStackParamList>();

const BottomNav = ({ navigation, currentRoute }: any) => (
  <View style={styles.bottomNav}>
    {["Input", "List", "Chart"].map((route) => (
      <TouchableOpacity
        key={route}
        style={[
          styles.navButton,
          currentRoute === route && styles.activeNavButton,
        ]}
        onPress={() => navigation.navigate(route)}
      >
        <Text
          style={[
            styles.navText,
            currentRoute === route && styles.activeNavText,
          ]}
        >
          {route}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default function App() {
  useEffect(() => {
    initDatabase().catch(console.error);
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Input"
          screenOptions={({ navigation, route }) => ({
            headerStyle: {
              backgroundColor: "#6200ee",
            },
            headerTintColor: "#fff",
            headerTitle: route.name,
            contentStyle: {
              paddingBottom: 60, // Space for bottom nav
            },
          })}
        >
          <Stack.Screen
            name="Input"
            component={InputScreen}
            options={{ title: "Add Reading" }}
          />
          <Stack.Screen
            name="List"
            component={ListScreen}
            options={{ title: "History" }}
          />
          <Stack.Screen
            name="Chart"
            component={ChartScreen}
            options={{ title: "Trends" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navButton: {
    flex: 1,
    padding: 12,
    alignItems: "center",
  },
  activeNavButton: {
    backgroundColor: "#f0f0f0",
  },
  navText: {
    color: "#666",
  },
  activeNavText: {
    color: "#6200ee",
    fontWeight: "bold",
  },
});
