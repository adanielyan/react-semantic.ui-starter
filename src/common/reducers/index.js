import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import {layout} from './layout'
import {template, templates} from './templates'
import {project, projects} from './projects'
import {user, users} from './users'
import {auth} from './auth'

// Root reducer
export default combineReducers({
	layout,
	me: combineReducers({auth}),
	entities: combineReducers({
		template,
		templates,
		project,
		projects,
		user,
		users
	}),
	routing: routerReducer
})
