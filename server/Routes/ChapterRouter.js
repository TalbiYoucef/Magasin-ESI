const router = require('express').Router()
const { getChapters,getChapterById,createChapter,updateChapter,deleteChapter, getChapterBranches } = require('../Controllers/ChapterController')

router
.get('/', getChapters)//done
.post('/', createChapter) //done
.get('/:chapter_id', getChapterById)//done
.put('/:chapter_id', updateChapter) //done
.delete('/:chapter_id', deleteChapter) //done
.get('/:id/branches',getChapterBranches) //done
module.exports= router
