import axiosClient from "./axiosClient";

export const createAccount = (requestData) => {
  return axiosClient.post("api/v1/accounts", requestData);
};

export const getAccount = (accountNumber) => {
  return axiosClient.get(`api/v1/accounts/${accountNumber}`);
};

export const getBalance = (accountNumber) => {
  return axiosClient.get(`api/v1/accounts/${accountNumber}/balance`);
};

export const blockAccount = (accountNumber) => {
  return axiosClient.put(`api/v1/accounts/${accountNumber}/block`);
};

export const deductBalance = (accountNumber, amount) => {
  return axiosClient.put(`api/v1/accounts/${accountNumber}/deduct`, { amount });
};

export const creditBalance = (accountNumber, amount) => {
  return axiosClient.put(`api/v1/accounts/${accountNumber}/creditBalance`, {
    amount,
  });
};
