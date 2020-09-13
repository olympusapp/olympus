import * as jwt from 'jsonwebtoken'

export default (req, res, next) => {
	const ROOT_PASSWD = process.env.ROOT_PASSWD
	
	const bearerHeader = req.headers['authorization']

	if(bearerHeader !== undefined){
		
		const bearer = bearerHeader.split(' ')
		const bearerToken = bearer[1]

		jwt.verify(bearerToken, ROOT_PASSWD, (err, data)=>{

			if(err){
				if(res){
					res.sendStatus(403)
				}else{
					next(403)
				}
			} else {
				req.identity = {
					token: bearerToken,
					username: data.username
				}
				next()
			}
		})
		
	}else{
		if(res){
			res.sendStatus(403)
		}else{
			next(403)
		}
	}
	
}
