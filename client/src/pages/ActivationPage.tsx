import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {IActivationParams} from "../types/Types";
import {postAPI} from "../api/FetchData";
import {showErrMsg, showSuccessMsg} from "../components/Notification/Alert/Alert";

const ActivationPage = () => {
    const {active_token}: IActivationParams = useParams();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (active_token) {
            postAPI('active', {active_token})
                .then(res => setSuccess(res.data.msg))
                .catch(err => setError(err.response.data.msg));
        }
    }, [active_token]);

    return (
        <div className="container">
            {error && showErrMsg(error)}
            {success && showSuccessMsg(success)}
        </div>
    );
};

export default ActivationPage;