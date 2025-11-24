import express from "express";
import {
  addApplication,
  getApplications,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/", addApplication); // submit form
router.get("/", getApplications); // admin: list all

export default router;
