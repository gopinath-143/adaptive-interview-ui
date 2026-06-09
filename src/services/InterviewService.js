import axios from "axios";

const BASE_URL =
  "http://localhost:8080/api/interview";

export const startInterview =
  async (formData) => {

    return axios.post(
      `${BASE_URL}/start`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    );
};

export const submitAnswer =
  async (payload) => {

    return axios.post(
      `${BASE_URL}/answer`,
      payload
    );
};

export const getResults =
  async () => {

    return axios.get(
      `${BASE_URL}/results`
    );
};

export const getInterviewStatus =
    async (sessionId) => {

        return axios.get(
            `http://localhost:8080/api/interview/status/${sessionId}`
        );
    };