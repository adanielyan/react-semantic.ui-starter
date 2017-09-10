/* eslint-disable */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from 'actions'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('TEMPLATES actions', () => {
	it('creates GET_TEMPLATES_SUCCESS when GET_TEMPLATES was successful', done => {
		const store = mockStore({})
		return store.dispatch(actions.GET_TEMPLATES).then(res => {
			const {result} = res
			const expectedAction = {
				type: actions.GET_TEMPLATES_SUCCESS,
				result
			}

			expect(res).toEqual(expectedAction)
			done()
		})
	})
})
