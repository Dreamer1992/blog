import React from 'react';
import {Link} from "react-router-dom";
import {LOGIN, REGISTER} from "../../../utils/consts";

const Menu = () => {
    const bfLoginLinks = [
        {label: 'Войти', path: LOGIN},
        {label: 'Зарегистрироваться', path: REGISTER},
    ]

    return (
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {
                bfLoginLinks.map((link, index) => (
                    <li key={index} className="nav-item">
                        <Link className="nav-link" to={link.path}>
                            {link.label}
                        </Link>
                    </li>
                ))
            }

            <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                  data-bs-toggle="dropdown" aria-expanded="false"
                            >
                                Пользователь
                            </span>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/profile">Профиль</Link></li>
                    <li>
                        <hr className="dropdown-divider"/>
                    </li>
                    <li><Link className="dropdown-item" to="#">Выйти</Link></li>
                </ul>
            </li>
        </ul>
    );
};

export default Menu;