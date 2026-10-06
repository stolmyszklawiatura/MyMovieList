type Props = {
  title: string;
  year: number;
  genre: string[];
  watched: boolean;
  rating: number;
  onToggle: () => void;
  onRate: (rating: number) => void;
};

function MovieCard({
  title,
  year,
  genre,
  watched,
  rating,
  onToggle,
  onRate,
}: Props) {
  return (
    <div className="Card">
      <h2>{title}</h2>

      <p>Rok: {year}</p>

      <p>
        Gatunek: {genre.join(", ")}
      </p>

      <button
        className="Wbutton"
        onClick={onToggle}
      >
        {watched
          ? "✓ obejrzany"
          : "✗ do obejrzenia"}
      </button>

      <div className="Rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={
              star <= rating
                ? "Star active"
                : "Star"
            }
            onClick={() => onRate(star)}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}

export default MovieCard;
