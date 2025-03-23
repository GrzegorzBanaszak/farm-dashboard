import RequestState from "../../../types/RequestState";
import ZwierzetaDetailSchema from "./ZwierzetaDetailSchema";
import ZwierzetaSchema from "./ZwierzetaSchema";

export default interface ZwierzetaState {
  zwierzeta: {
    data: Record<string, ZwierzetaSchema>;
    state: RequestState;
  };
  zwierzetaDetails: {
    data: ZwierzetaDetailSchema;
    state: RequestState;
  };
  zwierzetaCreateState: RequestState;
  zwierzetaUpdateState: RequestState;
  zwierzetaRemoveState: RequestState;
  zwierzetaHealthUpdateState: RequestState;
}
