import { add_message, delete_message } from "./types";
import axios from "axios";

export const saveMessage = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("http://localhost:5005/api/messages", data);

    console.log(res.data); // Handle the response from the backend
  } catch (error) {
    console.error(error); // Handle any errors that occur during the request
  }
};
