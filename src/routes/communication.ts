import { Router } from 'express'
import * as jwt from 'jsonwebtoken'
import Events from '../events'

const router = Router()
const ROOT_PASSWD = process.env.ROOT_PASSWD

const sendMsg = (ws, msg: {[key: string]: any}) => {
	ws.send(JSON.stringify(msg))
}

const verifyToken = (token: string) => {
	return new Promise((res, rej) => {
		jwt.verify(token, ROOT_PASSWD, (err: string, data: any)=>{
			console.log(1,err,2,data)
			if(err){
				rej(err)
			} else {
				res(data)
			}
		})
	})
}

export default (wsInstance) => {
	const wss: any = wsInstance.getWss()
	
	router.ws('/api/communication', ws => {
		ws.on('message', message => {
			if(typeof message !== 'string') return

			const parsedMessage = JSON.parse(message)
			const { type } = parsedMessage

			switch(type){
				case 'AUTHENTIFICATION':
					verifyToken(parsedMessage.token).then(() => {
						//Send welcome (granted) message
						sendMsg(ws,{
							type: 'WELCOME'
						})
						//WHEN FILESYSTEM IS CHANGED TELL THE CLIENT
						Events.on('FILESYSTEM_UPDATED', (path: string) => {
							sendMsg(ws,{
								type: 'FILESYSTEM_UPDATED',
								path
							})
						})
						
						try {
							wsInstance.getWss() //PATCH
						}catch{}

						(ws as any).isAlive = true;
						ws.on('pong', () => {
							(ws as any).isAlive = true;
						});

						const interval = setInterval(function ping() {
							wss.clients.forEach(function each(ws: any) {
								if (ws.isAlive === false) return ws.terminate();

								ws.isAlive = false;
								ws.ping(() =>{
									console.log("ping")
								});
								
							});
						}, 2000);

						wss.on('close', function close() {
							clearInterval(interval);
						});
					}).catch(() => {
						ws.close()
					})
			}
		})
	})
	return router
}