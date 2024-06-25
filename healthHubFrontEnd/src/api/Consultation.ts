import { Consultation } from "@/type";
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