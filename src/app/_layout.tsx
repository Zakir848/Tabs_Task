import { MovieProvider } from "@/context/MoviesContext";
import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <MovieProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="details" />
        <Stack.Screen name="add" />
      </Stack>
    </MovieProvider>
  );
}
