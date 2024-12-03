import { useEffect, useState } from "react";

export const useFetch = (apiPath, queryParam = "") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${process.env.REACT_APP_API_KEY}&query=${queryParam}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        setError(""); // Reset error
        setData([]); // Reset data

        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok)
          throw new Error("Something went wrong fetching movie data.");

        const json = await res.json();

        if (json.Response === "False") throw new Error("Movie not found");
        setData(json.results || []); // Assuming `data.results` contains the list of movies
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData(); // Call the async function
  }, [url]); // Runs whenever `url` changes

  return { data, loading, error };
};
