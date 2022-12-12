import { FETCH_SLOTS } from "../actions/types";

const slotsData = (state = null, action) => {
  switch (action.type) {
    case FETCH_SLOTS:
      return action.payload.data || false;
    default:
      return state;
  }
};

export default slotsData