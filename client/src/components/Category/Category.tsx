import React, {useEffect, useState} from 'react';
import cn from './Category.module.css';
import {FormSubmit} from "../../types/Types";
import {useDispatch} from "react-redux";
import {CONSTANTS} from "../../utils/consts";
import NotFoundPage from "../../pages/NotFoundPage";
import {createCategory, getCategories} from "../../redux/actions/categoryAction";
import {useTypedSelector} from "../../hooks/useTypedSelector";


const Category = () => {
    const [name, setName] = useState('');
    const auth = useTypedSelector(state => state.auth);
    const categories = useTypedSelector(state => state.categories);
    const dispatch = useDispatch();

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault();
        if (!auth.access_token || !name) return;

        dispatch(createCategory(name, auth.access_token));

        setName('');
    }

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    if (auth.user?.role !== CONSTANTS.ROLE.ADMIN) return <NotFoundPage/>;

    return (
        <div className="container">
            <div className={`${cn.category}`}>
                <form className={cn.categoryForm} onSubmit={handleSubmit}>
                    <label htmlFor="category">Категории</label>

                    <div className="d-flex">
                        <input
                            type="text"
                            name="category"
                            id="category"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <button type="submit">Создать</button>
                    </div>
                </form>

                {
                    categories.map((category) => (
                        <div className={cn.categoryList} key={category._id}>
                            <p className="m-0 text-capitalize">{category.name}</p>

                            <div>
                                <i className="fas fa-edit mx-2"/>
                                <i className="fas fa-trash-alt"/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Category;