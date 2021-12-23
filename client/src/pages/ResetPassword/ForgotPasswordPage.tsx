import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FormSubmit } from "../../types/Types";
import { forgotPassword } from "../../redux/actions/authAction";

const ForgotPasswordPage = () => {
	const [account, setAccount] = useState("");
	const dispatch = useDispatch();

	const handleSubmit = (e: FormSubmit) => {
		e.preventDefault();
		dispatch(forgotPassword(account));
	};

	return (
		<div className="my-4" style={{ maxWidth: "500px" }}>
			<h2>Восстановление пароля</h2>

			<form className="form-group" onSubmit={handleSubmit}>
				<label htmlFor="account">Почта / Номер телефона</label>

				<div className="d-flex align-items-center">
					<input type="text" className="form-control" id="account"
						   name="account" onChange={e => setAccount(e.target.value)} />

					<button className="btn btn-primary mx-2 d-flex align-items-center"
							type="submit">
						<i className="fas fa-paper-plane me-2" /> Отправить
					</button>
				</div>
			</form>
		</div>
	);
};

export default ForgotPasswordPage;