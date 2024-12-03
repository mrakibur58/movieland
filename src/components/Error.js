const Error = () => {
  return (
    <div className="text-black dark:text-white text-xl md:text-2xl lg:text-4xl">
      <h1 className="text-red-500">Error fetching data!!!</h1>
      <p className="font-thin">
        There was an error while trying to fetch the data you requested. Please
        try again later.
      </p>
    </div>
  );
};

export default Error;
