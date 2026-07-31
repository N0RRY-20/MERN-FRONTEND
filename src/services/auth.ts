import { instance } from "@/lib/axios/instance";
import { endpoint } from "./endpoint";
import { IRegister } from "@/types/auth";

export const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
};
