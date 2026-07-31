import { environment } from "@/configs/environment";
import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface CustomSession extends Session {
  accessToken?: string;
}

const headers = { "content-type": "application/json" };

export const instance = axios.create({
  baseURL: environment.API_URL,
  timeout: 60 * 1000,
  headers,
});

// Add a request interceptor
instance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const session: CustomSession | null = await getSession();

    if (session && session.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

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
