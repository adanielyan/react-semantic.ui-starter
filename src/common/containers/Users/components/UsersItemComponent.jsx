import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Item, Label, Divider, Statistic} from 'semantic-ui-react'
import {StyledUserItem} from './style'

export default class UsersItemComponent extends Component {
	static propTypes = {
		email: PropTypes.string,
		_id: PropTypes.number
	}

	render () {
		const {email, _id} = this.props

		return (
			<StyledUserItem as={Link} to={`/users/${_id}`}>
				<Statistic floated="left" value={_id} label={'User ID'} />
				<Item.Content>
					<Item.Header>
						{`${email}`}
					</Item.Header>
					<Item.Extra>
						<Label>
							{_id}
						</Label>
					</Item.Extra>
				</Item.Content>
				<Divider horizontal />
			</StyledUserItem>
		)
	}
}
