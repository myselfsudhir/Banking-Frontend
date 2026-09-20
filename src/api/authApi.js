import axiosClient from "./axiosClient";

export const login = (loginRequest) => {
  return axiosClient.post("api/v1/auth/login", loginRequest);
};

export const register = (user) => {
  return axiosClient.post("api/v1/auth/register", user);
};
