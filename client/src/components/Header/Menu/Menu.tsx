import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONSTANTS } from '../../../utils/consts';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../../types/Types';
import { logout } from '../../../redux/actions/authAction';

const Menu = () => {
	const { auth } = useSelector((state: RootStore) => state);
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	const { LOGIN, REGISTER } = CONSTANTS.ROUTES;

	const isActive = (pn: string) => {
		if (pn === pathname) return 'active';
	};

	const bfLoginLinks = [
		{ label: 'Войти', path: LOGIN },
		{ label: 'Зарегистрироваться', path: REGISTER },
	];

	return (
		<ul className="navbar-nav mb-2 mb-lg-0">
			{!auth.access_token &&
				bfLoginLinks.map((link, index) => (
					<li key={index} className="nav-item">
						<Link
							className={`nav-link ${isActive(link.path) ? "text-danger" : "text-secondary"}`}
							style={{ whiteSpace: "nowrap" }}
							to={link.path}
						>
							{link.label}
						</Link>
					</li>
				))}

			{auth.user && (
				<li className="nav-item dropdown">
					<span
						className="nav-link dropdown-toggle"
						id="navbarDropdown"
						role="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<img
							src={auth.user.avatar}
							className="img-thumbnail"
							alt="avatar"
							style={{
								width: "30px",
								height: "30px",
								borderRadius: "50%",
								marginRight: "5px",
							}}
						/>
						{auth.user.name}
					</span>

					<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
						<li>
							<Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
								Профиль
							</Link>
						</li>
						<li>
							<hr className="dropdown-divider" />
						</li>
						<li>
							<Link className="dropdown-item" to="/" onClick={() => dispatch(logout())}>
								Выйти
							</Link>
						</li>
					</ul>
				</li>
			)}
		</ul>
	);
};

export default Menu;
