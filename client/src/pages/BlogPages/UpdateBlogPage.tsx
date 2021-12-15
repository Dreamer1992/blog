import React from "react";
import { useParams } from "react-router-dom";
import UpdateBlog from "../../components/Blog/UpdateBlog/UpdateBlog";

interface IParams {
	blog_id: string;
}

const UpdateBlogPage = () => {
	const { blog_id } = useParams<IParams>();

	return <UpdateBlog blog_id={blog_id} />;
};

export default UpdateBlogPage;