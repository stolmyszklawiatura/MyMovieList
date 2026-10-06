import moviesData from "./data/movies.json";
import MovieCard from "./components/MovieCard";
import "./style.css";
import { useState } from "react";

type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string[];
};

function App() {
  const [movies, setMovies] = useState<Movie[]>(moviesData);

  const [watchedMovies, setWatchedMovies] = useState<number[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);
  const [filter, setFilter] = useState<"all" | "watched" | "unwatched">("all");

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genres, setGenres] = useState<string[]>([""]);

  const toggleWatched = (id: number) => {
    setWatchedMovies((prev) =>
      prev.includes(id)
        ? prev.filter((movieId) => movieId !== id)
        : [...prev, id]
    );
  };

  const setRating = (id: number, rating: number) => {
    setRatings((prev) => {
      const newRatings = [...prev];
      newRatings[id] = rating;
      return newRatings;
    });
  };

  const addGenre = () => {
    setGenres([...genres, ""]);
  };

  const changeGenre = (index: number, value: string) => {
    const newGenres = [...genres];
    newGenres[index] = value;
    setGenres(newGenres);
  };

  const addMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() === "" || year === "") {
      return;
    }

    const newMovie: Movie = {
      id: movies.length > 0
        ? Math.max(...movies.map((movie) => movie.id)) + 1
        : 1,

      title: title,
      year: Number(year),

      genre: genres.filter((genre) => genre.trim() !== ""),
    };

    if (newMovie.genre.length === 0) {
      return;
    }

    setMovies([...movies, newMovie]);

    setTitle("");
    setYear("");
    setGenres([""]);
  };

  const filteredMovies = movies.filter((movie) => {
    if (filter === "watched") {
      return watchedMovies.includes(movie.id);
    }

    if (filter === "unwatched") {
      return !watchedMovies.includes(movie.id);
    }

    return true;
  });

  return (
    <>
      <h1>Filmy</h1>

      <h3>
        Obejrzane: {watchedMovies.length} / {movies.length}
      </h3>

      <div className="Buttons">
        <button onClick={() => setFilter("all")}>
          Wszystkie
        </button>

        <button onClick={() => setFilter("watched")}>
          Obejrzane
        </button>

        <button onClick={() => setFilter("unwatched")}>
          Nieobejrzane
        </button>

        <button onClick={() => setWatchedMovies([])}>
          Wyczyść wszystkie
        </button>
      </div>

      <form onSubmit={addMovie} className="MovieForm">
        <h2>Dodaj film</h2>

        <div>
          <label>Tytuł:</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Rok:</label>

          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div>
          <label>Gatunki:</label>

          {genres.map((genre, index) => (
            <div className="GenreInput" key={index}>
              <input
                type="text"
                value={genre}
                onChange={(e) =>
                  changeGenre(index, e.target.value)
                }
              />

              {index === genres.length - 1 && (
                <button
                  type="button"
                  onClick={addGenre}
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>

        <button type="submit">
          Dodaj
        </button>
      </form>

      {filteredMovies.length === 0 ? (
        <p>Brak filmów do wyświetlenia.</p>
      ) : (
        filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            year={movie.year}
            genre={movie.genre}
            watched={watchedMovies.includes(movie.id)}
            rating={ratings[movie.id] || 0}
            onToggle={() => toggleWatched(movie.id)}
            onRate={(rating) => setRating(movie.id, rating)}
          />
        ))
      )}
    </>
  );
}

export default App;
