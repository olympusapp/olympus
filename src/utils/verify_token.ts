import * as jwt from 'jsonwebtoken'

const ROOT_PASSWD = process.env.ROOT_PASSWD

export default function verifyToken(token: string){
	return new Promise((res, rej) => {
		jwt.verify(token, ROOT_PASSWD, (err: string, data: any)=>{
			if(err){
				rej(err)
			} else {
				res(data)
			}
		})
	})
}
