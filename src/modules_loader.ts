import * as fs from 'fs-extra'
import * as path from 'path'
import module from 'module'
import verifyToken from 'Middlewares/verifyToken'

const modules_dist = path.join(__dirname, '..', 'modules_dist')

export default ({ app , Router }) => {
	return new Promise(async(res) => {
		const modules = await fs.readdir(modules_dist)

		modules.forEach((module_name) => {

			function loadRouter(routerInstance){
				app.use(`/ext/${module_name}`, routerInstance)
			}

			const module_path: any = path.join(modules_dist, module_name, 'index.js')

			const { activate } = module.createRequire(__dirname)(module_path)

			activate({
				Router,
				app,
				loadRouter,
				verifyToken
			})
		})
		
		res()
	})
}