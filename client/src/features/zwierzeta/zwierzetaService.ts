import { constants } from "@/utils/constants";
import axios from "axios";
import ZwierzetaSchema from "./types/ZwierzetaSchema";
import AddZwierzetaSchema from "./types/AddZwierzetaSchema";
import UpdateZwierzetaSchema from "./types/UpdateZwierzetaSchema";
import { ZwierzetaHealthStatus } from "./types/ZwierzetaHealthStatus";

const ZWIERZETA_URL = `${constants.API_URL}/animal`;

const getAll = async (): Promise<ZwierzetaSchema[]> => {
  const res = await axios.get(ZWIERZETA_URL);
  return res.data;
};

const getOne = async (id: string): Promise<ZwierzetaSchema> => {
  const res = await axios.get(`${ZWIERZETA_URL}/${id}`);
  return res.data;
};

const create = async (data: AddZwierzetaSchema): Promise<ZwierzetaSchema> => {
  if (data.birthDate) data.birthDate = new Date(data.birthDate).toISOString();
  const res = await axios.post(ZWIERZETA_URL, data);
  return res.data;
};

const update = async (
  id: string,
  data: UpdateZwierzetaSchema
): Promise<ZwierzetaSchema> => {
  data.birthDate = new Date(data.birthDate).toISOString();
  const res = await axios.put(`${ZWIERZETA_URL}/${id}`, data);
  return res.data;
};

const remove = async (id: string): Promise<ZwierzetaSchema> => {
  const res = await axios.delete(`${ZWIERZETA_URL}/${id}`);
  return res.data;
};

const updateHealth = async (
  id: string,
  data: { status: ZwierzetaHealthStatus }
): Promise<ZwierzetaSchema> => {
  const res = await axios.put(`${ZWIERZETA_URL}/${id}/health`, data);
  return res.data;
};

export const zwierzetaService = {
  getAll,
  getOne,
  create,
  update,
  remove,
  updateHealth,
};
