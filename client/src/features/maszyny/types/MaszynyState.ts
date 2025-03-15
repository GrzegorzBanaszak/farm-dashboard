import RequestState from "../../../types/RequestState";
import MaszynySchema from "./MaszynySchema";

export default interface MaszynyState {
  maszyny: {
    data: Record<string, MaszynySchema>;
    state: RequestState;
  };
  maszynaDetails: {
    data: MaszynySchema;
    state: RequestState;
  };
  maszynaCreateState: RequestState;
  maszynaUpdateState: RequestState;
  maszynaRemoveState: RequestState;
}
