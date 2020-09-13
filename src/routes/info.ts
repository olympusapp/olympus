import { Router } from 'express'
import verifyToken from 'Middlewares/verifyToken'

const router = Router()

const SERVER_NAME = process.env.SERVER_NAME

router.get('/api/info', verifyToken, (req, res) => {
	
	res.json({
		ok: true,
		serverName: SERVER_NAME
	})

})

export default router