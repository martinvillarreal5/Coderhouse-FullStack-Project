import { Router } from "express";
import passport from "passport";
import {
  getUserInfo,
  getUsersList,
  postLogin,
  postRegister,
  postLogout,
} from "../controllers/user-controller.js";
import { ensureAuth, ensureAdminAuth } from "../middleware/auth.js";
import { avatarUpload } from "../middleware/multer.js";

const router = Router();

router.get("/", getUserInfo);
router.get("/list", ensureAdminAuth, getUsersList);
router.post("/login", passport.authenticate("login"), postLogin);
router.post("/register", avatarUpload.single("avatar"), postRegister);
router.post("/logout", ensureAuth, postLogout);

export default router;
