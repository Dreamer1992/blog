import React, {useState} from 'react';
import LoginPass from "./LoginPass/LoginPass";
import {Link} from 'react-router-dom';
import {REGISTER} from "../../utils/consts";
import cn from './Login.module.css';
import LoginSMS from './LoginSMS/LoginSMS';

const Login = () => {
    const [sms, setSms] = useState(false);

    return (
        <div className="container">
            <div className={cn.authPage}>
                <div className={cn.authBox}>
                    <h3 className="text-uppercase text-center mb-4">Авторизоваться</h3>

                    {sms ? <LoginSMS/> : <LoginPass/>}

                    <small className="row my-2 text-primary">
                        <div className="col-6">
                            <Link
                                to="forgot_password"
                                style={{cursor: "pointer"}}
                            >
                                Забыли пароль?
                            </Link>
                        </div>

                        <div className="col-6 text-end">
                            <span
                                style={{cursor: "pointer"}}
                                onClick={() => setSms(!sms)}
                            >
                                {sms ? 'Войти через пароль' : 'Войти через смс'}
                            </span>
                        </div>
                    </small>

                    <p>
                        У Вас нет аккаунта?
                        <Link
                            style={{color: 'crimson', marginLeft: '8px'}}
                            to={REGISTER}
                        >Зарегистрироваться</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;