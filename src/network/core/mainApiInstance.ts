import axios from "axios";

export const mainApiInstance = axios.create({
  baseURL: "https://northwind.vercel.app/api",
  timeout: 9000,
});
