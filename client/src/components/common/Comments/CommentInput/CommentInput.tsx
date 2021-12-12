import React, { FC, useEffect, useRef, useState } from "react";
import LightQuill from "../../Editor/LightQuill";
import { IComment } from "../../../../types/CommentTypes";

interface IProps {
	callback: (body: string) => void;
	edit?: IComment;
	setEdit?: (edit?: IComment) => void;
}

const CommentInput: FC<IProps> = ({ callback, edit, setEdit }) => {
	const [body, setBody] = useState("");
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (edit) setBody(edit.content);
	}, [edit]);

	const handleChange = () => {
		const div = divRef.current;
		const text = (div?.innerText as string);

		if (!text.trim()) {
			if (setEdit) setEdit(undefined);
			return;
		}

		callback(body);

		setBody("");
	};

	return (
		<>
			<LightQuill body={body} setBody={setBody} />

			<div ref={divRef} dangerouslySetInnerHTML={{
				__html: body,
			}} style={{ display: "none" }} />

			<button
				className="btn btn-success ms-auto d-block px-4 mt-4 mb-5"
				onClick={handleChange}
			>
				{edit ? "Обновить" : "Отправить"}
			</button>
		</>
	);
};

export default CommentInput;