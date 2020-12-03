import { Router } from 'express'
import * as fs from 'fs-extra'
import * as path from 'path'
import fileUpload from 'express-fileupload'
import enableWs from 'express-ws'
import Communication from './communication'

const ROOT_PASSWD = process.env.ROOT_PASSWD

process.env.MEMORIA_DRIVE = path.resolve(process.cwd(), process.env.MEMORIA_DRIVE)

export const activate = ({ app, loadRouter, verifyToken }) => {

	const router = Router()

	const wsInstance = enableWs(app)

	loadRouter(Communication(wsInstance))

	router.post('/explore', verifyToken, async (req, res) => {

		const { startFolder } = req.body

		const fileDrive = path.join(process.env.MEMORIA_DRIVE, startFolder)

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
	
	router.post('/upload', verifyToken, fileUpload(), (req, res) => {
		if(req.files) {
			const { folderpath } = req.headers

			const uploadedFileName = <string> req.files.file_upload.name
			
			const uploadedFilePath = path.join(process.env.MEMORIA_DRIVE, uploadedFileName) 
			
			req.files.file_upload.mv(uploadedFilePath)
			
			res.json({
				ok: true,
				action: 'uploaded'
			})
			
		}else{
			res.sendStatus(400)
		}
	})
	
	router.post('/download', verifyToken, (req, res) => {
		const { filePath } = req.body
		const fullFilePath = path.join(process.env.MEMORIA_DRIVE, filePath)

		res.download(fullFilePath,(err) => {
			if(err){
				console.log(err)
			}
		})
	})

	loadRouter(router)
}