import React, { useEffect, useState } from 'react';
import cn from './Category.module.css';
import { FormSubmit } from '../../types/Types';
import { useDispatch } from 'react-redux';
import { CONSTANTS } from '../../utils/consts';
import NotFoundPage from '../../pages/NotFoundPage';
import {
	createCategory,
	deleteCategory,
	getCategories,
	updateCategory,
} from '../../redux/actions/categoryAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ICategory } from '../../types/CategoryTypes';

const Category = () => {
	const auth = useTypedSelector((state) => state.auth);
	const categories = useTypedSelector((state) => state.categories);
	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [edit, setEdit] = useState<ICategory | null>(null);

	const handleSubmit = (e: FormSubmit) => {
		e.preventDefault();
		if (!auth.access_token || !name) return;

		if (edit) {
			if (edit.name === name) return;

			const data = { ...edit, name };
			dispatch(updateCategory(data, auth.access_token));
		} else {
			dispatch(createCategory(name, auth.access_token));
		}

		setName('');
		setEdit(null);
	};

	const handleDelete = (id: string) => {
		if (!auth.access_token) return;

		dispatch(deleteCategory(id, auth.access_token));
	};

	const clearEdit = () => {
		setName('');
		setEdit(null);
	};

	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	useEffect(() => {
		if (edit) setName(edit.name);
	}, [edit]);

	if (auth.user?.role !== CONSTANTS.ROLE.ADMIN) return <NotFoundPage />;

	return (
		<div className={`${cn.category}`}>
			<form className={cn.categoryForm} onSubmit={handleSubmit}>
				<label htmlFor="category">Категории</label>

				<div className="d-flex align-items-center">
					<input
						type="text"
						name="category"
						id="category"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

					{edit && (
						<i
							className="fas fa-times mx-2 text-danger"
							style={{ cursor: 'pointer' }}
							onClick={clearEdit}
						/>
					)}

					<button type="submit">{edit ? 'Обновить' : 'Создать'}</button>
				</div>
			</form>

			{categories.map((category) => (
				<div className={cn.categoryList} key={category._id}>
					<p className="m-0 text-capitalize">{category.name}</p>

					<div>
						<i className="fas fa-edit mx-2" onClick={() => setEdit(category)} />
						<i className="fas fa-trash-alt" onClick={() => handleDelete(category._id)} />
					</div>
				</div>
			))}
		</div>
	);
};

export default Category;
