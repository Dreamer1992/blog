import React, { FC } from "react";
import { IBlog } from "../../../../types/BlogTypes";
import { Link } from "react-router-dom";
import cn from "./CartVert.module.css";

interface IProps {
	blog: IBlog,
}

const CartVert: FC<IProps> = ({ blog }) => {
	return (
		<div className="card shadow">
			<div className={cn.image}>
				{
					typeof (blog.thumbnail) === "string" && (
						<img src={blog.thumbnail}
							 className="card-img-top"
							 alt={blog.title}
						/>
					)
				}
			</div>
			<div className="card-body d-flex flex-column">
				<h5 className={`${cn.cardText} card-title`}>
					<Link to={`/blog/${blog._id}`}>
						{blog.title.slice(0, 50) + "..."}
					</Link>
				</h5>
				<p className="card-text">
					{blog.description.slice(0, 100) + "..."}
				</p>

				<p className="card-text mt-auto d-flex justify-content-between">
					<small className="text-muted">
						{
							typeof (blog.user) !== "string" && (
								<Link to={`/profile/${blog.user._id}`}>
									Автор: {blog.user.name}
								</Link>
							)
						}
					</small>

					<small className="text-muted">
						{new Date(blog.createdAt).toLocaleString()}
					</small>
				</p>
			</div>
		</div>
	);
};

export default CartVert;