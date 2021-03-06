import {
	LOCATION_CHANGE,
	GET_USERS_SUCCESS,
	GET_USERS_FAIL,
	GET_USERS_PENDING,
	GET_USER_SUCCESS,
	GET_USER_FAIL,
	GET_USER_PENDING
} from 'actions'
import {normalizeArrayOfItems} from 'api/utils'

export const initialState = {
	entities: [],
	errors: {},
	fetchStatus: 'none',
	isLoading: false,
	isLoaded: false,
	count: 0
}

export function user (state = initialState, action) {
	switch (action.type) {
	case LOCATION_CHANGE: {
		// Return state if path matches /users
		// else initialState
		const {pathname} = action.payload
		if (/\/user/g.test(pathname)) {
			return state
		}

		return initialState
	}
	case GET_USER_PENDING: {
		return {
			...state,
			errors: {},
			isLoaded: false,
			isLoading: true,
			fetchStatus: 'loading'
		}
	}
	case GET_USER_SUCCESS: {
		const {result} = action
		// @Metnew:
		// result may be an object, if it was request with params
		// `normalizeArrayOfItems` normalize only arrays of items!
		// const {count, entities} = normalizeArrayOfItems([result])
		// Normalizr here
		return {
			...state,
			isLoaded: true,
			isLoading: false,
			fetchStatus: 'loaded',
			entities: result
		}
	}
	case GET_USER_FAIL: {
		return {
			...state,
			errors: action.errors,
			isLoaded: true,
			isLoading: false,
			fetchStatus: 'loaded'
		}
	}
	default:
		return state
	}
}

export function users (state = initialState, action) {
	switch (action.type) {
	case LOCATION_CHANGE: {
		// Return state if path matches /users
		// else initialState
		const {pathname} = action.payload
		if (/\/users/g.test(pathname)) {
			return state
		}
		return initialState
	}
	case GET_USERS_PENDING: {
		return {
			...state,
			errors: {},
			isLoaded: false,
			isLoading: true,
			fetchStatus: 'loading'
		}
	}
	case GET_USERS_SUCCESS: {
		const {result} = action
		// @Metnew:
		// result may be an object, if it was request with params
		// `normalizeArrayOfItems` normalize only arrays of items!
		// const {count, entities} = normalizeArrayOfItems([result])
		// Normalizr here
		return {
			...state,
			isLoaded: true,
			isLoading: false,
			fetchStatus: 'loaded',
			count: result.total,
			limit: result.limit,
			skip: result.skip,
			entities: result.data
		}
	}
	case GET_USERS_FAIL: {
		return {
			...state,
			errors: action.errors,
			isLoaded: true,
			isLoading: false,
			fetchStatus: 'loaded'
		}
	}
	default:
		return state
	}
}
