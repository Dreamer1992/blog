import {HOME, LOGIN, REGISTER} from './utils/consts';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import Register from "./pages/Register";

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
        Component: Register,
    },
    {
        path: '*',
        Component: NotFoundPage,
    },
]