import React, { useEffect, useState } from "react";
import DetailBlog from "../../components/Blog/DetailBlog/DetailBlog";
import { useParams } from "react-router-dom";
import { IBlog } from "../../types/BlogTypes";
import { getAPI } from "../../api/FetchData";
import { showErrMsg } from "../../components/Notification/Alert/Alert";

interface IParams {
	id: string;
}

const DetailBlogPage = () => {
	const { id } = useParams<IParams>();

	const [blog, setBlog] = useState<IBlog | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!id) return;

		getAPI(`blog/${id}`)
			.then(res => {
				setBlog(res.data);
				setLoading(false);
			})
			.catch(e => {
				setError(e.response.data.msg);
				setLoading(false);
			});

		return () => setBlog(null);
	}, [id]);

	if (loading) return null;

	if (error) return (
		<div className="my-4">
			{showErrMsg(error)}
		</div>
	);

	return (
		<>
			{blog && <DetailBlog blog={blog} />}

			<h2>Comments</h2>
		</>
	);
};

export default DetailBlogPage;