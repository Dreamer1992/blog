import {HOME, LOGIN, REGISTER} from './utils/consts';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";

export const routes = [
    {
        path: HOME,
        Component: HomePage,
    },
    {
        path: LOGIN,
        Component: LoginPage,
    },
    {
        path: REGISTER,
        Component: RegisterPage,
    },
    {
        path: '*',
        Component: NotFoundPage,
    },
]