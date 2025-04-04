import UserSchema from "./UserSchema";
import RequestState from "@/types/RequestState";

export default interface AuthState {
  user: UserSchema | null;
  globalState: RequestState;
  isAuthenticated: boolean;
}
