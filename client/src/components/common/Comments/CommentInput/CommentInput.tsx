import React, { FC, useRef, useState } from "react";
import LightQuill from "../../Editor/LightQuill";

interface IProps {
	callback: (body: string) => void,
}

const CommentInput: FC<IProps> = ({ callback }) => {
	const [body, setBody] = useState("");
	const divRef = useRef<HTMLDivElement>(null);

	const handleChange = () => {
		const div = divRef.current;
		const text = (div?.innerText as string);

		if (!text.trim()) return;

		callback(text);
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
				Отправить
			</button>
		</>
	);
};

export default CommentInput;