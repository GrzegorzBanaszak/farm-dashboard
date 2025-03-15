import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { polaThunk } from "../../../features/pola/polaThunk";

const page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(polaThunk.getAll());
  }, []);

  return <div>Pola</div>;
};

export default page;
