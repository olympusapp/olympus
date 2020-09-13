import { Router } from 'express'
import * as jwt from 'jsonwebtoken'
import getUserDB from 'Controllers/getUser'
import createUserDB from 'Controllers/createUser'

const router = Router()

const ROOT_PASSWD = process.env.ROOT_PASSWD
const SERVER_NAME = process.env.SERVER_NAME

router.post('/api/signup', (req, res) => {
	const { username, password } = req.body
		
	jwt.sign({ username, password }, ROOT_PASSWD, async (err, token) => {
		const userExists = await getUserDB({
			username
		})
		if(!userExists){
			res.json({
				username,
				token,
				serverName: SERVER_NAME
			})
			createUserDB({
				username,
				token
			})
		}else{
			res.json({
				errorCode: 1
			})
		}
	})
})

export default router