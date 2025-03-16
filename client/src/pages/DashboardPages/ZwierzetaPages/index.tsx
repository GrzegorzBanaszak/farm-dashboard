import { useAppDispatch } from "@/app/hooks";

import { useEffect } from "react";

const page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(zwierzetaThunk.remove("67d6b41ad63406b7c4c22a03"));
  }, []);
  return <div>Zwierzeta</div>;
};

export default page;
