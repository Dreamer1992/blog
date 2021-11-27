import React, { FC, useCallback, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { checkImage } from "../../../../utils/imageUpload";
import { useDispatch } from "react-redux";
import { ALERT } from "../../../../redux/types/alertType";
import { imageUpload } from "../../../../redux/actions/profileAction";

interface IProps {
	setBody: (value: string) => void;
}

const Quill: FC<IProps> = ({ setBody }) => {
	const dispatch = useDispatch();
	const quillRef = useRef<ReactQuill>(null);

	let modules = {
		toolbar: [
			["bold", "italic", "underline", "strike"],
			["blockquote", "code-block"],

			[{ header: 1 }, { header: 2 }],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ script: "sub" }, { script: "super" }],
			[{ indent: "-1" }, { indent: "+1" }],
			[{ direction: "rtl" }],

			[{ size: ["small", false, "large", "huge"] }],
			[{ header: [1, 2, 3, 4, 5, 6, false] }],

			[{ color: [] }, { background: [] }],
			[{ font: [] }],
			[{ align: [] }],

			["link", "image"],

			["clean"],
		],
	};

	const handleChangeImage = useCallback(() => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		input.click();

		input.onchange = async () => {
			const files = input.files;
			if (!files) return dispatch({ type: ALERT, payload: { errors: "Файла не существует" } });

			const file = files[0];
			const check = checkImage(file);
			if (check) return dispatch({ type: ALERT, payload: { errors: check } });

			dispatch({ type: ALERT, payload: { loading: true } });

			const photo = await imageUpload(file);

			const quill = quillRef.current;
			const range = quill?.getEditor().getSelection()?.index;
			if (range !== undefined) {
				quill?.getEditor().insertEmbed(range, "image", `${photo.url}`);
			}

			dispatch({ type: ALERT, payload: { loading: false } });
		};
	}, [dispatch]);

	// Custom image
	useEffect(() => {
		const quill = quillRef.current;
		if (!quill) return;

		let toolbar = quill.getEditor().getModule("toolbar");
		toolbar.addHandler("image", handleChangeImage);
	}, [handleChangeImage]);

	return (
		<div className="text-editor">
			<ReactQuill
				theme="snow"
				modules={modules}
				placeholder="Введите описание"
				onChange={(e) => setBody(e)}
				ref={quillRef}
			/>
		</div>
	);
};
export default Quill;
