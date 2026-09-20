import axiosClient from "./axiosClient";

export const createPaymentOrder = (request) => {
  return axiosClient.post("/api/v1/payments/create-order", request);
};

export const handleWebhook = (payload) => {
  return axiosClient.post("/api/v1/payments/webhook", payload);
};
