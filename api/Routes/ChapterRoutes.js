import express from 'express';
import { ChapterCreate, ChapterDelete, getSinlgeChapter, ChapterUpdate, getAllChapter } from '../Controllers/ChapterController.js';

const router = express.Router();

router.post("/create", ChapterCreate);
router.delete("/delete", ChapterDelete);
router.put("/update", ChapterUpdate);
router.post("/getall", getAllChapter);
router.post("/getchapter", getSinlgeChapter);


export default router;
