import React, { useEffect, useRef, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { NotFoundPage } from "../../pages";
import CreateForm from "./CreateForm/CreateForm";
import CardHoriz from "./CardHoriz/CardHoriz";
import { IBlog } from "../../types/BlogTypes";
import Quill from "./Editor/Quill";
import { validateCreateBlog } from "../../utils/validate";
import { ALERT } from "../../redux/types/alertType";
import { createBlog } from "../../redux/actions/blogAction";

const CreateBlog = () => {
	const dispatch = useDispatch();

	const initState = {
		user: "",
		title: "",
		content: "",
		description: "",
		thumbnail: "",
		category: "",
		createdAt: new Date().toISOString(),
	};

	const [blog, setBlog] = useState<IBlog>(initState);
	const [body, setBody] = useState("");

	const divRef = useRef<HTMLDivElement>(null);

	const { auth } = useTypedSelector((state) => state);

	useEffect(() => {
		const div = divRef.current;
		if (!div) return;

		const content = div?.innerHTML as string;
		setBlog({ ...blog, content });
	}, [body]);

	const handleSubmit = async () => {
		if (!auth.access_token) return;

		const check = validateCreateBlog({ ...blog });
		if (check.errLength !== 0) {
			return dispatch({ type: ALERT, payload: { errors: check.errMsg } });
		}

		let newData = { ...blog, content: body };

		dispatch(createBlog(newData, auth.access_token));
	};

	if (!auth.access_token) return <NotFoundPage />;

	return (
		<div className="my-4 create_blog">
			<div className="row mt-4">
				<div className="col-md-6">
					<h5>Создать</h5>
					<CreateForm blog={blog} setBlog={setBlog} />
				</div>

				<div className="col-md-6">
					<h5>Превью</h5>
					<CardHoriz blog={blog} />
				</div>

				<Quill setBody={setBody} />

				<div
					ref={divRef}
					dangerouslySetInnerHTML={{
						__html: body,
					}}
					className="d-none"
				/>
				<small>{blog.content.length}</small>

				<div className="col-12">
					<button className="btn btn-success mt-3 d-block mx-auto" onClick={handleSubmit}>
						Создать пост
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateBlog;
