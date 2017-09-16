import React, {Component} from 'react'
import PropTypes from 'prop-types'
// Item, Label, Divider,
import {Card, Icon, Image} from 'semantic-ui-react'

class UsersItemComponent extends Component {
	static propTypes = {
		user: PropTypes.object
	}

	render () {
		const {user} = this.props
		return (
			<Card>
				<Image alt={`${user.email}`} src={require('images/daniel.jpg')}/>
				<Card.Content>
					<Card.Header>
						{user._id}
					</Card.Header>
				</Card.Content>
				<Card.Content extra>
					<a>
						<Icon name="user"/>
						{user.email}
					</a>
				</Card.Content>
			</Card>
		)
	}
}

export default UsersItemComponent
