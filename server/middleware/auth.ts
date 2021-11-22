import { NextFunction, Response } from "express";
import Users from "../models/userModel";
import jwt from "jsonwebtoken";
import { IDecodedToken, IReqAuth } from "../config/interfaces";

const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "Ошибка авторизации" });

    const decoded = <IDecodedToken>(
      jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
    );
    if (!decoded) return res.status(400).json({ msg: "Ошибка авторизации" });

    const user = await Users.findOne({ _id: decoded.id });
    if (!user)
      return res.status(400).json({ msg: "Такой пользователь не существует" });

    req.user = user;

    next();
  } catch (e: any) {
    return res.status(500).json({ msg: e.message });
  }
};

export default auth;