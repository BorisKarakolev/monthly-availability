import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import slotsReducer from './slotsReducer'

export default combineReducers({
  form: reduxForm,
  slots: slotsReducer
});