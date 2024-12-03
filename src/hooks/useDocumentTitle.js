import { useEffect } from "react";

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} - MovieLand` : "Loading...";
  }, [title]);

  return null;
}

export default useDocumentTitle;
