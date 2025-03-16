import UserSchema from "./UserSchema";
import RequestState from "@/types/RequestState";

export default interface AuthState {
  user: UserSchema | null;
  registerState: RequestState;
  loginState: RequestState;
}
