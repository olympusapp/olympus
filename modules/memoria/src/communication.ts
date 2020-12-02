import { Router } from 'express'
import * as jwt from 'jsonwebtoken'
import createWatcher from './events'
import verifyToken from 'VerifyToken'

const ROOT_PASSWD = process.env.ROOT_PASSWD

const sendMsg = (ws, msg: {[key: string]: any}) => {
	ws.send(JSON.stringify(msg))
}

export default (wsInstance) => {
	
	const MemoriaWatcher = createWatcher()
	
	const router = Router()
	
	const wss: any = wsInstance.getWss()
		
	router.ws('/communication', (ws: any) => {
		ws.on('message', message => {
			if(typeof message !== 'string') return

			const parsedMessage = JSON.parse(message)
			const { type } = parsedMessage

			switch(type){
				case 'AUTHENTIFICATION':
					verifyToken(parsedMessage.token).then(() => {
						
						/*
						* Send a welcome message
						*/
						sendMsg(ws,{
							type: 'WELCOME'
						})
						
						/*
						* When the filesystem is updated tell all the connected clients
						*/
						MemoriaWatcher.on('FILESYSTEM_UPDATED', FSUpdated)
						function FSUpdated(path: string){
							sendMsg(ws,{
								type: 'FILESYSTEM_UPDATED',
								path
							})
						}

						ws.isAlive = true
						
						ws.on('pong', () => {
							/* PONG */
							ws.isAlive = true
						})

						const interval = setInterval(() => {
							wss.clients.forEach((socket)  => {
								if (socket.isAlive === false) return socket.terminate()

								socket.isAlive = false
								socket.ping(() =>{ /* PING */ })
								
							})
						}, 2000)

						ws.on('close', function close() {
							clearInterval(interval)
							MemoriaWatcher.off('FILESYSTEM_UPDATED', FSUpdated)
						})
						
					}).catch(() => {
						ws.close()
					})
			}
		})
	})

	return router
}