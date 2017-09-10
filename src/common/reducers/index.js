import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import {layout} from './layout'
import {templates} from './templates'
import {users} from './users'
import {auth} from './auth'

// Root reducer
export default combineReducers({
	layout,
	me: combineReducers({auth}),
	entities: combineReducers({
		templates,
		users
	}),
	routing: routerReducer
})
