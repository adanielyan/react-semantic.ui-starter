import feathers from 'feathers-client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'
import auth from 'feathers-authentication-client'
import storage from 'localstorage-memory'

const host = 'http://localhost:3030'
const socket = io(host)

// EXPORT NORMALIZE STUFF!
export {normalizeArrayOfItems} from './normalize'

export const app = feathers()
	.configure(feathers.hooks())
	.configure(socketio(socket))
	.configure(auth({ storage }))

export const usersService = app.service('users')
export const recipesService = app.service('recipes')
export const widgetsService = app.service('widgets')
export const templatesService = app.service('templates')
export const messagesService = app.service('messages')

messagesService.on('created', (msg) => {
	// console.log(msg)
})

// FUNCTION WITH SIDE-EFFECTS
/**
 * `parseJSON()` adds property "ok"
 * that identicates that response is OK
 *
 * `resultOK`removes result.ok from result and returns "ok" property
 *  It widely used in `/actions/*`
 *  for choosing action to dispatch after request to API
 *
 * @param  {Object} result - response result that
 * @return {bool} - indicates was request successful or not
 */
export function resultOK (result) {
	if (result) {
		const ok = result.ok
		delete result.ok
		return ok // Look at parseJSON
	}
	return false
}
