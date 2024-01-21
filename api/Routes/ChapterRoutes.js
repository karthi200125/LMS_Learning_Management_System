import express from 'express';
import { ChapterCreate, ChapterDelete, ChapterUpdate, getAllChapter, getSingleChapter } from '../Controllers/ChapterController.js';
import { VerifyToken, VerifyUser } from '../Utils/VerifyToken.js';

const router = express.Router();

router.post("/create",  ChapterCreate);
router.delete("/delete", ChapterDelete);
router.put("/update", ChapterUpdate);
router.post("/getall", getAllChapter);
router.post("/getchapter", getSingleChapter);


export default router;
