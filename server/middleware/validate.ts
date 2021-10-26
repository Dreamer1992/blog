import {NextFunction, Request, Response} from 'express'

export const validateRegister = async (req: Request, res: Response, next: NextFunction) => {
    const {name, account, password} = req.body;

    const errors = [];

    if (!name) {
        errors.push("Укажите Ваше имя")
    } else if (name.length > 20) {
        errors.push("Имя должно быть не больше 20-ти символов")
    }

    if (!account) {
        errors.push("Укажите почту или номер телефона")
    } else if ((!validatePhone(account) && !validateEmail(account))) {
        errors.push("Неверный формат электронной почты или номера телефона")
    }

    if (password.length < 6) {
        errors.push("Пароль должен быть больше 5 символов")
    }

    if (errors.length > 0) return res.status(400).json({msg: errors})

    next();
}

export function validatePhone(phone: string) {
    const res = /^[+]/g;
    return res.test(phone)
}

export function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}