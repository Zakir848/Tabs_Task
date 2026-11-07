import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const sideBar = [
    {
      icon: <Ionicons name="heart-outline" size={20} />,
      title: "My Saved Movies",
      right: <AntDesign name="right" />,
    },
    {
      icon: <Ionicons name="information-circle-outline" size={20} />,
      title: "About App",
      right: <AntDesign name="right" />,
    },
    {
      icon: <Ionicons name="settings" size={20} />,
      title: "Settings",
      right: <AntDesign name="right" />,
    },
    {
      icon: <MaterialCommunityIcons name="logout" size={20} color={"red"} />,
      title: "Logout",
      right: <AntDesign name="right" />,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.replace("/(tabs)")}>
          <Feather name="arrow-left" size={22} />
        </Pressable>
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Add Movie
        </Text>
        <View style={{ width: 22 }} />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Ionicons name="person" style={styles.icon} />
        <Text style={[styles.text, { fontWeight: "bold", fontSize: 25 }]}>
          John Doe
        </Text>
        <Text style={styles.text}>Movie Lover 🎬</Text>
      </View>

      <FlatList
        data={sideBar}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={
          <View
            style={{
              backgroundColor: "#d3d3d3",
              height: 1,
            }}
          />
        }
        style={styles.flatlist}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.btn}>
            {item.icon}
            <Text style={{ flex: 1, paddingLeft: 20 }}>{item.title}</Text>
            <Text>{item.right}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
    backgroundColor: "#f7f7f7",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 20,
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontWeight: 500,
    fontSize: 18,
  },
  icon: {
    padding: 20,
    backgroundColor: "#ae6cd972",
    color: "#ba48e3",
    borderRadius: 50,
    fontSize: 20,
  },
  btn: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  flatlist: {
    backgroundColor: "#ffffff",
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 15,
    maxHeight: 250,
    paddingHorizontal: 20,
  },
});
