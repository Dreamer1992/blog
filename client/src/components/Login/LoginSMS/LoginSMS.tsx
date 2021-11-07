import React, {useState} from 'react';
import {FormSubmit} from "../../../types/Types";
import {useDispatch} from "react-redux";
import {loginSMS} from "../../../redux/actions/authAction";

const LoginSms = () => {
    const dispatch = useDispatch();
    const [phone, setPhone] = useState('');

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault();
        dispatch(loginSMS(phone))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
                <label htmlFor="phone" className="form-label">Номер телефона</label>
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="form-control"
                    value={phone}
                    placeholder="+79381112233"
                    onChange={(e) => {
                        setPhone(e.target.value)
                    }}
                />
            </div>

            <button
                type="submit"
                className="btn btn-dark w-100"
                disabled={phone ? false : true}
            >
                Войти
            </button>
        </form>
    );
};

export default LoginSms;