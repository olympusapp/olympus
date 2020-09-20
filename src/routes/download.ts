import express from 'express'
import verifyToken from 'Middlewares/verifyToken'
import path from 'path'

const router = express.Router()

const ROOT_PASSWD = process.env.ROOT_PASSWD

router.post('/api/download', verifyToken, (req, res) => {
	const { filePath } = req.body
	const fullFilePath = path.join(__dirname, '..', 'dummy', filePath)
	
	res.download(fullFilePath,(err) => {
		if(err){
			console.log(err)
		}
	})
})


export default router