import { FaArrowLeft } from "react-icons/fa";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import useDocumentTitle from "../hooks/useDocumentTitle";

export const MovieDetail = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movie, setMovie] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true); // Start loading
        setError(""); // Reset error
        // setMovie(null); // Reset movie state

        const response = await fetch(url, { cache: "no-store" });

        if (!response.ok)
          throw new Error("Something went wrong fetching movie data.");

        const json = await response.json();

        if (json.Response === "False") throw new Error("Movie not found");

        setMovie(json);
        setError("");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [params, url]);

  useDocumentTitle(movie.title);

  return (
    <main className="text-black dark:text-white flex items-center justify-center">
      {loading && <Loading />}
      {error && <Error />}
      {!loading && !error && (
        <section className="container mx-auto flex flex-col md:flex-row items-center gap-8 p-6">
          {/* Movie Poster */}
          <div className="flex justify-center relative">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg shadow-lg"
            />

            <button
              onClick={() => navigate(-1)} // Ensure it navigates back when clicked
              className="absolute border left-4 top-4 w-8 rounded-full bg-black dark:bg-white text-white dark:text-black h-8 text-2xl font-extrabold flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
            >
              <FaArrowLeft />
            </button>
          </div>

          {/* Movie Details */}
          <div className="w-full md:w-2/3 p-6">
            <h1 className="text-4xl font-extrabold mb-6">{movie.title}</h1>
            <p className="text-lg leading-relaxed mb-8 text-gray-600 dark:text-gray-50">
              {movie.overview}
            </p>

            {/* Genres */}
            <div className="flex flex-wrap gap-3 mb-6">
              {movie.genres &&
                movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-indigo-600/90 text-white text-sm px-4 py-1 rounded-full shadow-md"
                  >
                    {genre.name}
                  </span>
                ))}
            </div>

            {/* Movie Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-400">
              <p>
                <span className="text-yellow-400 font-semibold">
                  ⭐ {movie.vote_average}
                </span>{" "}
                • {movie.vote_count} reviews
              </p>
              <p>
                <span className="font-semibold text-gray-600 dark:text-gray-50">
                  Runtime:
                </span>{" "}
                {movie.runtime} min.
              </p>
              <p>
                <span className="font-semibold text-gray-600 dark:text-gray-50">
                  Budget:
                </span>{" "}
                ${movie.budget?.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold text-gray-600 dark:text-gray-50">
                  Revenue:
                </span>{" "}
                ${movie.revenue?.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold text-gray-600 dark:text-gray-50">
                  Release Date:
                </span>{" "}
                {movie.release_date}
              </p>
              <p>
                <span className="font-semibold text-gray-600 dark:text-gray-50">
                  IMDB Code:
                </span>{" "}
                {movie.imdb_id}
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
