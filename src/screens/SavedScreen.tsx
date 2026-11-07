import MovieCard from "@/components/movieCard";
import useMovies from "@/context/MoviesContext";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";

export default function SavedScreen() {
  const { favorite } = useMovies();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved</Text>
        <Ionicons name="search" size={22} />
      </View>
      <FlatList
        data={favorite}
        keyExtractor={(item) => item.id}
        style={styles.flatlist}
        renderItem={({ item }) => (
          <MovieCard item={item} isFavoritePage={true} />
        )}
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
            <Text>Don't Have Movie</Text>
          </View>
        }
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
  title: {
    fontWeight: 600,
    fontSize: 22,
  },
  flatlist: {
    width: "100%",
    paddingVertical: 10,
  },
});
