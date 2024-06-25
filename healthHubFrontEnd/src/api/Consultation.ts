import { Consultation, MedcinTime } from "@/type";
import axios from "axios";

const host = "http://localhost:8083/api/v1/";
export const createConsultation = async (data: Consultation) => {
  return await axios
    .post(`${host}setConsultation`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res.data);
      return true;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
};
export const getConsultation = async (data: MedcinTime) => {
  return await axios
    .post(`${host}getConsultationToday`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

export const getPatientConsultation = async (id: string, idDoc: string) => {
  try {
    // Send POST request using Axios
    const response = await axios.post(
      `http://localhost:8083/api/v1/getPatientByIdAndIdDoc?id=${id}&idDoc=${idDoc}`
    );
    return response.data; // Return response data from the API
  } catch (error) {
    console.error("Error fetching patient consultation:", error);
    throw error; // Re-throw the error to propagate it up the call stack
  }
};

export const updateConsultation = async (data: Consultation) => {
  return await axios
    .put(`${host}modifiedConsultation`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res.data);
      return true;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}