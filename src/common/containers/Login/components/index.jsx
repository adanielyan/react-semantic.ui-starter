import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Form, Message, Grid} from 'semantic-ui-react'
import {Helmet} from 'react-helmet'
import _ from 'lodash'
import {LoginButton} from './style'
import {TextCenter} from 'styles/base'

export default class LoginComponent extends Component {
	constructor (props) {
		super(props)
		this.state = {
			email: '',
			password: ''
		}
	}

	static propTypes = {
		login: PropTypes.func,
		errors: PropTypes.object
	}

	handleSubmit (e) {
		e.preventDefault()
		const {login} = this.props
		const {email, password} = this.state
		login({email, password})
	}

	handleChange (e, {name, value}) {
		this.setState({
			[name]: value
		})
	}

	render () {
		const {email, password} = this.state
		// Error from server
		const {errors} = this.props
		const loginFormProps = {error: !_.isEmpty(errors)}
		// Login btn props
		const loginBtnProps = {
			content: 'Login',
			icon: 'sign in'
		}

		return (
			<Grid
				verticalAlign="middle"
				centered
				columns={1}
				textAlign="center"
				relaxed
			>
				<Helmet>
					<title>React-Semantic.UI-Starter: Login</title>
				</Helmet>
				<Grid.Row>
					<Grid.Column tablet={10} mobile={16} computer={6}>
						<Form onSubmit={::this.handleSubmit} {...loginFormProps}>
							{errors &&
								<Message
									error
									header={'Invalid credentials'}
									content={'Your credentials are invalid.'}
								/>}
							<Form.Input
								placeholder="Email"
								name="email"
								label="Email"
								value={email}
								onChange={::this.handleChange}
							/>
							<Form.Input
								placeholder="Password"
								type="password"
								name="password"
								label="Password"
								value={password}
								onChange={::this.handleChange}
							/>
							<TextCenter>
								<LoginButton {...loginBtnProps}/>
							</TextCenter>
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}
