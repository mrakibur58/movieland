import Card from "../components/Card";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { useFetch } from "../hooks/useFetch";
import useDocumentTitle from "../hooks/useDocumentTitle";

export const MovieList = ({ apiPath, title }) => {
  const { data: movies, error, loading } = useFetch(apiPath);

  useDocumentTitle(`${title}`);

  return (
    <main>
      <section className="md:hidden">
        {!loading && !error && (
          <h1 className="font-thin text-xl md:text-2xl lg:text-4xl uppercase text-black dark:text-white">
            {apiPath.slice(6)}:
          </h1>
        )}
      </section>
      <section className="text-black dark:text-white min-h-[80dvh] flex items-center justify-center">
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
