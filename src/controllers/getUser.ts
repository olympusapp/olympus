import DB from '../database'

export default ({ username }) => {
	return new Promise((res) => {
		DB.get(`
			SELECT * FROM acloud where username = '${username}';
		`, (err, data) => {
			if(err) console.error(err)
			res(data)
		})
	})
}
