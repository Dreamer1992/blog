import React, { FC } from "react";
import { IBlog } from "../../../types/BlogTypes";
import CartVert from "../HomeBlog/CartVert/CartVert";
import cn from "./BlogsSpecificCategory.module.css";
import Pagination from "../../common/Pagination/Pagination";

interface IProps {
	blogs: IBlog[];
	total: number;
	callback: (page: number) => void;
}

const BlogsSpecificCategory: FC<IProps> = ({ blogs, total, callback }) => {
	return (
		<div className={cn.blogsCategory}>
			<div className={cn.blogsItem}>
				{
					blogs?.map(blog => (
						<CartVert key={blog._id} blog={blog} />
					))
				}
			</div>

			{
				total > 1 && (
					<Pagination total={total} callback={callback} />
				)
			}
		</div>
	);
};

export default BlogsSpecificCategory;