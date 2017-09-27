/* eslint-disable */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from 'actions'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('PROJECTS actions', () => {
	it('creates GET_PROJECTS_SUCCESS when GET_PROJECTS was successful', done => {
		const store = mockStore({})
		return store.dispatch(actions.GET_PROJECTS).then(res => {
			const {result} = res
			const expectedAction = {
				type: actions.GET_PROJECTS_SUCCESS,
				result
			}

			expect(res).toEqual(expectedAction)
			done()
		})
	})
})
