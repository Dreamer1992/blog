import { CONSTANTS } from "./utils/consts";
import {
	ActivationPage,
	BlogHomePage,
	BlogsSpecificCategoryPage,
	CategoryPage,
	CreateBlogPage,
	DetailBlogPage, ForgotPasswordPage,
	LoginPage,
	NotFoundPage,
	ProfilePage,
	RegisterPage, ResetPasswordPage,
	UpdateBlogPage,

} from "./pages";

const {
	HOME,
	LOGIN,
	REGISTER,
	ACTIVATION,
	PROFILE,
	CATEGORY,
	CREATE_BLOG,
	UPDATE_BLOG,
	BLOGS_SPECIFIC_CATEGORY,
	DETAIL_BLOG,
	FORGOT_PASSWORD,
	RESET_PASSWORD,
} = CONSTANTS.ROUTES;

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
		path: FORGOT_PASSWORD,
		Component: ForgotPasswordPage,
		exact: true,
	},
	{
		path: RESET_PASSWORD,
		Component: ResetPasswordPage,
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
		path: `${UPDATE_BLOG}/:blog_id`,
		Component: UpdateBlogPage,
		exact: true,
	},
	{
		path: BLOGS_SPECIFIC_CATEGORY,
		Component: BlogsSpecificCategoryPage,
		exact: false,
	},
	{
		path: DETAIL_BLOG,
		Component: DetailBlogPage,
		exact: true,
	},
	{
		path: "*",
		Component: NotFoundPage,
		exact: true,
	},
];
