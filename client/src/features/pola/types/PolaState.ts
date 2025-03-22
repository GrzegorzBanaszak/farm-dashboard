import RequestState from "../../../types/RequestState";
import PolaSchema from "./PolaSchema";
import PoleDetailSchema from "./PoleDetailSchema";

export default interface PolaState {
  pola: {
    data: Record<string, PolaSchema>;
    state: RequestState;
  };
  poleDetails: {
    data: PoleDetailSchema;
    state: RequestState;
  };
  poleCreateState: RequestState;
  poleUpdateState: RequestState;
  poleRemoveState: RequestState;
}
