import { constants } from "@/utils/constants";
import GetStatsSchema from "./schema/GetStatsSchema";
import axios from "axios";

const STATS_URL = `${constants.API_URL}/stats`;

const getStats = async (): Promise<GetStatsSchema> => {
  const data = await axios.get(STATS_URL, { withCredentials: true });
  return data.data;
};

export const statsService = { getStats };
