import { CONSTANTS } from './utils/consts';
import {
	ActivationPage,
	CategoryPage,
	CreateBlogPage,
	HomePage,
	LoginPage,
	NotFoundPage,
	ProfilePage,
	RegisterPage,
} from './pages';

const { HOME, LOGIN, REGISTER, ACTIVATION, PROFILE, CATEGORY, CREATE_BLOG } = CONSTANTS.ROUTES;

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
		path: CATEGORY,
		Component: CategoryPage,
		exact: true,
	},
	{
		path: CREATE_BLOG,
		Component: CreateBlogPage,
		exact: true,
	},
	{
		path: '*',
		Component: NotFoundPage,
		exact: true,
	},
];
