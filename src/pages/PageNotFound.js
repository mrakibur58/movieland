import { useEffect } from "react";
import HomeButton from "../components/HomeButton";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  useEffect(() => {
    document.title = `404 Not Found - MovieLand`;
  });

  return (
    <main>
      <div className="flex flex-col items-center justify-center text-black dark:text-white">
        <h1 className="text-[12rem] font-bold">404</h1>
        <p className="text-xl font-medium mb-8">Page Not Found</p>
        <Link to="/">
          <HomeButton>Go To Home</HomeButton>
        </Link>
      </div>
    </main>
  );
};
