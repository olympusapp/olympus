import express from 'express'
import cors  from 'cors'
import bodyParser from 'body-parser'
import { config } from 'dotenv'
import morgan from 'morgan'
import enableWs from 'express-ws'
import verifyToken from 'Middlewares/verifyToken'

config()
const app: any = express()

const SERVER_PORT = process.env.SERVER_PORT

import ApiRoute from 'Routes/api'
import LoginRoute from 'Routes/login'
import SignupRoute from 'Routes/signup'
import UploadRoute from 'Routes/upload'
import ExploreRoute from 'Routes/explore'
import InfoRoute from 'Routes/info'

const wsInstance = enableWs(app)

import('./routes/communication').then(({ default: router}) => {
	app.use(router(wsInstance))
})


app.use(cors())
app.use(bodyParser())

app.use(morgan('dev'))

app.use(ApiRoute)
app.use(LoginRoute)
app.use(SignupRoute)
app.use(UploadRoute)
app.use(ExploreRoute)
app.use(InfoRoute)

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`))

