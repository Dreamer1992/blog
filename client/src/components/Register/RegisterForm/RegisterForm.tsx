import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {FormSubmit, InputChange} from '../../../types/Types';
import cn from './RegisterForm.module.css';
import {register} from '../../../redux/actions/authAction';

const RegisterForm = () => {
    const initialState = {
        name: '',
        account: '',
        password: '',
        cf_password: '',
    };
    const [userRegister, setUserRegister] = useState(initialState);
    const {name, account, password, cf_password} = userRegister;

    const [typePass, setTypePass] = useState(false);
    const [typeCfPass, setTypeCfPass] = useState(false);

    const dispatch = useDispatch();

    const handleChangeInput = (e: InputChange) => {
        const {value, name} = e.target;
        setUserRegister({...userRegister, [name]: value});
    }

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault();
        dispatch(register(userRegister));
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="name">Имя</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Иван"
                    onChange={handleChangeInput}
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="account">Почта или номер телефона</label>
                <input
                    type="text"
                    className="form-control"
                    id="account"
                    name="account"
                    placeholder="ivan@gmail.com / +79381112233"
                    value={account}
                    onChange={handleChangeInput}
                />
            </div>

            <div className="form-group mb-4">
                <label htmlFor="account">Пароль</label>
                <div className={cn.pass}>
                    <input
                        type={typePass ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChangeInput}
                    />
                    <small
                        className={cn.small}
                        onClick={() => setTypePass(!typePass)}
                    >
                        {typePass ? 'Hide' : 'Show'}
                    </small>
                </div>
            </div>

            <div className="form-group mb-4">
                <label htmlFor="cf_account">Подтвердите пароль</label>
                <div className={cn.pass}>
                    <input
                        type={typePass ? "text" : "password"}
                        className="form-control"
                        id="cf_password"
                        name="cf_password"
                        value={cf_password}
                        onChange={handleChangeInput}
                    />
                    <small
                        className={cn.small}
                        onClick={() => setTypeCfPass(!typeCfPass)}
                    >
                        {typeCfPass ? 'Hide' : 'Show'}
                    </small>
                </div>
            </div>

            <button
                type="submit"
                className="btn btn-dark w-100 mb-3"
            >
                Отправить
            </button>
        </form>
    );
};

export default RegisterForm;