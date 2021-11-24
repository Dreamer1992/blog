import React, { useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { NotFoundPage } from '../../pages';
import CreateForm from './CreateForm/CreateForm';
import CardHoriz from './CardHoriz/CardHoriz';
import { IBlog } from '../../types/BlogTypes';
import Quill from './Editor/Quill';

const CreateBlog = () => {
	const initState = {
		user: '',
		title: '',
		content: '',
		description: '',
		thumbnail: '',
		category: '',
		createdAt: new Date().toISOString(),
	};

	const [blog, setBlog] = useState<IBlog>(initState);
	const [body, setBody] = useState('');

	const { auth } = useTypedSelector((state) => state);

	if (!auth.access_token) return <NotFoundPage />;

	return (
		<div className='my-4 create_blog'>
			<div className='row mt-4'>
				<div className='col-md-6'>
					<h5>Создать</h5>
					<CreateForm blog={blog} setBlog={setBlog} />
				</div>

				<div className='col-md-6'>
					<h5>Превью</h5>
					<CardHoriz blog={blog} />
				</div>

				<Quill setBody={setBody} />

				<div className='col-12'>
					<button className='btn btn-success mt-3 d-block mx-auto'>
						Создать пост
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateBlog;
