import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import categories from "./categoryReducer";
import blogs from "./blogReducer";
import profile from "./profileReducer";

export default combineReducers({
	auth,
	alert,
	categories,
	blogs,
	profile,
});
