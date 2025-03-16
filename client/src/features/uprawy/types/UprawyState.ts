import RequestState from "../../../types/RequestState";
import UprawySchema from "./UprawySchema";

export default interface UprawyState {
  uprawy: {
    data: Record<string, UprawySchema>;
    state: RequestState;
  };
  uprawyDetails: {
    data: UprawySchema;
    state: RequestState;
  };
  uprawyCreateState: RequestState;
  uprawyUpdateState: RequestState;
  uprawyRemoveState: RequestState;
}
