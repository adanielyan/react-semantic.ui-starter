import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, Image, Button} from 'semantic-ui-react'

export default class DashboardCardComponent extends Component {
	static propTypes = {
		title: PropTypes.string,
		body: PropTypes.string,
		field_resolutions_and_prices: PropTypes.arrayOf(PropTypes.object),
		field_image: PropTypes.array,
		userId: PropTypes.number,
		uuid: PropTypes.string
	}

	render () {
		const {title, body, uuid, field_image} = this.props
		const imgSrc = field_image && field_image[0] ? field_image[0].uri : require('images/dummy.png')
		return (
			<Card raised>
				<Image alt="Dummy image" src={imgSrc} />
				<Card.Content>
					<Card.Header>
						{title}
					</Card.Header>
					<Card.Meta>
						<span className="date">
							Template `id` is {uuid}
						</span>
					</Card.Meta>
					<Card.Description>
						{body.split(' ').slice(0, 50).join(' ')} ...
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<div className="ui two buttons">
						<Button basic color="green" disabled>
							More info
						</Button>
						<Button basic color="red" disabled>
							Create my own
						</Button>
					</div>
				</Card.Content>
			</Card>
		)
	}
}
