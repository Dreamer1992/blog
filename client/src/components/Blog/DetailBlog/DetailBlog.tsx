import React, { FC } from "react";
import { IBlog } from "../../../types/BlogTypes";

interface IProps {
	blog: IBlog;
}

const DetailBlog: FC<IProps> = ({ blog }) => {
	return (
		<div>
			<h2 className="text-warning my-3 fs-1">{blog.title}</h2>

			<h6 className="text-end text-dark fst-italic">
				<small>
					{
						typeof (blog.user) !== "string" && (
							`Автор: ${blog.user.name} `
						)
					}
				</small>

				<small className="ms-2">
					{new Date(blog.createdAt).toLocaleString()}
				</small>
			</h6>

			<div dangerouslySetInnerHTML={{
				__html: blog.content,
			}} />
		</div>
	);
};

export default DetailBlog;