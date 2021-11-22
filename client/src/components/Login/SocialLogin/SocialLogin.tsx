import React from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login-lite";
import { googleLogin } from "../../../redux/actions/authAction";

const SocialLogin = () => {
	const dispatch = useDispatch();

	const onSuccess = (googleUser: GoogleLoginResponse) => {
		let tokenId = googleUser.getAuthResponse().id_token;
		dispatch(googleLogin(tokenId));
	};

	return (
		<div className="mb-2">
			<GoogleLogin
				client_id="694747118110-80cd6s4q1fun47v0groo2k74squiu22c.apps.googleusercontent.com"
				cookiepolicy="single_host_origin"
				onSuccess={onSuccess}
				longtitle={false}
				theme="light"
			/>
		</div>
	);
};

export default SocialLogin;
