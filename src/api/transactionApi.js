import axiosClient from "./axiosClient";

export const transfer = (transferRequest) => {
  return axiosClient.post("/api/v1/transactions/transfer", transferRequest);
};

export const getTransaction = (id) => {
  return axiosClient.get(`/api/v1/transactions/${id}`);
};

export const getTransactionHistory = (accountNumber) => {
  return axiosClient.get(`/api/v1/transactions/account/${accountNumber}`);
};

export const verifyOtp = (transactionId, otp) => {
  return axiosClient.post(
    `/api/v1/transactions/${transactionId}/verify`,
    null,
    {
      params: {
        otp,
      },
    },
  );
};
