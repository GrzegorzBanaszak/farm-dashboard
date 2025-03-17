import axios from "axios";
import LoginSchema from "./types/LoginSchema";
import { constants } from "@/utils/constants";
import RegisterSchema from "./types/RegisterSchema";

const AUTH_URL = `${constants.API_URL}/auth`;

const login = async (data: LoginSchema) => {
  const res = await axios.post(`${AUTH_URL}/login`, data, {
    withCredentials: true,
  });
  return res.data;
};

const register = async (data: RegisterSchema) => {
  const res = await axios.post(`${AUTH_URL}/register`, data, {
    withCredentials: true,
  });
  return res.data;
};

const logout = async () => {
  const res = await axios.get(`${AUTH_URL}/logout`, {
    withCredentials: true,
  });
  return res.data;
};

const getUser = async () => {
  const res = await axios.get(`${constants.API_URL}/user/profile`, {
    withCredentials: true,
  });

  return res.data;
};
export const authService = {
  login,
  register,
  getUser,
  logout,
};
