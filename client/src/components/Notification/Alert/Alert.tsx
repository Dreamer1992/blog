import React from 'react';
import Loading from "../Loading/Loading";
import {useSelector} from "react-redux";
import {RootStore} from "../../../types/Types";
import Toast from "../Toast/Toast";

const Alert = () => {
    const {alert} = useSelector((state: RootStore) => state);

    return (
        <div>
            {alert.loading && <Loading/>}

            {
                alert.errors && <Toast
                    title="Ошибка"
                    body={alert.errors}
                    bgColor="bg-danger"
                />
            }

            {
                alert.success && <Toast
                    title="Успешно"
                    body={alert.success}
                    bgColor="bg-success"
                />
            }
        </div>
    );
};

export default Alert;