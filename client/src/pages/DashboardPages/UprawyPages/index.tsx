import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { uprawyThunk } from "../../../features/uprawy/uprawyThunk";
import { UprawyType } from "../../../features/uprawy/types/UprawyType";

const page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(uprawyThunk.remove("67d69f7fe572e8956544bbc1"));
  }, []);
  return <div>Uprawy</div>;
};

export default page;
