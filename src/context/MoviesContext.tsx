import { router } from "expo-router";
import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";

export type MovieItem = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  genre: string[];
  imageUrl: string;
  imdbRating: number;
  duration: string;
  rottenTomatoes: number;
};

type MovieContextType = {
  movies: MovieItem[];
  toggleFavorite: (movie: MovieItem) => void;
  favorite: MovieItem[];
  movieTags: string[];
  handleSumbit: (movie: MovieItem) => void;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

const movieTags = ["2D", "3D", "IMAX", "4K"];

const MoviesData: MovieItem[] = [
  {
    id: "1",
    name: "Avatar: The Way of Water",
    description:
      "Jake Sully and his family explore the oceans of Pandora while facing a new threat.",
    imageUrl: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    tags: ["2D", "3D", "IMAX", "4DX"],
    genre: ["Action", "Adventure", "Sci-Fi", "Fantasy"],
    imdbRating: 7.5,
    duration: "3h 12m",
    rottenTomatoes: 76,
  },
  {
    id: "2",
    name: "Interstellar",
    description:
      "A team of astronauts travels through a wormhole to find a new home for humanity.",
    imageUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    tags: ["2D", "IMAX", "4K"],
    genre: ["Sci-Fi", "Drama", "Adventure"],
    imdbRating: 8.7,
    duration: "2h 49m",
    rottenTomatoes: 73,
  },
  {
    id: "3",
    name: "The Dark Knight",
    description:
      "Batman faces the Joker, a criminal mastermind who brings chaos to Gotham City.",
    imageUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    tags: ["2D", "IMAX", "4K"],
    genre: ["Action", "Crime", "Drama", "Thriller"],
    imdbRating: 9.0,
    duration: "2h 32m",
    rottenTomatoes: 94,
  },
];

export function MovieProvider({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = useState<MovieItem[]>(MoviesData);
  const [favorite, setFavorite] = useState<MovieItem[]>([]);
  console.log(movies.map((item) => item.id));

  const toggleFavorite = (movie: MovieItem) => {
    setFavorite((prev) =>
      prev.some((item) => item.id === movie?.id)
        ? prev.filter((item) => item.id !== movie.id)
        : [...prev, movie],
    );
  };

  const handleSumbit = (movie: MovieItem) => {
    console.log(movies.length + 1);

    if (
      !movie.description ||
      !movie.duration ||
      movie.genre.length === 0 ||
      movie.tags.length === 0 ||
      !movie.imageUrl ||
      !movie.name ||
      movie.rottenTomatoes <= 0 ||
      movie.rottenTomatoes > 100 ||
      movie.imdbRating > 10 ||
      movie.imdbRating <= 0
    ) {
      Alert.alert("Warning", "Please, complate all form", [
        {
          text: "Go home",
          onPress: () => (router.back()),
        },
        {
          text: "ok",
        },
      ]);
      return;
    }

    const newId = (movies.length + 1).toString();

    setMovies((prev) => [...prev, { ...movie, id: newId }]);
    router.replace("/");
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        toggleFavorite: toggleFavorite,
        favorite,
        movieTags,
        handleSumbit,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default function useMovies() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("Error Something");
  }

  return context;
}
