import axios from "axios";
import UprawySchema from "./types/UprawySchema";
import { constants } from "../../utils/constants";
import AddUprawySchema from "./types/AddUprawySchema";
import UpdateUprawySchema from "./types/UpdateUprawySchema";

const UPRAWY_URL = `${constants.API_URL}/crop`;

const getAll = async (): Promise<UprawySchema[]> => {
  const res = await axios.get(UPRAWY_URL, { withCredentials: true });
  return res.data;
};

const getOne = async (id: string): Promise<UprawySchema> => {
  const res = await axios.get(`${UPRAWY_URL}/${id}`, { withCredentials: true });
  return res.data;
};

const create = async (data: AddUprawySchema): Promise<UprawySchema> => {
  const res = await axios.post(UPRAWY_URL, data, { withCredentials: true });
  return res.data;
};

const update = async (
  id: string,
  data: UpdateUprawySchema
): Promise<UprawySchema> => {
  const res = await axios.put(`${UPRAWY_URL}/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
};

const remove = async (id: string): Promise<UprawySchema> => {
  const res = await axios.delete(`${UPRAWY_URL}/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

export const uprawyService = { getAll, getOne, create, update, remove };
