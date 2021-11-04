import React from 'react';
import cn from './Loading.module.css';

const Loading = () => {
    return (
        <div className={cn.loading}
             style={{}}>
            <svg width="100" height="100" viewBox="0 0 20 26">
                <polygon stroke="#fff" strokeWidth="1" fill="none" points="10, 1 20, 20 1, 20"/>
                <text fill="#fff" x="0" y="25">Загрузка</text>
            </svg>
        </div>
    );
};

export default Loading;