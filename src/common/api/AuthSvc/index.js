import { app, usersService } from 'api/utils'

/*
payload = {
  email: 'bob',
  password: 'mypass',
};
*/
export const login = async (payload) => {
	const token = await app.authenticate({ strategy: 'local', ...payload })
	const verified = await app.passport.verifyJWT(token.accessToken)
	const user = await usersService.get(verified.userId)
	return user
}

export function logout () {
	return app.logout()
}

export const authenticate = async () => {
	try {
		await app.authenticate()
		const token = await localStorage.getItem('feathers-jwt')
		const payload = await app.passport.verifyJWT(token)
		const user = await usersService.get(payload.userId)
		return user
	} catch (err) {
		return null
	}
}
