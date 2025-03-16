import RequestState from "../../../types/RequestState";
import ZwierzetaSchema from "./ZwierzetaSchema";

export default interface ZwierzetaState {
  zwierzeta: {
    data: Record<string, ZwierzetaSchema>;
    state: RequestState;
  };
  zwierzetaDetails: {
    data: ZwierzetaSchema;
    state: RequestState;
  };
  zwierzetaCreateState: RequestState;
  zwierzetaUpdateState: RequestState;
  zwierzetaRemoveState: RequestState;
  zwierzetaHealthUpdateState: RequestState;
}
