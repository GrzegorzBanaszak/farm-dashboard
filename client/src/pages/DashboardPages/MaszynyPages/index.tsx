import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { maszynyThunk } from "../../../features/maszyny/maszynyThunk";
import { MachineCondition } from "../../../features/maszyny/types/MachineCondition";

const page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {});
  return <div>Maszyny</div>;
};

export default page;
