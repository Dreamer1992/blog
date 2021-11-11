import {IAuth} from "../types/authType";
import {Dispatch} from "redux";
import {ALERT, AlertType} from "../types/alertType";
import {checkImage} from "../../utils/imageUpload";

export const updateUser = (avatar: File, name: string, auth: IAuth) => async (dispatch: Dispatch<AlertType>) => {
    if (!auth.access_token || !auth.user) return;

    let url = '';

    try {
        dispatch({type: ALERT, payload: {loading: true}});

        if (avatar) {
            const check = checkImage(avatar);

            if (check) return dispatch({type: ALERT, payload: {errors: check}});

            const photo = await imageUpload(avatar);
            console.log('photo', photo);
        }

        dispatch({type: ALERT, payload: {loading: false}});
    } catch (e: any) {
        dispatch({type: ALERT, payload: {errors: e.response.data.msg}});
    }
};

export const imageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "povleg10");
    formData.append("cloud_name", "drw46ajkt");

    const res = await fetch("https://api.cloudinary.com/v1_1/drw46ajkt/image/upload", {
        method: "POST",
        body: formData,
    });

    const data = await res.json();
    return {public_id: data.public_id, url: data.secure_url};
};