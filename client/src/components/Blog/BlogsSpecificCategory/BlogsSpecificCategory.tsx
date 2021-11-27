import React, { FC } from "react";
import { IBlog } from "../../../types/BlogTypes";
import CartVert from "../HomeBlog/CartVert/CartVert";
import cn from "./BlogsSpecificCategory.module.css";

interface IProps {
	blogs: IBlog[];
	total: number;
}

const BlogsSpecificCategory: FC<IProps> = ({ blogs, total }) => {
	return (
		<div className={cn.blogsCategory}>
			<div className={cn.blogsItem}>
				{
					blogs?.map(blog => (
						<CartVert key={blog._id} blog={blog} />
					))
				}
			</div>
		</div>
	);
};

export default BlogsSpecificCategory;