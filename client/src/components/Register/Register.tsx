import React from 'react';
import { Link } from 'react-router-dom';
import { CONSTANTS } from '../../utils/consts';
import cn from './Register.module.css';
import RegisterForm from './RegisterForm/RegisterForm';

const Register = () => {
	return (
		<div className='container'>
			<div className={cn.authPage}>
				<div className={cn.authBox}>
					<h3 className='text-uppercase text-center mb-4'>Зарегистрироваться</h3>

					<RegisterForm />

					<p>
						Есть аккаунт?
						<Link style={{ color: 'crimson', marginLeft: '8px' }} to={CONSTANTS.ROUTES.LOGIN}>
							Авторизоваться
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
