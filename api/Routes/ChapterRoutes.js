import express from 'express';
import { ChapterCreate, ChapterDelete, ChapterUpdate, getAllChapter, getSingleChapter } from '../Controllers/ChapterController.js';
import { VerifyToken, VerifyUser } from '../Utils/VerifyToken.js';

const router = express.Router();

router.post("/create", VerifyToken, VerifyUser, ChapterCreate);
router.delete("/delete", VerifyToken, VerifyUser, ChapterDelete);
router.put("/update", VerifyToken, VerifyUser, ChapterUpdate);
router.post("/getall", getAllChapter);
router.post("/getchapter", getSingleChapter);


export default router;
