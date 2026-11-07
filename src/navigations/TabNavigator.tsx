import { Tabs } from "expo-router";
import { Fontisto, Ionicons } from "@expo/vector-icons";

export default function TabNavigator() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#165aed",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 90,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={focused ? "#165aed" : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="add"
              size={size}
              color={focused ? "#165aed" : "gray"}
            />
          ),
          tabBarStyle:{
            display:"none"
          }
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ focused, size }) => (
            <Fontisto
              name="favorite"
              size={size}
              color={focused ? "#165aed" : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="person"
              size={size}
              color={focused ? "#165aed" : "gray"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
