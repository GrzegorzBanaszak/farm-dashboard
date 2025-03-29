import { constants } from "../../utils/constants";
import AddPoleSchema from "./types/AddPoleSchema";
import EditPoleSchema from "./types/EditPoleSchema";
import PolaSchema from "./types/PolaSchema.1";
import axios from "axios";
import PoleDetailSchema from "./types/PoleDetailSchema";

const POLA_URL = `${constants.API_URL}/field`;

const getAll = async (): Promise<PolaSchema[]> => {
  const res = await axios.get(POLA_URL, { withCredentials: true });
  return res.data;
};

const getOne = async (id: string): Promise<PoleDetailSchema> => {
  const res = await axios.get(`${POLA_URL}/${id}`, { withCredentials: true });
  return res.data;
};

const create = async (data: AddPoleSchema): Promise<PolaSchema> => {
  const res = await axios.post(POLA_URL, data, { withCredentials: true });
  return res.data;
};

const update = async (
  id: string,
  data: EditPoleSchema
): Promise<PolaSchema> => {
  console.log(data);

  const res = await axios.put(`${POLA_URL}/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
};

const remove = async (id: string): Promise<PolaSchema> => {
  const res = await axios.delete(`${POLA_URL}/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

export const polaService = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
