import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { IBlog } from "../../../../types/BlogTypes";
import { CONSTANTS } from "../../../../utils/consts";
import { IUser } from "../../../../types/Types";


interface IProps {
	blog: IBlog;
}

const CardHoriz: FC<IProps> = ({ blog }) => {
	const { auth } = useTypedSelector(state => state);

	return (
		<div className="card mb-3" style={{ minWidth: "280px" }}>
			<div className="row g-0">
				<div className="col-md-4 py-4">
					{blog.thumbnail && (
						<div style={{ maxHeight: 211, overflow: "hidden" }}>
							{typeof blog.thumbnail === "string" ? (
								<Link to={`/blog/${blog._id}`}>
									<img src={blog.thumbnail}
										 className="img-fluid"
										 alt="thumbnail"
									/>
								</Link>
							) : (
								<img
									src={URL.createObjectURL(blog.thumbnail)}
									className="img-fluid"
									alt="thumbnail"
								/>
							)}
						</div>
					)}
				</div>

				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">
							<Link
								to={`/blog/${blog._id}`}
								className="text-decoration-none"
							>
								{blog.title}
							</Link>
						</h5>
						<p className="card-text">{blog.description}</p>
						{
							blog.title && (
								<p className="card-text d-flex justify-content-between">
									{
										((blog.user as IUser)._id === auth.user?._id) && (
											<small>
												<Link to={`${CONSTANTS.ROUTES.UPDATE_BLOG}/${blog._id}`}>Обновить</Link>
											</small>
										)
									}

									<small className="text-muted ms-auto">
										{new Date(blog.createdAt).toLocaleString()}
									</small>
								</p>
							)
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardHoriz;
