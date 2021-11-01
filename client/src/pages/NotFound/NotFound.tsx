import React from 'react';
import cn from './NotFound.module.css'

const NotFound = () => {
    return (
        <div className={cn.wrapperPage}>
            <h2 className={cn.innerText}>
                404 | NotFound
            </h2>
        </div>
    );
};

export default NotFound;