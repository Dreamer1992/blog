import {ALERT, IAlert, IAlertAction} from "../types/alertType";

const alertReducer = (state: IAlert = {}, action: IAlertAction): IAlert => {
    switch (action.type) {
        case ALERT:
            return action.payload;
        default:
            return state;
    }
}

export default alertReducer;