import {NextFunction, Request, Response} from 'express'

export const validateRegister = async (req: Request, res: Response, next: NextFunction) => {
    const {name, account, password} = req.body

    if (!name) {
        return res.status(400).json({msg: "Укажите Ваше имя"})
    } else if (name.length > 20) {
        return res.status(400).json({msg: "Имя должно быть не больше 20-ти символов"})
    }

    if (!account) {
        return res.status(400).json({msg: "Укажите почту или номер телефона"})
    } else if ((!validatePhone(account) && !validateEmail(account))) {
        return res.status(400).json({msg: "Неверный формат электронной почты или номера телефона"})
    }

    if (password.length < 6) {
        return res.status(400).json({msg: "Пароль должен быть больше 5 символов"})
    }

    next();
}

function validatePhone(phone: string) {
    const res = /^[+]/g;
    return res.test(phone)
}

function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}