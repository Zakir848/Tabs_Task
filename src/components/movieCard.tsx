import useMovies, { MovieItem } from "@/context/MoviesContext";
import { AntDesign, Feather, Fontisto, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  item: MovieItem;
  isFavoritePage: boolean;
};

export default function MovieCard({ item, isFavoritePage }: Props) {
  const { toggleFavorite } = useMovies();

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/details",
          params: { id: item.id },
        })
      }
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View
        style={{
          flexGrow: 1,
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
          {item.genre.slice(0, 2).map((genre) => (
            <Text key={genre} style={{ color: "gray" }}>
              {genre},
            </Text>
          ))}

          {item.genre.length > 2 && (
            <Text style={{ fontWeight: 500 }}>other...</Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Ionicons name="star" color="orange" size={18} />
            <Text style={{ color: "orange", fontWeight: 600 }}>
              {item?.imdbRating}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Feather name="clock" size={16} />
            <Text style={{ fontWeight: 600 }}>{item.duration}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          {item.tags.map((tags) => (
            <Text key={tags} style={styles.tags}>
              {tags}
            </Text>
          ))}
        </View>
      </View>
      <View
        style={{ justifyContent: isFavoritePage ? "flex-start" : "center" }}
      >
        {isFavoritePage ? (
          <Fontisto
            name="favorite"
            color={"#7b47c9"}
            size={30}
            onPress={() => toggleFavorite(item)}
            style={{ paddingTop: 5 }}
          />
        ) : (
          <AntDesign name="right" size={18} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  tags: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: "#6f1aef39",
    borderRadius: 10,
    fontWeight: "600",
    color: "#6f1aef",
  },
});
