import MovieCard from "@/components/movieCard";
import useMovies from "@/context/MoviesContext";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, Image, Pressable, StatusBar, Text } from "react-native";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const { movies } = useMovies();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 22, fontWeight: 600 }}>Movies</Text>
        <Ionicons name="search" size={22} />
      </View>
      <FlatList
        data={movies}
        style={styles.flatlist}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={
          <View
            style={{
              backgroundColor: "#d3d3d3",
              marginVertical: 15,
              height: 1,
            }}
          />
        }
        ListEmptyComponent={
          <View style={styles.container}>
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>
              Dont have movies
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <MovieCard item={item} isFavoritePage={false} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
  },
  flatlist: {
    width: "100%",
    paddingVertical: 10,
  },
});
