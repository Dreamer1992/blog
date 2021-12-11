import { ICategory } from "../../types/CategoryTypes";

export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

export interface ICreateCategoryAction {
	type: typeof CREATE_CATEGORY;
	payload: ICategory;
}

export interface IGetCategoriesAction {
	type: typeof GET_CATEGORIES;
	payload: ICategory[];
}

export interface IUpdateCategoryAction {
	type: typeof UPDATE_CATEGORY;
	payload: ICategory;
}

export interface IDeleteCategoryAction {
	type: typeof DELETE_CATEGORY;
	payload: string;
}

export type CategoryTypes =
	| ICreateCategoryAction
	| IGetCategoriesAction
	| IUpdateCategoryAction
	| IDeleteCategoryAction;
