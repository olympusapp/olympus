import { Router } from 'express'
import verifyToken from 'Middlewares/verifyToken'
import * as fs from 'fs-extra'
import * as path from 'path'

const router = Router()

router.post('/api/explore', verifyToken, async (req, res) => {
	
	const { startFolder } = req.body
	
	const fileDrive = path.join(__dirname, '..', 'dummy', startFolder)
	
	const folderExists = await (fs as any).exists(fileDrive)
	
	if(!folderExists){
		return res.json({
			ok: false,
			errorCode: 404
		})
	}
	
	fs.readdir(fileDrive, async (err, paths) => {
		const folderPaths = await Promise.all(paths.map( async (file) => {
			const stats = await fs.lstat(path.join(fileDrive, file))
			return {
				isDirectory: stats.isDirectory(),
				fileName: file
			}
		}))
		res.json({
			ok: true,
			folderPaths
		})
	})

})

export default router