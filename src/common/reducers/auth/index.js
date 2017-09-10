import {
	LOGIN_AUTH_FAIL,
	AUTH_FAIL,
	LOGIN_AUTH_SUCCESS,
	LOGOUT_AUTH_SUCCESS,
	AUTH_SUCCESS,
	LOGOUT_AUTH_FAIL,
	APPLICATION_INIT
} from 'actions'

let isLoggedIn = false

export const initialState = {
	user: {},
	isLoggedIn,
	errors: {}
}

export function auth (state = initialState, action) {
	switch (action.type) {
	case APPLICATION_INIT: {
	      return {
	        ...initialState,
	        ...state
	      }
	    }
	    case AUTH_SUCCESS: {
	      const user = action.result
	      return {
	        ...state,
	        isLoggedIn: true,
	        user
	      }
	    }
	case LOGOUT_AUTH_SUCCESS: {
		return {
			isLoggedIn: false,
			errors: {}
		}
	}
	case LOGIN_AUTH_FAIL: {
		return {
			isLoggedIn: false,
			errors: action.errors
		}
	}
	case LOGIN_AUTH_SUCCESS: {
		const user = action.result
		return {
			...state,
			isLoggedIn: true,
			user
		}
	}
	default: {
		return state
	}
	}
}
