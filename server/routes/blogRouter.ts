import express from "express";
import blogCtrl from "../controllers/blogCtrl";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/blog/create", auth, blogCtrl.createBlog);

router.get("/blogs", blogCtrl.getBlogs);

router.get("/blogs/category/:id", blogCtrl.getBlogsByCategory);

router.get("/blogs/user/:id", blogCtrl.getBlogsByUser);

router.get("/blog/:id", blogCtrl.getBlogDetail);

export default router;
