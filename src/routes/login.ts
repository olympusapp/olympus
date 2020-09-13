import { Router } from 'express'
import * as jwt from 'jsonwebtoken'
import getUserDB from 'Controllers/getUser'

const router = Router()

const ROOT_PASSWD = process.env.ROOT_PASSWD
const SERVER_NAME = process.env.SERVER_NAME

router.post('/api/login', async (req, res) => {
	const { username, password } = req.body
	
	const userExists: any = await getUserDB({
		username
	})
	
	if(!userExists){
		return res.json({
			errorCode: 2
		})
	}

	jwt.verify(userExists.token, ROOT_PASSWD, (err, data) => {
		if(password === data.password){
			res.json({
				username,
				token: userExists.token,
				serverName: SERVER_NAME
			})
		}else{
			res.json({
				errorCode: 3
			})
		}
	})
})

export default router