import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FormSubmit } from "../../types/Types";
import cn from "../../components/Register/RegisterForm/RegisterForm.module.css";
import { resetPassword } from "../../redux/actions/userAction";

interface IParams {
	token: string;
}

const ResetPasswordPage = () => {
	const { token } = useParams<IParams>();
	const dispatch = useDispatch();

	const [password, setPassword] = useState("");
	const [cf_password, setCfPassword] = useState("");
	const [typePass, setTypePass] = useState(false);
	const [typeCfPass, setTypeCfPass] = useState(false);

	const handleSubmit = (e: FormSubmit) => {
		e.preventDefault();
		dispatch(resetPassword(password, cf_password, token));
	};

	return (
		<form onSubmit={handleSubmit} className="col-4 my-4 mx-auto">
			<h3 className="text-uppercase text-center">Сбросить пароль</h3>

			<div className="form-group mb-4">
				<label htmlFor="account">Пароль</label>
				<div className={cn.pass}>
					<input
						type={typePass ? "text" : "password"}
						className="form-control"
						id="password"
						name="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<small className={cn.small} onClick={() => setTypePass(!typePass)}>
						{typePass ? <i className="far fa-eye-slash" /> : <i className="far fa-eye" />}
					</small>
				</div>
			</div>

			<div className="form-group mb-4">
				<label htmlFor="cf_account">Подтвердите пароль</label>
				<div className={cn.pass}>
					<input
						type={typeCfPass ? "text" : "password"}
						className="form-control"
						id="cf_password"
						name="cf_password"
						value={cf_password}
						onChange={e => setCfPassword(e.target.value)}
					/>
					<small className={cn.small} onClick={() => setTypeCfPass(!typeCfPass)}>
						{typeCfPass ? <i className="far fa-eye-slash" /> : <i className="far fa-eye" />}
					</small>
				</div>
			</div>

			<button type="submit" className="btn btn-dark w-100 mb-3">
				Отправить
			</button>
		</form>
	);
};

export default ResetPasswordPage;