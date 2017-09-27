import {
	LOCATION_CHANGE,
	GET_PROJECTS_SUCCESS,
	GET_PROJECTS_PENDING,
	GET_PROJECTS_FAIL,
	GET_PROJECT_SUCCESS,
	GET_PROJECT_PENDING,
	GET_PROJECT_FAIL
} from 'actions'
import {normalizeArrayOfItems} from 'api/utils'

export const initialState = {
	entities: [],
	entity: {},
	errors: {},
	fetchStatus: 'none',
	isLoading: false,
	isLoaded: false,
	count: 0,
	pages: 1,
	page: 1
}

export function project (state = initialState, action) {
	switch (action.type) {
	case LOCATION_CHANGE: {
		const {pathname} = action.payload
		if (pathname !== '/' && !(/\/project/g.test(pathname))) {
			return initialState
		}
		return state
	}
	case GET_PROJECT_PENDING: {
		return {
			...state,
			errors: {},
			isLoaded: false,
			isLoading: true,
			fetchStatus: 'loading'
		}
	}
	case GET_PROJECT_SUCCESS:
		const {result} = action
		// const {count, entities} = normalizeArrayOfItems([result])
		return {
			isLoaded: true,
			isLoading: false,
			fetchStatus: 'loaded',
			errors: {},
			entity: result.data[0] || {}
		}
	case GET_PROJECT_FAIL:
		return {
			...state,
			isLoaded: true,
			isLoading: false,
			fetchStatus: 'loaded',
			errors: action.errors
		}
	default:
		return state
	}
}

export function projects (state = initialState, action) {
	switch (action.type) {
	case LOCATION_CHANGE: {
		const {pathname} = action.payload
		if (pathname !== '/' && !(/\/projects/g.test(pathname))) {
			return initialState
		}
		return state
	}
	case GET_PROJECTS_PENDING: {
		return {
			...state,
			errors: {},
			isLoaded: false,
			isLoading: true,
			fetchStatus: 'loading'
		}
	}
	case GET_PROJECTS_SUCCESS:
		const {result} = action
		// const {count, entities} = normalizeArrayOfItems([result])
		return {
			isLoaded: true,
			isLoading: false,
			fetchStatus: 'loaded',
			errors: {},
			count: result.total,
			pages: result.pages,
			page: result.page,
			entities: result.data
		}
	case GET_PROJECTS_FAIL:
		return {
			...state,
			isLoaded: true,
			isLoading: false,
			fetchStatus: 'loaded',
			errors: action.errors
		}
	default:
		return state
	}
}
