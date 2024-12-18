import express, { Router } from "express";
import { getUsers, getUserById } from "@views/userViews";

const router: Router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);

export default router;
