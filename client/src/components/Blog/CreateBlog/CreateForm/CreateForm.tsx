import React, { FC, useEffect } from 'react';
import cn from './CreateForm.module.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../../../redux/actions/categoryAction';
import { IBlog } from '../../../../types/BlogTypes';
import { InputChange, TextAreaChange, SelectChange } from '../../../../types/Types';

interface IProps {
	blog: IBlog;
	setBlog: (blog: IBlog) => void;
}

const CreateForm: FC<IProps> = ({ blog, setBlog }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	const categories = useTypedSelector((state) => state.categories);

	const handleChangeInput = (e: InputChange | TextAreaChange | SelectChange) => {
		const { value, name } = e.target;
		setBlog({ ...blog, [name]: value });
	};

	const handleChangeThumbnail = (e: InputChange) => {
		const target = e.target as HTMLInputElement;
		const files = target.files;

		if (files) {
			const file = files[0];
			setBlog({ ...blog, thumbnail: file });
		}
	};

	return (
		<form>
			<div className="form-group position-relative">
				<input
					type="text"
					className="form-control"
					name="title"
					value={blog.title}
					onChange={handleChangeInput}
				/>
				<small className={cn.characterCounter}>{blog.title.length}/50</small>
			</div>

			<div className="form-group my-3">
				<input
					type="file"
					className="form-control"
					accept="image/*"
					onChange={handleChangeThumbnail}
				/>
			</div>

			<div className="form-group position-relative">
				<textarea
					className={`${cn.description} form-control`}
					rows={4}
					name="description"
					value={blog.description}
					onChange={handleChangeInput}
				/>
				<small className={cn.characterCounter}>{blog.description.length}/200</small>
			</div>

			<div className="form-group my-3">
				<select
					className="form-control text-capitalize"
					name="category"
					value={blog.category}
					onChange={handleChangeInput}
				>
					<option value="">Выберите категорию</option>
					{categories.map((category) => (
						<option key={category._id} value={category._id}>
							{category.name}
						</option>
					))}
				</select>
			</div>
		</form>
	);
};

export default CreateForm;
