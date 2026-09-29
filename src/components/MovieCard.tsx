type Props = {
  title: string;
  year: number;
  genre: string;
  watched: boolean;
  onToggle: () => void;
};

function MovieCard({ title, year, genre, watched, onToggle }: Props) {
  return (
    <div className="Card">
      <h2>{title}</h2>
      <p>Rok: {year}</p>
      <p>Gatunek: {genre}</p>

      <button className="Wbutton" onClick={onToggle}>
        {watched ? "✓ obejrzany" : "✗ do obejrzenia"}
      </button>
      <p>★☆☆☆☆</p>
    </div>
  );
}

export default MovieCard;
