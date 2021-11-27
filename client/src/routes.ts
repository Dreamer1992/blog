import { CONSTANTS } from "./utils/consts";
import {
	ActivationPage,
	BlogHomePage,
	BlogsSpecificCategoryPage,
	CategoryPage,
	CreateBlogPage,
	LoginPage,
	NotFoundPage,
	ProfilePage,
	RegisterPage,
} from "./pages";

const { HOME, LOGIN, REGISTER, ACTIVATION, PROFILE, CATEGORY, CREATE_BLOG, BLOGS_SPECIFIC_CATEGORY } = CONSTANTS.ROUTES;

export const routes = [
	{
		path: HOME,
		Component: BlogHomePage,
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
		path: BLOGS_SPECIFIC_CATEGORY,
		Component: BlogsSpecificCategoryPage,
		exact: true,
	},
	{
		path: "*",
		Component: NotFoundPage,
		exact: true,
	},
];
