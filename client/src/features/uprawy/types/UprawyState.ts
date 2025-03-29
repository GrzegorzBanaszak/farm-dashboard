import RequestState from "../../../types/RequestState";
import UprawyDetailSchema from "./UprawyDetailSchema";
import UprawySchema from "./UprawySchema";

export default interface UprawyState {
  uprawy: {
    data: Record<string, UprawySchema>;
    state: RequestState;
  };
  uprawyDetails: {
    data: UprawyDetailSchema;
    state: RequestState;
  };
  uprawyCreateState: RequestState;
  uprawyUpdateState: RequestState;
  uprawyRemoveState: RequestState;
}
