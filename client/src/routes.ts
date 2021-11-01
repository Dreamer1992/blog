import {HOME, LOGIN, REGISTER} from './utils/consts';
import {Home, Login, NotFound, Register} from './pages/index';

export const routes = [
    {
        path: HOME,
        Component: Home,
    },
    {
        path: LOGIN,
        Component: Login,
    },
    {
        path: REGISTER,
        Component: Register,
    },
    {
        path: '*',
        Component: NotFound
    },
]