import {ICategory} from "../../types/CategoryTypes";

export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const GET_CATEGORIES = "GET_CATEGORIES";

export interface ICreateCategory {
    type: typeof CREATE_CATEGORY,
    payload: ICategory,
}

export interface IGetCategories {
    type: typeof GET_CATEGORIES,
    payload: ICategory[],
}

export type CategoryTypes = ICreateCategory | IGetCategories;