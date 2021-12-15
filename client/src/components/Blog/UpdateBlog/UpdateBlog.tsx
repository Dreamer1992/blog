import React, { FC } from "react";
import CreateBlog from "../CreateBlog/CreateBlog";

interface IProps {
	blog_id: string;
}

const UpdateBlog: FC<IProps> = ({ blog_id }) => {
	return <CreateBlog id={blog_id} />;
};

export default UpdateBlog;