import { environment } from "@/configs/environment";
import axios from "axios";

const headers = { "content-type": "application/json" };

export const instance = axios.create({
  baseURL: environment.API_URL,
  timeout: 60 * 1000,
  headers,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // TODO: pasang kembali header Authorization di sini setelah route
    // `pages/api/auth/[...nextauth].ts` dibuat:
    //   const session: CustomSession | null = await getSession();
    //   if (session?.accessToken) {
    //     config.headers.Authorization = `Bearer ${session.accessToken}`;
    //   }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
