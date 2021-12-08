import React, { FC } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IProps {
	body: string,
	setBody: (value: string) => void;
}

const LightQuill: FC<IProps> = ({ body, setBody }) => {
	let modules = {
		toolbar: [
			[{ font: [] }],
			["bold", "italic", "underline", "strike"],
			["blockquote", "code-block"],
			[{ color: [] }, { background: [] }],
			[{ script: "sub" }, { script: "super" }],
		],
	};

	return (
		<div className="text-editor">
			<ReactQuill
				theme="snow"
				modules={modules}
				placeholder="Введите описание"
				onChange={(e) => setBody(e)}
				value={body}
			/>
		</div>
	);
};

export default LightQuill;
