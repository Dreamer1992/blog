import { Dispatch } from "redux";
import { ALERT, AlertType } from "../types/alertType";
import {
	CategoryTypes,
	CREATE_CATEGORY,
	DELETE_CATEGORY,
	GET_CATEGORIES,
	UPDATE_CATEGORY,
} from "../types/categoryTypes";
import { deleteAPI, getAPI, patchAPI, postAPI } from "../../api/FetchData";
import { ICategory } from "../../types/CategoryTypes";

export const createCategory =
	(name: string, token: string) => async (dispatch: Dispatch<AlertType | CategoryTypes>) => {
		try {
			dispatch({ type: ALERT, payload: { loading: true } });

			const res = await postAPI("category", { name }, token);
			dispatch({ type: CREATE_CATEGORY, payload: res.data.newCategory });

			dispatch({ type: ALERT, payload: { loading: false } });
		} catch (e: any) {
			dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
		}
	};

export const getCategories = () => async (dispatch: Dispatch<AlertType | CategoryTypes>) => {
	try {
		dispatch({ type: ALERT, payload: { loading: true } });

		const res = await getAPI("category");
		dispatch({ type: GET_CATEGORIES, payload: res.data.categories });

		dispatch({ type: ALERT, payload: { loading: false } });
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};

export const updateCategory =
	(data: ICategory, token: string) => async (dispatch: Dispatch<AlertType | CategoryTypes>) => {
		try {
			dispatch({ type: ALERT, payload: { loading: true } });

			const res = await patchAPI(`category/${data._id}`, { name: data.name }, token);
			dispatch({ type: UPDATE_CATEGORY, payload: data });

			dispatch({ type: ALERT, payload: { loading: false } });
			dispatch({ type: ALERT, payload: { success: res.data.msg } });
		} catch (e: any) {
			dispatch({ type: ALERT, payload: { errors: e.response.data.nmsg } });
		}
	};

export const deleteCategory =
	(id: string, token: string) => async (dispatch: Dispatch<AlertType | CategoryTypes>) => {
		try {
			dispatch({ type: ALERT, payload: { loading: true } });

			const res = await deleteAPI(`category/${id}`, token);
			dispatch({ type: DELETE_CATEGORY, payload: id });

			dispatch({ type: ALERT, payload: { loading: false } });
			dispatch({ type: ALERT, payload: { success: res.data.msg } });
		} catch (e: any) {
			dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
		}
	};
