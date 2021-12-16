import React, { FC, useEffect, useRef, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { NotFoundPage } from "../../../pages";
import CreateForm from "./CreateForm/CreateForm";
import { IBlog } from "../../../types/BlogTypes";
import Quill from "../../common/Editor/Quill";
import { shallowEqual, validateCreateBlog } from "../../../utils/validate";
import { ALERT } from "../../../redux/types/alertType";
import { createBlog, updateBlog } from "../../../redux/actions/blogAction";
import CardHoriz from "./CardHoriz/CardHoriz";
import { getAPI } from "../../../api/FetchData";
import { IUser } from "../../../types/Types";

interface IProps {
	id?: string;
}

const CreateBlog: FC<IProps> = ({ id }) => {
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

	const [oldData, setOldData] = useState<IBlog>(initState);

	const divRef = useRef<HTMLDivElement>(null);

	const { auth } = useTypedSelector((state) => state);

	useEffect(() => {
		if (!id) return;

		getAPI(`blog/${id}`)
			.then(res => {
				setBlog(res.data);
				setBody(res.data.content);
				setOldData(res.data);
			})
			.catch(e => console.log(e));

		const initData = {
			user: "",
			title: "",
			content: "",
			description: "",
			thumbnail: "",
			category: "",
			createdAt: new Date().toISOString(),
		};

		return () => {
			setBlog(initData);
			setBody("");
			setOldData(initData);
		};
	}, [id]);

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

		if (id) {
			if ((blog.user as IUser)._id !== auth.user?._id) {
				return dispatch({
					type: ALERT,
					payload: { errors: "Ошибка авторизации" },
				});
			}

			const result = shallowEqual(oldData, newData);
			if (result) {
				return dispatch({
					type: ALERT,
					payload: { errors: "Данные не изменены" },
				});
			}

			dispatch(updateBlog(newData, auth.access_token));
		} else {
			dispatch(createBlog(newData, auth.access_token));
		}
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

				<Quill setBody={setBody} body={body} />

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
						{
							id ? "Обновить пост" : "Создать пост"
						}
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateBlog;
