import * as EventEmitter from 'events'
import chokidar from 'chokidar'
import path from 'path'
 

const Events = new (EventEmitter as any).default()

const fileDrive = path.join(__dirname,'..', 'dummy')

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

export default Events