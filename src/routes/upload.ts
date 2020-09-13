import { Router } from 'express'
import verifyToken from 'Middlewares/verifyToken'
import fileUpload from 'express-fileupload'

const router = Router()

router.post('/api/upload', verifyToken, fileUpload(), (req, res) => {
	
	if(req.files) {
		const { folderpath } = req.headers
		
		req.files.file_upload.mv(`./dummy${folderpath}/${req.files.file_upload.name}`)
		res.json({
			ok: true,
			action: 'uploaded'
		})
	}else{
		res.sendStatus(400)
	}

})


export default router