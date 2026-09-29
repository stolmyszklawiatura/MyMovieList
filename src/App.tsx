import movies from "./data/movies.json";
import MovieCard from "./components/MovieCard";
import "./style.css";
import { useState } from "react";

function App() {
  const [watchedMovies, setWatchedMovies] = useState<number[]>([]);
  const [filter, setFilter] = useState<"all" | "watched" | "unwatched">("all");

  const toggleWatched = (id: number) => {
    setWatchedMovies((prev) =>
      prev.includes(id)
        ? prev.filter((movieId) => movieId !== id)
        : [...prev, id]
    );
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
        <button onClick={() => setFilter("all")}>Wszystkie</button>
        <button onClick={() => setFilter("watched")}>Obejrzane</button>
        <button onClick={() => setFilter("unwatched")}>
          Nieobejrzane
        </button>

        <button onClick={() => setWatchedMovies([])}>
          Wyczyść wszystkie
        </button>
      </div>

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
            onToggle={() => toggleWatched(movie.id)}
          />
        ))
      )}
    </>
  );
}

export default App;
