import {CONSTANTS} from './utils/consts';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import ActivationPage from "./pages/ActivationPage";
import ProfilePage from "./pages/ProfilePage";

const {HOME, LOGIN, REGISTER, ACTIVATION, PROFILE} = CONSTANTS.ROUTES;

export const routes = [
    {
        path: HOME,
        Component: HomePage,
        exact: true,
    },
    {
        path: LOGIN,
        Component: LoginPage,
        exact: true,
    },
    {
        path: REGISTER,
        Component: RegisterPage,
        exact: true,
    },
    {
        path: `${ACTIVATION}/:active_token`,
        Component: ActivationPage,
        exact: false,
    },
    {
        path: PROFILE,
        Component: ProfilePage,
        exact: false,
    },
    {
        path: '*',
        Component: NotFoundPage,
        exact: true,
    },
]