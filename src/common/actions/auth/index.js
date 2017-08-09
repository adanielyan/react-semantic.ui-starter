import {
	authenticate,
	login,
	logout,
	resultOK
} from 'api'

export const AUTH_PENDING = 'AUTH_PENDING'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'

export const LOGIN_AUTH_PENDING = 'LOGIN_AUTH_PENDING'
export const LOGIN_AUTH_SUCCESS = 'LOGIN_AUTH_SUCCESS'
export const LOGIN_AUTH_FAIL = 'LOGIN_AUTH_FAIL'

export const LOGOUT_AUTH_SUCCESS = 'LOGOUT_AUTH_SUCCESS'
export const LOGOUT_AUTH_FAIL = 'LOGOUT_AUTH_FAIL'

export const AUTH = async () => {
	const result = await authenticate()
	if (!result) {
		return {type: AUTH_FAIL, errors: result}
	}

	return {type: AUTH_SUCCESS, result}
}

export const LOGIN_AUTH = async data => {
	const result = await login(data)
	if (!result) {
	  return {type: LOGIN_AUTH_FAIL, errors: result}
	}
	return {type: LOGIN_AUTH_SUCCESS, result}
}

export const LOGOUT_AUTH = () => {
	if (logout()) {
		return {type: LOGOUT_AUTH_SUCCESS}
	} else {
		return {type: LOGOUT_AUTH_FAIL}
	}
}
