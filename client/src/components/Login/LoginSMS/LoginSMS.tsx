import React, {useState} from 'react';

const LoginSms = () => {
    const [phone, setPhone] = useState('');

    return (
        <form>
            <div className="form-group mb-4">
                <label htmlFor="phone" className="form-label">Номер телефона</label>
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="form-control"
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value)
                    }}
                />
            </div>

            <button
                type="submit"
                className="btn btn-dark w-100"
                disabled={phone ? false : true}
            >
                Войти
            </button>
        </form>
    );
};

export default LoginSms;