import useMovies, { MovieItem } from "@/context/MoviesContext";
import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const initialForm: MovieItem = {
  id: "",
  name: "",
  description: "",
  tags: [],
  genre: [],
  imageUrl: "",
  imdbRating: 0,
  duration: "",
  rottenTomatoes: 0,
};

type ImageType = "url" | "file";

const IMAGE_TYPES: {
  label: string;
  value: ImageType;
  icon: "link" | "upload";
}[] = [
  { label: "URL", value: "url", icon: "link" },
  { label: "File", value: "file", icon: "upload" },
];

const RULES: any = {
  imdbRating: /^(10(\.0?)?|\d(\.\d?)?)?$/,
  rottenTomatoes: /^(100|\d{0,2})$/,
};

const genres = [
  "Drama",
  "Action",
  "Comedy",
  "Horror",
  "Romance",
  "Thriller",
  "Fantasy",
];

export default function CreateMovieScreen() {
  const { movieTags, handleSumbit } = useMovies();

  const [select, setSelect] = useState<string>("");
  const [imageType, setImageType] = useState<ImageType>("url");
  const [typeMenu, setTypeMenu] = useState(false);

  const [form, setForm] = useState<MovieItem>(initialForm);

  const resetForm = () => {
    if (
      !form.description ||
      !form.duration ||
      form.genre.length === 0 ||
      form.tags.length === 0 ||
      !form.imageUrl ||
      !form.name ||
      form.rottenTomatoes <= 0 ||
      form.rottenTomatoes > 100 ||
      form.imdbRating > 10 ||
      form.imdbRating <= 0
    ) {
      return;
    }

    setForm(initialForm);
    setImageType("url");
    setSelect("");
  };

  const handleChangeText = (key: string, value: string) => {
    const v = key === "imdbRating" ? value.replace(",", ".") : value;
    const rule = RULES[key];
    if (rule && !rule.test(v)) return;

    setForm((prev) => ({
      ...prev,
      [key]: v,
    }));
  };

  const toggleTags = (newTag: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.some((teg) => teg === newTag)
        ? prev.tags.filter((teg) => teg !== newTag)
        : [...prev.tags, newTag],
    }));
  };

  const toggleGenre = (newGenre: string) => {
    setSelect(newGenre);

    setForm((prev) => ({
      ...prev,
      genre: prev.genre.some((genre) => genre === newGenre)
        ? prev.genre.filter((genre) => genre !== newGenre)
        : [...prev.genre, newGenre],
    }));
  };

  const chooseType = (type: ImageType) => {
    setTypeMenu(false);
    if (type !== imageType) {
      setImageType(type);
      handleChangeText("imageUrl", "");
    }
  };

  const pickFile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });

    if (!result.canceled) {
      handleChangeText("imageUrl", result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[styles.container, { paddingTop: StatusBar.currentHeight }]}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ width: "100%", gap: 10 }}>
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

          <View style={styles.imageRow}>
            <View style={styles.imageBox}>
              {form.imageUrl ? (
                <Image
                  source={{ uri: form.imageUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <Entypo
                  name="image-inverted"
                  size={50}
                  color={"rgba(70, 70, 70, 0.71)"}
                />
              )}
            </View>

            <View style={styles.imageSide}>
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}
                  onPress={() => setTypeMenu(true)}
                >
                  <Text>Image Type</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.titleInput}>
                {imageType === "url" ? "Image Url" : "Image File"}
              </Text>

              {imageType === "url" ? (
                <TextInput
                  placeholder="https://..."
                  value={form.imageUrl}
                  onChangeText={(value) => handleChangeText("imageUrl", value)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.imgField}
                />
              ) : (
                <TouchableOpacity style={styles.imgField} onPress={pickFile}>
                  <Text
                    numberOfLines={1}
                    style={{ color: form.imageUrl ? "#000" : "#999" }}
                  >
                    {form.imageUrl
                      ? form.imageUrl.split("/").pop()
                      : "Choose file..."}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.titleInput}>
              Name <Text style={styles.symbol}>*</Text>
            </Text>
            <TextInput
              placeholder="Movie name"
              style={styles.input}
              value={form.name}
              onChangeText={(value) => handleChangeText("name", value)}
              maxLength={100}
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.titleInput}>
              Description <Text style={styles.symbol}>*</Text>
            </Text>
            <TextInput
              placeholder="Movie description"
              multiline
              maxLength={500}
              numberOfLines={5}
              textAlignVertical="top"
              style={[styles.input, { minHeight: 100 }]}
              value={form.description}
              onChangeText={(value) => handleChangeText("description", value)}
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.titleInput}>
              Tags <Text style={styles.symbol}>*</Text>
            </Text>
            <View style={styles.tags}>
              {movieTags?.map((item) => {
                const result = form.tags.some((tag) => tag === item);
                return (
                  <TouchableOpacity
                    key={item}
                    style={styles.tagBtn}
                    onPress={() => toggleTags(item)}
                  >
                    <MaterialCommunityIcons
                      name={
                        result ? "checkbox-marked" : "checkbox-blank-outline"
                      }
                      size={22}
                      color={result ? "green" : "gray"}
                    />
                    <Text style={{ fontWeight: "600" }}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.titleInput}>
              Genres <Text style={styles.symbol}>*</Text>
            </Text>
            <View style={styles.selectContainer}>
              <Picker
                selectedValue={select}
                onValueChange={(value) => toggleGenre(value)}
              >
                <Picker.Item label="Select genres" value="" />
                {genres.map((genre) => (
                  <Picker.Item key={genre} label={genre} value={genre} />
                ))}
              </Picker>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              gap: 10,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.titleInput}>
                IMDb Rating <Text style={styles.symbol}>*</Text>
              </Text>
              <TextInput
                placeholder="IMDb Rating"
                keyboardType="decimal-pad"
                value={form.imdbRating.toString()}
                onChangeText={(value) => handleChangeText("imdbRating", value)}
                style={styles.rating}
                maxLength={4}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.titleInput}>
                Rotten <Text style={styles.symbol}>*</Text>
              </Text>
              <TextInput
                placeholder="Rotten"
                keyboardType="numeric"
                value={form.rottenTomatoes.toString()}
                onChangeText={(value) =>
                  handleChangeText("rottenTomatoes", value)
                }
                style={styles.rating}
                maxLength={3}
              />
            </View>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.titleInput}>
              Duration <Text style={styles.symbol}>*</Text>
            </Text>
            <TextInput
              placeholder="Input"
              onChangeText={(value) => handleChangeText("duration", value)}
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => (handleSumbit(form), resetForm())}
          >
            <Text
              style={{ color: "#ffffff", fontWeight: "bold", fontSize: 16 }}
            >
              Add Movie
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={typeMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setTypeMenu(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setTypeMenu(false)}>
          <View style={styles.menu}>
            {IMAGE_TYPES.map((t) => {
              const active = t.value === imageType;
              return (
                <TouchableOpacity
                  key={t.value}
                  style={styles.menuItem}
                  onPress={() => chooseType(t.value)}
                >
                  <Feather
                    name={t.icon}
                    size={18}
                    color={active ? "#6f1aef" : "#444"}
                  />
                  <Text
                    style={[
                      styles.menuText,
                      active && { color: "#6f1aef", fontWeight: "700" },
                    ]}
                  >
                    {t.label}
                  </Text>
                  {active && <Feather name="check" size={18} color="#6f1aef" />}
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 5,
  },
  imageRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageBox: {
    width: "30%",
    height: 120,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6f1aef17",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageSide: {
    flex: 1,
    paddingHorizontal: 10,
    gap: 5,
  },
  imgField: {
    height: 44,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  inputBox: {
    width: "100%",
    gap: 5,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    fontSize: 15,
  },
  symbol: {
    color: "red",
    fontWeight: "bold",
  },
  titleInput: {
    fontWeight: "bold",
    fontSize: 14,
    paddingLeft: 5,
  },
  tags: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 8,
    paddingRight: 10,
    paddingLeft: 5,
    marginVertical: 5,
  },
  tagBtn: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  selectContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
  },
  rating: {
    borderWidth: 1,
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    width: 240,
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#111",
  },
  submitBtn: {
    backgroundColor: "#6f1aef",
    width: "100%",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
});
