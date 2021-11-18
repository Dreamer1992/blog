import {CREATE_CATEGORY, GET_CATEGORIES, CategoryTypes} from "../types/categoryTypes";
import {ICategory} from "../../types/CategoryTypes";

const categoryReducer = (state: ICategory[] = [], action: CategoryTypes): ICategory[] => {
    switch (action.type) {
        case CREATE_CATEGORY:
            return [...state, action.payload];
        case GET_CATEGORIES:
            return action.payload;
        default:
            return state;
    }
}

export default categoryReducer;