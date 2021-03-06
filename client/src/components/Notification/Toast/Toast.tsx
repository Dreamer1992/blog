import React from 'react';
import { useDispatch } from 'react-redux';
import cn from './Toast.module.css';
import { ALERT } from '../../../redux/types/alertType';

interface IProps {
	title: string;
	body: string | string[];
	bgColor: string;
}

const Toast = ({ title, body, bgColor }: IProps) => {
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch({ type: ALERT, payload: {} });
	};

	return (
		<div
			className={`toast show text-light ${cn.toastWrapper} ${bgColor}`}
			role="alert"
			aria-live="assertive"
			aria-atomic="true"
		>
			<div className={`toast-header text-light ${bgColor}`}>
				<strong className="me-auto">{title}</strong>
				<button
					type="button"
					className="btn-close"
					data-bs-dismiss="toast"
					aria-label="Close"
					onClick={handleClose}
				/>
			</div>
			<div className="toast-body">
				{typeof body === 'string' ? (
					body
				) : (
					<ul>
						{body.map((text, index) => (
							<li key={index}>{text}</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Toast;
