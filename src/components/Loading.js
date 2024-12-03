import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center align-middle flex-col">
      <BeatLoader color="#123abc" size={35} />
      <h2 className="text-black dark:text-white">Loading..</h2>
    </div>
  );
};
export default Loading;
