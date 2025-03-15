import { constants } from "../../utils/constants";
import AddPoleSchema from "./types/AddPoleSchema";
import EditPoleSchema from "./types/EditPoleSchema";
import PolaSchema from "./types/PolaSchema";
import axios from "axios";

const POLA_URL = `${constants.API_URL}/field`;

const getAll = async (): Promise<PolaSchema[]> => {
  const res = await axios.get(POLA_URL);
  return res.data;
};

const getOne = async (id: string): Promise<PolaSchema> => {
  const res = await axios.get(`${POLA_URL}/${id}`);
  return res.data;
};

const create = async (data: AddPoleSchema): Promise<PolaSchema> => {
  const res = await axios.post(POLA_URL, data);
  return res.data;
};

const update = async (
  id: string,
  data: EditPoleSchema
): Promise<PolaSchema> => {
  const res = await axios.put(`${POLA_URL}/${id}`, data);
  return res.data;
};

const remove = async (id: string): Promise<PolaSchema> => {
  const res = await axios.delete(`${POLA_URL}/${id}`);
  return res.data;
};

export const polaService = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
