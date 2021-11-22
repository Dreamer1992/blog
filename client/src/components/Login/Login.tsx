import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoginPass from './LoginPass/LoginPass';
import { Link, useHistory } from 'react-router-dom';
import { CONSTANTS } from '../../utils/consts';
import cn from './Login.module.css';
import LoginSMS from './LoginSMS/LoginSMS';
import { RootStore } from '../../types/Types';
import SocialLogin from './SocialLogin/SocialLogin';

const Login = () => {
	const [sms, setSms] = useState(false);
	const history = useHistory();

	const { HOME, REGISTER } = CONSTANTS.ROUTES;

	const { auth } = useSelector((state: RootStore) => state);

	useEffect(() => {
		if (auth.access_token) history.push(HOME);
	}, [auth.access_token, history, HOME]);

	return (
		<div className="container">
			<div className={cn.authPage}>
				<div className={cn.authBox}>
					<h3 className='text-uppercase text-center mb-4'>Авторизоваться</h3>

					<SocialLogin />

					{sms ? <LoginSMS /> : <LoginPass />}

					<small className='row my-2 text-primary'>
						<div className='col-6'>
							<Link to='forgot_password' style={{ cursor: 'pointer' }}>
								Забыли пароль?
							</Link>
						</div>

						<div className='col-6 text-end'>
							<span style={{ cursor: 'pointer' }} onClick={() => setSms(!sms)}>
								{sms ? 'Войти через пароль' : 'Войти через смс'}
							</span>
						</div>
					</small>

					<p>
						У Вас нет аккаунта?
						<Link style={{ color: 'crimson', marginLeft: '8px' }} to={REGISTER}>
							Зарегистрироваться
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
