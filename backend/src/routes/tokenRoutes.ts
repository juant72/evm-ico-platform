// src/routes/tokenRoutes.ts
import express from "express";
import { createToken } from "../controllers/tokenController";

const router = express.Router();
router.post("/tokens", createToken);
export default router;
