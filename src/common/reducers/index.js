import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import {layout} from './layout'
import {templates} from './templates'
import {user, users} from './users'
import {auth} from './auth'

// Root reducer
export default combineReducers({
	layout,
	me: combineReducers({auth}),
	entities: combineReducers({
		templates,
		user,
		users
	}),
	routing: routerReducer
})
