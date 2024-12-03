import { Link } from "react-router-dom";

const Card = ({ id, title, image, overview }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow m-4 dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/movies/${id}`}>
        <div>
          <img className="rounded-t-lg" src={image} alt={image} />
        </div>
        <div className="p-5">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {overview}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default Card;
