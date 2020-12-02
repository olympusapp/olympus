import express from 'express'
import cors  from 'cors'
import bodyParser from 'body-parser'
import { config } from 'dotenv'
import morgan from 'morgan'
import verifyToken from 'Middlewares/verifyToken'
import path from 'path'
import modulesLoader from './modules_loader'

config()
const app: any = express()

const SERVER_PORT = process.env.SERVER_PORT

import ApiRoute from 'Routes/api'
import LoginRoute from 'Routes/login'
import SignupRoute from 'Routes/signup'
import InfoRoute from 'Routes/info'

app.use(cors())
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use(ApiRoute)
app.use(LoginRoute)
app.use(SignupRoute)
app.use(InfoRoute)

modulesLoader({
	app,
	Router: express.Router
}).then(() => {
	app.listen(SERVER_PORT, () => {
		console.log(`Server listening on port ${SERVER_PORT}`)
	})
})



