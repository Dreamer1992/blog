import React, {useState} from 'react';
import {InputChange} from '../../../types/CommonType'
import cn from './LoginPass.module.css';

const LoginPass = () => {
    const initialState = {account: '', password: ''};
    const [userLogin, setUserLogin] = useState(initialState);
    const {account, password} = userLogin;

    const [typePass, setTypePass] = useState(false);

    const handleChangeInput = (e: InputChange) => {
        const {value, name} = e.target;
        setUserLogin({...userLogin, [name]: value});
    }

    return (
        <form>
            <div className="form-group mb-1">
                <label htmlFor="account">Почта или номер телефона</label>
                <input
                    type="text"
                    className="form-control"
                    id="account"
                    name="account"
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

            <button
                type="submit"
                className="btn btn-dark w-100"
                disabled={(account && password) ? false : true}
            >
                Войти
            </button>
        </form>
    );
};

export default LoginPass;