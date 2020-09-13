import DB from '../database'

export default ({ username, token }) => {
	DB.run(`
		INSERT INTO acloud(username,token)
		VALUES ('${username}','${token}');
	`)
}