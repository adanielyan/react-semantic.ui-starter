/* eslint-disable */
import {templates as reducer, initialState} from 'reducers/templates'
import * as actions from 'actions'

const GET_TEMPLATES_SUCCESS = {
	type: actions.GET_TEMPLATES_SUCCESS,
	result: [{id: 1, lol: 1}]
}

const GET_TEMPLATES_FAIL = {
	type: actions.GET_TEMPLATES_FAIL,
	errors: {
		ohMyGodThatsError: {
			xxx: 1
		}
	}
}

const GET_TEMPLATES_PENDING = {
	type: actions.GET_TEMPLATES_PENDING
}

const LOCATION_CHANGE_TO_INBOX = {
	type: actions.LOCATION_CHANGE,
	payload: {
		pathname: '/inbox'
	}
}

describe('TEMPLATES REDUCER', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {x: 'string'})).toEqual(initialState)
	})

	it('should handle GET_TEMPLATES_PENDING', () => {
		expect(reducer(initialState, GET_TEMPLATES_PENDING)).toEqual({
			...initialState,
			errors: {},
			isLoaded: false,
			isLoading: true,
			fetchStatus: 'loading'
		})
	})

	it('should handle GET_TEMPLATES_SUCCESS', () => {
		expect(reducer(initialState, GET_TEMPLATES_SUCCESS)).toEqual({
			...initialState,
			isLoaded: true,
			isLoading: false,
			fetchStatus: 'loaded',
			errors: {},
			count: 1,
			entities: {
				'1': {
					lol: 1,
					id: 1
				}
			}
		})
	})

	it('should handle GET_TEMPLATES_FAIL', () => {
		expect(reducer(initialState, GET_TEMPLATES_FAIL)).toEqual({
			...initialState,
			isLoaded: true,
			isLoading: false,
			fetchStatus: 'loaded',
			errors: {ohMyGodThatsError: {xxx: 1}}
		})
	})

	it('should handle LOCATION_CHANGE to other paths', () => {
		const customState = {
			...initialState,
			lol: 3
		}
		expect(reducer(customState, LOCATION_CHANGE_TO_INBOX)).toEqual(initialState)
	})
})
