import { Response } from 'express';
import Blogs from '../models/blogModel';
import { IReqAuth } from '../config/interfaces';

const blogCtrl = {
  createBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: 'Ошибка авторизации' });

    try {
      const { title, content, description, thumbnail, category } = req.body;

      const newBlog = new Blogs({
        user: req.user._id,
        title,
        content,
        description,
        thumbnail,
        category,
      });

      await newBlog.save();
      res.json({ newBlog });
    } catch (e: any) {
      return res.status(500).json({ msg: e.message });
    }
  },
};

export default blogCtrl;
