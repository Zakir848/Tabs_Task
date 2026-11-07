import useMovies from "@/context/MoviesContext";
import { Entypo, Feather, Fontisto, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { movies, toggleFavorite, favorite } = useMovies();

  const movie = movies.find((m) => m.id === id);
  const isFavorite = favorite.some((m) => m.id === id);

  if (!movie) return;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#011727",
        paddingTop: StatusBar.currentHeight,
      }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <LinearGradient
          colors={["transparent", "#011727"]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={styles.absoluteFillObject}
        />

        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color={"#ffffff"} />
        </Pressable>

        <Text style={styles.headerText}>Movie Details</Text>
      </View>
      <View style={{ height: 400 }}>
        <Image
          source={{ uri: movie.imageUrl }}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        />

        <LinearGradient
          colors={["transparent", "rgba(1,23,39,0.5)", "#011727"]}
          locations={[0, 0.55, 1]}
          style={styles.absoluteFillObject}
        />
      </View>
      <View style={styles.detailsBox}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 10,
          }}
        >
          <View style={{ gap: 10 }}>
            <Text style={styles.title}>{movie?.name}</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              {movie?.tags.map((tag) => (
                <Text key={tag} style={styles.tag}>
                  {tag}
                </Text>
              ))}
            </View>
          </View>
          <TouchableOpacity onPress={() => toggleFavorite(movie)}>
            <Fontisto
              name="favorite"
              color={isFavorite ? "#7b47c9" : "#ffffff"}
              size={25}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.boxRow}>
          <View style={styles.ratingBox}>
            <View style={styles.rating}>
              <Ionicons name="star" color={"orange"} size={20} />
              <Text style={styles.text}>{movie?.imdbRating}</Text>
            </View>
            <Text style={styles.ratingText}>IMDb</Text>
          </View>
          <View style={styles.ratingBox}>
            <View style={styles.rating}>
              <Image
                source={require("@/assets/images/tomato.png")}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
              <Text style={styles.text}>{movie?.rottenTomatoes} %</Text>
            </View>
            <Text style={[styles.ratingText, { color: "#ffffff" }]}>
              Rotten
            </Text>
          </View>
          <View style={styles.ratingBox}>
            <View style={styles.rating}>
              <Feather name="clock" size={20} color={"#ffffff"} />
              <Text style={styles.text}>{movie?.duration}</Text>
            </View>
            <Text style={styles.ratingText}>Duration</Text>
          </View>
        </View>
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: 600, color: "gray" }}>Genre</Text>
          <View style={{ flexDirection: "row", gap: 5 }}>
            {movie.genre.map((gen) => (
              <Text
                key={gen}
                style={{
                  color: "#ffffff",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: "#71717176",
                  borderRadius: 50,
                }}
              >
                {gen}
              </Text>
            ))}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.description, { fontWeight: "bold", fontSize: 18 }]}
          >
            Description
          </Text>
          <Text style={styles.description}>{movie.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  rating: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  boxRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontWeight: 600,
    fontSize: 16,
    color: "#ffffff",
  },
  detailsBox: {
    paddingHorizontal: 20,
    marginTop: -65,
    gap: 20,
    position: "absolute",
    top: "100%",
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#ffffff",
  },
  tag: {
    color: "#ffffff",
    backgroundColor: "#7b899a",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
  },
  ratingBox: {
    alignItems: "center",
    gap: 5,
  },
  ratingText: {
    color: "gray",
    fontWeight: 400,
    fontSize: 16,
  },
  description: {
    color: "gray",
    fontWeight: 600,
  },
  absoluteFillObject: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
  },
  header: {
    position: "absolute",
    zIndex: 10,
    width: "100%",
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
});
