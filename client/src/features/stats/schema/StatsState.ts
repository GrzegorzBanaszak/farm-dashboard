import RequestState from "@/types/RequestState";
import GetStatsSchema from "./GetStatsSchema";

export default interface StatsState {
  data: GetStatsSchema;
  state: RequestState;
}
