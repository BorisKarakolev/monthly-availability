import axios from "axios";
import { FETCH_SLOTS } from "./types";

export const fetchSlots = () => async (dispatch) =>
  dispatch({
    type: FETCH_SLOTS,
    payload: await axios.get("http://localhost:4200/"),
  });
