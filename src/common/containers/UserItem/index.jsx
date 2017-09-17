import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
import {Loader} from 'semantic-ui-react'
//
import UserItemComponent from './components'
import {GET_USER, GET_USER_PENDING} from 'actions/users'

class UserItem extends Component {
	static propTypes = {
		user: PropTypes.object,
		userId: PropTypes.string,
		getUser: PropTypes.func,
		isUserLoaded: PropTypes.bool,
		isUserLoading: PropTypes.bool
	}

	componentWillMount () {
		const {isUserLoaded, userId} = this.props
		if (!isUserLoaded || (isUserLoaded && userId !== this.props.user._id)) {
			this.props.getUser(userId)
		}
	}

	render () {
		const {user, isUserLoaded} = this.props
		const props = {user, isUserLoaded}
		return (
			<div>
				<Helmet>
					<title>
						{`React-Semantic.UI-Starter: ${isUserLoaded ? `${user.email}` : 'User'}`}
					</title>
				</Helmet>
				{isUserLoaded
					? <UserItemComponent {...props}/>
					: <Loader active>Loading...</Loader>}
			</div>
		)
	}
}

function mapStateToProps (state, props) {
	const {user} = state.entities
	const {id} = props.match.params
	const {entities, isLoaded, isLoading} = user
	const usr = entities
	const isUserLoading = user.isLoading
	const isUserLoaded = user.isLoaded
	return {
		user: usr,
		userId: id,
		isUserLoading,
		isUserLoaded
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getUser: async id => {
			dispatch({type: GET_USER_PENDING})
			const result = await GET_USER(id)
			return dispatch(result)
		}
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(UserItem)
)
