import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CONSTANTS } from "../../utils/consts";
import { useSelector } from "react-redux";
import { RootStore } from "../../types/Types";
import cn from "./Sidebar.module.css";

const Sidebar = () => {
	const { pathname } = useLocation();
	const { auth } = useSelector((state: RootStore) => state);

	const { HOME, CREATE_BLOG, CATEGORY } = CONSTANTS.ROUTES;

	const afLoginLinks = [
		{ label: "Блоги", path: HOME },
		{ label: "Создать блог", path: CREATE_BLOG },
	];

	const isActive = (pn: string) => {
		if (pn === pathname) return "active";
	};

	if (!auth.access_token) return null;

	return (
		<div className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
			<nav id="sidebarMenu" className={`${cn.sidebarMenu}`}>
				<div className="position-sticky pt-3">
					<ul className="nav flex-column">
						{auth.user?.role === CONSTANTS.ROLE.ADMIN && (
							<li className={`nav-item ${isActive("/category")}`}>
								<Link
									className={`nav-link ${isActive(CATEGORY) ? "text-danger" : "text-secondary"}`}
									to="/category"
								>
									Категории
								</Link>
							</li>
						)}

						{afLoginLinks.map((link, index) => (
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
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Sidebar;
