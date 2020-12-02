import EventEmitter from 'events'
import chokidar from 'chokidar'
import path from 'path'

export default function createWatcher(){

	const Events = new (EventEmitter as any)()

	const fileDrive = process.env.MEMORIA_DRIVE

	const Watcher = chokidar.watch(fileDrive,{
		ignoreInitial: false
	})

	Watcher.on('add', path => {
		Events.emit('FILESYSTEM_UPDATED', path)
	})

	Watcher.on('unlink', path => {
		Events.emit('FILESYSTEM_UPDATED', path)
	})

	Watcher.on('change', path => {
		Events.emit('FILESYSTEM_UPDATED', path)
	})

	return Events
}