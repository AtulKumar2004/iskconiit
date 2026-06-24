import express from "express";
import { registerProgram } from "../controllers/programRegistrationController.js";

const router = express.Router();

router.post("/", registerProgram);

export default router;
