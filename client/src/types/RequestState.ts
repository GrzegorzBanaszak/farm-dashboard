import LoadingState from "./LoadingState";

export default interface RequestState {
  loading: LoadingState;
  error: boolean;
  messages: string[];
}
