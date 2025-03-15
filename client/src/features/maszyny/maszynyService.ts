import axios from "axios";
import { constants } from "../../utils/constants";
import MaszynySchema from "./types/MaszynySchema";
import AddMaszynySchema from "./types/AddMaszynySchema";
import UpdateMaszynySchema from "./types/UpdateMaszynySchema";

const MASZYNY_URL = `${constants.API_URL}/machine`;

const getAll = async (): Promise<MaszynySchema[]> => {
  const res = await axios.get(MASZYNY_URL);
  return res.data;
};

const getOne = async (id: string): Promise<MaszynySchema> => {
  const res = await axios.get(`${MASZYNY_URL}/${id}`);
  return res.data;
};

const create = async (data: AddMaszynySchema): Promise<MaszynySchema> => {
  const res = await axios.post(MASZYNY_URL, data);
  return res.data;
};

const update = async (
  id: string,
  data: UpdateMaszynySchema
): Promise<MaszynySchema> => {
  const res = await axios.put(`${MASZYNY_URL}/${id}`, data);
  return res.data;
};

const remove = async (id: string): Promise<MaszynySchema> => {
  const res = await axios.delete(`${MASZYNY_URL}/${id}`);
  return res.data;
};

export const maszynyService = { getAll, getOne, create, update, remove };
