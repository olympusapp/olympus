import { Router } from 'express'

const router = Router()

router.get('/api', (req, res) => {
	res.json({
		welcome: true
	})
})

export default router