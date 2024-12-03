import { useFetch } from "../hooks/useFetch";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
// import { useEffect } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";

export const Search = ({ apiPath }) => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("q");

  const { data: movies, loading, error } = useFetch(apiPath, queryParam);

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  useDocumentTitle(`${toTitleCase(queryParam)}`);

  return (
    <main>
      <section>
        <p className="text-black dark:text-white">
          {!error &&
            !loading &&
            (movies.length === 0 ? (
              <h1 className="text-xl md:text-2xl lg:text-4xl">
                No Results Found For - "{queryParam}"
              </h1>
            ) : (
              <h1 className="text-xl md:text-2xl lg:text-4xl">
                Result For - "{queryParam}"
              </h1>
            ))}
        </p>
      </section>
      <section className="flex justify-center items-center min-h-[80dvh]">
        {loading && <Loading />}
        {error && <Error />}
        {!loading && !error && (
          <div className="flex justify-center flex-wrap">
            {movies.map((movie) => (
              <Card
                key={movie.id}
                id={movie.id} // Use a unique key for React
                title={movie.title} // Access the title directly
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // URL for movie poster
                overview={
                  movie.overview.length > 100
                    ? movie.overview.slice(0, 100) + "..." // Truncate to 100 characters
                    : movie.overview
                }
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
