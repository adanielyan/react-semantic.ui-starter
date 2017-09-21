import {
	LOCATION_CHANGE,
	GET_TEMPLATES_SUCCESS,
	GET_TEMPLATES_PENDING,
	GET_TEMPLATES_FAIL,
	GET_TEMPLATE_SUCCESS,
	GET_TEMPLATE_PENDING,
	GET_TEMPLATE_FAIL
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

export function template (state = initialState, action) {
	switch (action.type) {
	case LOCATION_CHANGE: {
		const {pathname} = action.payload
		if (pathname !== '/' && !(/\/template/g.test(pathname))) {
			return initialState
		}
		return state
	}
	case GET_TEMPLATE_PENDING: {
		return {
			...state,
			errors: {},
			isLoaded: false,
			isLoading: true,
			fetchStatus: 'loading'
		}
	}
	case GET_TEMPLATE_SUCCESS:
		const {result} = action
		// const {count, entities} = normalizeArrayOfItems([result])
		return {
			isLoaded: true,
			isLoading: false,
			fetchStatus: 'loaded',
			errors: {},
			entity: result.data[0] || {}
		}
	case GET_TEMPLATE_FAIL:
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

export function templates (state = initialState, action) {
	switch (action.type) {
	case LOCATION_CHANGE: {
		const {pathname} = action.payload
		if (pathname !== '/' && !(/\/templates/g.test(pathname))) {
			return initialState
		}
		return state
	}
	case GET_TEMPLATES_PENDING: {
		return {
			...state,
			errors: {},
			isLoaded: false,
			isLoading: true,
			fetchStatus: 'loading'
		}
	}
	case GET_TEMPLATES_SUCCESS:
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
	case GET_TEMPLATES_FAIL:
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
