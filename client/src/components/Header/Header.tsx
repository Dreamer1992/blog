import React from 'react';
import { CONSTANTS } from '../../utils/consts';
import { Link } from 'react-router-dom';
import Search from './Search/Search';
import Menu from './Menu/Menu';

const Header = () => {
	return (
		<header>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
				<Link className="navbar-brand" to={CONSTANTS.ROUTES.HOME}>
					Блог веб-разработки
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="navbarNav">
					<Search />
					<Menu />
				</div>
			</nav>
		</header>
	);
};

export default Header;
