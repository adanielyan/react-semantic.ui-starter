import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, Image, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class DashboardCardComponent extends Component {
	static propTypes = {
		title: PropTypes.string,
		body: PropTypes.string,
		resolutionsAndPrices: PropTypes.arrayOf(PropTypes.object),
		image: PropTypes.array,
		userId: PropTypes.number,
		uuid: PropTypes.string
	}

	render () {
		const {title, body, uuid, image} = this.props
		const imgSrc = image && image[0] ? image[0].uri : require('images/dummy.png')
		return (
			<Card raised as={Link} to={`/template/${uuid}`}>
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
