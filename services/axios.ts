import axios from "axios";
import { getToken } from "../utils/session/manager";

export const axiosLogin = axios.create({
  baseURL: process.env.API_URL,
});

export const getApiAxios = async () => {
  const token = await getToken();

  const api = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return api;
};

export const postReceitasAxios = async () => {
  const token = await getToken();

  const api = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return api;
};
export const PostApiAxios = axios.create({
  baseURL: process.env.API_URL,
});
