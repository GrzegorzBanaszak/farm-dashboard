import RequestState from "../../../types/RequestState";
import MaszynyDetailSchema from "./MaszynyDetailSchema";
import MaszynySchema from "./MaszynySchema";

export default interface MaszynyState {
  maszyny: {
    data: Record<string, MaszynySchema>;
    state: RequestState;
  };
  maszynaDetails: {
    data: MaszynyDetailSchema;
    state: RequestState;
  };
  maszynaCreateState: RequestState;
  maszynaUpdateState: RequestState;
  maszynaRemoveState: RequestState;
}
