import {Dispatch} from "redux";
import {ALERT, AlertType} from "../types/alertType";
import {CategoryTypes, CREATE_CATEGORY, GET_CATEGORIES} from "../types/categoryTypes";
import {getAPI, postAPI} from "../../api/FetchData";

export const createCategory = (
    name: string, token: string
) => async (dispatch: Dispatch<AlertType | CategoryTypes>) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}});

        const res = await postAPI('category', {name}, token);
        dispatch({type: CREATE_CATEGORY, payload: res.data.newCategory});

        dispatch({type: ALERT, payload: {loading: false}});
    } catch (e: any) {
        dispatch({type: ALERT, payload: {errors: e.response.data.msg}});
    }
}

export const getCategories = () => async (dispatch: Dispatch<AlertType | CategoryTypes>) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}});

        const res = await getAPI('category');
        dispatch({type: GET_CATEGORIES, payload: res.data.categories});

        dispatch({type: ALERT, payload: {loading: false}});
    } catch (e: any) {
        dispatch({type: ALERT, payload: {errors: e.response.data.msg}});
    }
}