import { useEffect } from "react";
import { addTermToLastSeen } from "../utils/lastSeen";

const useAddTermToLastSeen = (termId) => {
  useEffect(() => {
    addTermToLastSeen(termId);
  }, [termId]);
};

export default useAddTermToLastSeen;
