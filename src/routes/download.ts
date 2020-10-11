import express from 'express'
import verifyToken from 'Middlewares/verifyToken'
import path from 'path'
import fs from 'fs-extra'

const router = express.Router()

const ROOT_PASSWD = process.env.ROOT_PASSWD

router.post('/api/download', verifyToken, (req, res) => {
	const { filePath } = req.body
	const fullFilePath = path.join(__dirname, '..', 'dummy', filePath)
	
	fs.readFile(fullFilePath, 'UTF-8').then((data) => {
		res.json(Buffer.from(data))
	})
})


export default router