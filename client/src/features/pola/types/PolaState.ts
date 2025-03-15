import RequestState from "../../../types/RequestState";
import PolaSchema from "./PolaSchema";

export default interface PolaState {
  pola: {
    data: Record<string, PolaSchema>;
    state: RequestState;
  };
  poleDetails: {
    data: PolaSchema;
    state: RequestState;
  };
  poleCreateState: RequestState;
  poleUpdateState: RequestState;
  poleRemoveState: RequestState;
}
