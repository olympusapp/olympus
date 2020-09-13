import { Database } from 'sqlite3'
import * as path from 'path'

const DB = new Database(path.join(__dirname, 'db'))

DB.serialize(() => {
	DB.run('CREATE TABLE IF NOT EXISTS acloud (username varchar(255), token varchar(255))')
})

export default DB