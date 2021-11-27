import React, { FC } from "react";
import { Link } from "react-router-dom";
import CartVert from "./CartVert/CartVert";
import cn from "./HomeBlog.module.css";
import { IBlogs } from "../../../types/BlogTypes";

interface IProps {
	blogs: IBlogs[],
}

const HomeBlog: FC<IProps> = ({ blogs }) => {
	return (
		<div className={cn.homeBlogPage}>
			{
				blogs?.map(blog => (
					<div key={blog._id}>
						<h3>
							<Link to={`/blogs/${(blog.name).toLowerCase()}`}>
								{blog.name}
								<small>({blog.count})</small>
							</Link>
						</h3>
						<hr className="mt-1" />

						<div className={cn.homeBlogs}>
							{
								blog.blogs?.map(blogItem => (
									<CartVert key={blogItem._id} blog={blogItem} />
								))
							}
						</div>

						{
							blog.count > 4 && (
								<Link className="text-end d-block mt-2 mb-3"
									  to={`/blogs/${blog.name}`}
								>
									Все блоги &gt;&gt;
								</Link>
							)
						}
					</div>
				))
			}
		</div>
	);
};

export default HomeBlog;